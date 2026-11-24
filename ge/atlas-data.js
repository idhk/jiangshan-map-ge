(function () {
  'use strict';

  const { GE_ATLAS_CONFIG: config, GE_DYNASTY_DATA: eras, GE_POLITIES: polities, GE_BORDERS: borders } = window;
  const [west, south, east, north] = config.bbox;
  const inBounds = ([lng, lat]) => lng >= west && lng <= east && lat >= south && lat <= north;
  const badges = ['科尔基斯', '伊比利亚', '罗马时代', '基督教化', '伊比利亚公国', '诸国并立', '黄金时代',
    '蒙古时期', '三王国', '卡尔特利—卡赫季', '俄罗斯帝国', '民主共和国', '苏联', '独立'];
  const palettes = {
    ge: ['#984036', '#ad653b', '#a35359', '#9a783e'],
    am: ['#73528d', '#8c6c9a', '#7373a0'],
    az: ['#286756', '#427e7d', '#617749'],
    ext: ['#365880', '#997143', '#646478', '#84644a', '#717849', '#497080', '#816476'],
  };
  const special = { abkhazia_blk: '#637b4a', south_ossetia_blk: '#836386', karabakh_blk: '#916540' };
  const sourceNames = { early: '科尔基斯与伊比利亚诸国图', soviet: '苏联高加索行政图', naturalEarth: 'Natural Earth 2022' };
  const dynasties = eras.map((era, i) => {
    const end = eras[i + 1]?.fromYear ?? config.toYear + 1;
    return {
      ...era,
      badge: badges[i],
      toYear: i === eras.length - 1 ? config.toYear : era.toYear,
      // The shared atlas uses exclusive phase boundaries.
      phases: era.phases.map((phase) => ({ ...phase, until: Math.min(phase.until + 1, end) })),
      settlements: era.settlements.filter(({ coord }) => inBounds(coord)).map((place) => ({
        ...place,
        aliases: place.ka ? [place.ka] : [],
        remark: [place.remark, place.ka].filter(Boolean).join(' · '),
      })),
    };
  });
  const features = borders.shapes.map(([key, name, coordinates, approximate, anchor]) => {
    const polity = polities[key];
    const palette = palettes[polity?.group] ?? palettes.ext;
    const hash = [...key].reduce((value, letter) => (31 * value + letter.charCodeAt(0)) >>> 0, 0);
    const label = polity?.label !== false;
    return {
      title: label ? (name ?? polity.zh) : '',
      label,
      anchor: label ? anchor : null,
      approximate,
      tint: special[key] ?? palette[hash % palette.length],
      role: polity?.group === 'ge' ? 'main' : 'rival',
      shape: { type: 'MultiPolygon', coordinates },
    };
  });
  const phases = new Map(dynasties.flatMap((era) => era.phases.map((phase) => [phase.snap, phase])));
  const snapshots = Object.fromEntries(Object.entries(borders.snapshots).map(([key, [year, indices, sources]]) => [key, {
    caption: phases.get(key).overview,
    note: phases.get(key).borderNote,
    reference: { year, sources: ['Cliopatria', ...sources.map((source) => sourceNames[source])], approximate: sources.includes('early') || sources.includes('soviet') },
    polities: indices.map((index) => features[index]),
  }]));
  const dict = Object.fromEntries(Object.values(polities).filter(({ label }) => label !== false).map(({ zh, en }) => [zh, en]));
  Object.assign(dict, { 第比利斯: 'Tbilisi', 梯弗里斯: 'Tiflis', 库塔伊西: 'Kutaisi', 巴统: 'Batumi', 埃里温: 'Yerevan', 巴库: 'Baku', 姆茨赫塔: 'Mtskheta' });

  window.GE_ATLAS_REGION = {
    key: 'ge',
    name: { zh: '格鲁吉亚历史地图', en: 'Historical Atlas of Georgia' },
    subtitle: { zh: '格鲁吉亚历史地图 · 科尔基斯 → 今', en: 'Georgia · Colchis to the Present' },
    bounds: { west, south, east, north },
    initialYear: config.toYear,
    dynasties,
    snapshots,
    land: { type: 'MultiPolygon', coordinates: borders.land },
    terrain: 'ge/terrain_relief.webp',
    sourcesUrl: 'https://github.com/idhk/jiangshan-map-ge/blob/main/ge/README.md#4-疆域资料',
    english: {
      dict,
      dynasties: Object.fromEntries(eras.map((era) => [era.key, { name: era.titleEn, short: era.titleEn.split(/[·（(]/)[0].trim(), capital: era.seat, desc: era.summary }])),
    },
    hydro: {
      rivers: borders.rivers,
      labels: [
        { zh: '黑海', en: 'Black Sea', kind: 'lake', coord: [39.5, 42.15] },
        { zh: '里海', en: 'Caspian Sea', kind: 'lake', coord: [50.55, 40.0] },
        { zh: '大高加索山脉', en: 'Greater Caucasus', kind: 'range', coord: [43.45, 43.46], rot: 24 },
      ],
    },
  };
})();
