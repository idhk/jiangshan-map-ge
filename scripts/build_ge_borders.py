"""Build offline Georgia territory snapshots from Cliopatria and Natural Earth."""

import json
import re
import subprocess
import sys
from pathlib import Path
from zipfile import ZipFile

from shapely import make_valid, union_all
from shapely.geometry import box, shape

ROOT = Path(__file__).resolve().parent.parent

# One reference year per phase, in the order of ge_dynasty_data.js.
YEARS = [
    -600, -340,
    -275, -165, -80,
    15, 180, 300,
    350, 470, 540,
    600, 690, 755,
    850, 930, 993,
    1050, 1121, 1165, 1205, 1225,
    1240, 1300, 1350, 1450, 1480,
    1525, 1614, 1660, 1752,
    1774, 1795,
    1807, 1828, 1866, 1885,
    1918, 1919, 1920,
    1922, 1928, 1937, 1946, 1985,
    1993, 2004, 2009, 2021, 2024,
]

# The source uses different English names for several existing atlas entities.
ALIASES = {
    "Achaemenid Empire": "achaemenid",
    "Atropatene": "atropatene",
    "Caucasian Albania": "albania",
    "Caucasian Iberia": "iberia",
    "Caucasian Imamate": ("caucasian-imamate", "高加索伊玛目国"),
    "Eastern Roman Empire": "byzantine",
    "Great Seljuk Empire": "seljuk",
    "Khwarezmid Empire": "khwarazm",
    "Kingdom of Lazica": "lazica",
    "Lazica": "lazica",
    "Kingdom of the Iberians": "tao_klarjeti",
    "Kingdom of Vaspurakan": "vaspurakan",
    "Islamic Republic of Iran": "iran",
    "Parthian Empire": "parthia",
    "Principality of Iberia": "iberia_principate",
    "Principality of Svaneti": "svaneti",
    "Pahlavi Dynasty": ("iran-pahlavi", "巴列维王朝"),
    "Qajar Dynasty": "qajar",
    "Republic of Armenia": "armenia",
    "Republic of Azerbaijan": "azerbaijan",
    "Republic of Turkey": "turkey",
    "Republics of the Soviet Union": ("early-soviet-republics", "早期苏维埃共和国"),
    "Russian Republic": "russia_civil",
    "Sasanian Empire": "sasanian",
    "Sajid Dynasty": "sajid",
    "Safavid Dynasty": "safavid",
    "Shirvan": "shirvanshah",
    "Union of Soviet Socialist Republics": ("ussr", "苏联"),
    "Zand Dynasty": "zand",
    "Greek City-States": ("greek-cities", "希腊城邦"),
    "Kingdom of Urartu": ("urartu", "乌拉尔图王国"),
    "Median Kingdom": ("media", "米底王国"),
    "Neo-Babylonian Empire": ("neo-babylonia", "新巴比伦帝国"),
    "Scythia": ("scythia", "斯基泰"),
    "Huns": ("huns", "匈人"),
    "Khanates of the Caucasus": ("caucasus-khanates", "高加索诸汗国"),
    "Khazaria": "khazar",
    "Kazakh Khanate": ("kazakh-khanate", "哈萨克汗国"),
    "Kazakhstan": ("kazakhstan", "哈萨克斯坦"),
    "Tsardom of Russia": ("russian-tsardom", "俄罗斯沙皇国"),
    "Chechen Republic": ("chechnya", "车臣共和国"),
    "Kimek-Kipchak confederation": ("kimek-kipchak", "基马克—钦察联盟"),
    "Hamdanid Emirates": ("hamdanid", "哈姆丹王朝"),
    "Ayyubid Sultanate": ("ayyubid", "阿尤布王朝"),
    "Dabuyid Dynasty": ("dabuyid", "达布亚王朝"),
    "Oghuz Turks": ("oghuz", "乌古斯突厥"),
    "Danishmendids": ("danishmendids", "达尼什曼德王朝"),
    "Khanate of Kazan": ("kazan", "喀山汗国"),
}

# These records contain unrelated slivers under the wrong labels inside this regional crop.
MISPLACED = {"(British Empire)", "British Africa", "British Colonial Empire", "Dutch East Indies", "Nazi Germany"}


def polygons(geometry):
    if geometry.geom_type == "Polygon" and not geometry.is_empty:
        yield geometry
    elif hasattr(geometry, "geoms"):
        for part in geometry.geoms:
            yield from polygons(part)


def shapes_in(path, frame):
    for feature in json.loads(path.read_text())["features"]:
        geom = shape(feature["geometry"])
        if geom.intersects(frame):
            yield make_valid(geom).intersection(frame)


def identity(name, year, english_ids):
    if name == "Georgia":
        if year >= 1992:
            return "georgia", None
        if year >= 1918:
            return "drg", None
        return "early-georgia", "格鲁吉亚诸地"
    if name == "Armenia" and 1918 <= year <= 1920:
        return "am_republic", None
    if name == "Kingdom of Armenia":
        return ("orontid_am" if year < -190 else "artaxiad_am" if year < 12 else "arsacid_am"), None
    if name == "Kingdom of Georgia" and 1763 <= year <= 1802:
        return "kartli_kakheti", None
    if name in {"Rashidun Caliphate", "Umayyad Caliphate", "Abbasid Caliphate"}:
        return name.split()[0].lower(), {
            "Rashidun Caliphate": "正统哈里发国",
            "Umayyad Caliphate": "倭马亚哈里发国",
            "Abbasid Caliphate": "阿拔斯哈里发国",
        }[name]
    alias = ALIASES.get(name, english_ids.get(name))
    if isinstance(alias, tuple):
        return alias
    if alias:
        return alias, None
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-"), name


def record_geometry(geometry, frame, land):
    if not geometry.intersects(frame):
        return None
    clipped = make_valid(geometry).intersection(land).simplify(0.012, preserve_topology=True)
    parts = [part for part in polygons(clipped) if part.area >= 0.001]
    return union_all(parts) if parts else None


def shape_path(geometry, bounds):
    west, south, east, north = bounds
    rings = (
        ring
        for polygon in polygons(geometry)
        for ring in (polygon.exterior, *polygon.interiors)
    )
    path = []
    for ring in rings:
        points = [
            f"{round(1200 * (lon - west) / (east - west))},{round(930 * (north - lat) / (north - south))}"
            for lon, lat in list(ring.coords)[:-1]
        ]
        if len(set(points)) >= 3:
            path.append("M" + " ".join(points) + "Z")
    return "".join(path)


def main(source, land_path, lakes_path, disputed_path):
    config, polities, eras = json.loads(subprocess.check_output(
        ["node", "-e", """global.window = {};
        require('./ge/ge_dynasty_data'); require('./ge/ge_polities');
        console.log(JSON.stringify([window.GE_ATLAS_CONFIG, window.GE_POLITIES, window.GE_DYNASTY_DATA]));"""],
        cwd=ROOT,
    ))
    english_ids = {record["en"]: key for key, record in polities.items()}
    frame = box(*config["bbox"])
    land = union_all(list(shapes_in(land_path, frame))).difference(union_all(list(shapes_in(lakes_path, frame))))
    phases = [phase["snap"] for era in eras for phase in era["phases"]]
    assert len(phases) == len(YEARS)
    year_set = set(YEARS)
    with ZipFile(source) as archive, archive.open(archive.namelist()[0]) as data:
        features = json.load(data)["features"]
    by_year = {year: [] for year in YEARS}
    for feature in features:
        properties = feature["properties"]
        name = properties["Name"]
        if properties["Type"] != "POLITY" or name in MISPLACED:
            continue
        years = [year for year in year_set if properties["FromYear"] <= year <= properties["ToYear"]]
        if not years:
            continue
        geometry = record_geometry(shape(feature["geometry"]), frame, land)
        if geometry is None:
            continue
        for year in years:
            if name == "Hamdanid Emirates" and year > 1004:
                continue  # The source extends this polity beyond the end of the Aleppo branch.
            if name == "Russian-occupied territories" and year >= 1992:
                # In the 0.2.1 Caucasus crop this record contains only the South Ossetia area.
                by_year[year].append(("south_ossetia_blk", None, geometry, None))
            else:
                key, label = identity(name, year, english_ids)
                by_year[year].append((key, label, geometry, None))

    def add_outline(feature, key, years, credit):
        geometry = record_geometry(shape(feature["geometry"]), frame, land)
        assert geometry is not None
        for year in years:
            by_year[year].append((key, None, geometry, credit))

    for file, credit, ranges in [
        ("early-boundaries.geojson", "early", {"colchis": [-600, -340, -165], "iberia": [-275, -165]}),
        ("soviet-boundaries.geojson", "soviet", {"ge_ssr": [1985], "am_ssr": [1985], "az_ssr": [1985]}),
    ]:
        data = json.loads((ROOT / "ge" / file).read_text())["features"]
        for feature in data:
            key = feature["properties"]["id"]
            add_outline(feature, key, ranges[key], credit)

    # Natural Earth's 2022 disputed areas provide the post-2020 special-area reference.
    disputed = {f["properties"].get("BRK_NAME"): f for f in json.loads(disputed_path.read_text())["features"]}
    add_outline(disputed["Artsakh"], "karabakh_blk", [2021], "naturalEarth")
    add_outline(disputed["Abkhazia"], "abkhazia_blk", [2021, 2024], "naturalEarth")

    shapes = []
    shape_indices = {}
    snapshots = {}
    for snap, year in zip(phases, YEARS, strict=True):
        occupied = []
        indices = []
        supplements = set()
        # Supplemental outlines and local polygons take precedence where source shapes overlap.
        for key, label, geom, credit in sorted(by_year[year], key=lambda entry: (entry[3] is None, entry[2].area, entry[0])):
            path = shape_path(geom.difference(union_all(occupied)), config["bbox"])
            if not path:
                continue
            occupied.append(geom)
            # Avoid leaking the special-region label into the published legend or tooltip.
            if credit:
                supplements.add(credit)
            record = [key, label, path, credit in {"early", "soviet"}]
            index = shape_indices.setdefault(tuple(record), len(shapes))
            if index == len(shapes):
                shapes.append(record)
            indices.append(index)
        assert indices, f"No map areas for {snap} ({year})"
        snapshots[snap] = [year, indices, sorted(supplements)]

    output = ROOT / "ge/borders-data.js"
    output.write_text(
        "// Generated by scripts/build_ge_borders.py. Data sources and licenses: ge/README.md.\n"
        "window.GE_BORDERS = {\n  shapes: [\n"
        + "".join(f"    {json.dumps(row, ensure_ascii=False, separators=(',', ':'))},\n" for row in shapes)
        + "  ],\n  snapshots: {\n"
        + "".join(f"    {snap}: {json.dumps(row, separators=(',', ':'))},\n" for snap, row in snapshots.items())
        + "  },\n};\n"
    )
    print(f"{len(snapshots)} snapshots, {len(shapes)} distinct paths")


if __name__ == "__main__":
    main(*(Path(argument) for argument in sys.argv[1:]))
