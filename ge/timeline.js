'use strict';

const { GE_DYNASTY_DATA: eras, GE_POLITIES: polities, GE_ATLAS_CONFIG: config, GE_BORDERS: borders } = window;
const byId = (id) => document.getElementById(id);
const statusLine = byId('status');
const svgNamespace = 'http://www.w3.org/2000/svg';
const territoryPalettes = {
  ge: ['#9c3928', '#b16831', '#ae4752', '#ac742f'],
  am: ['#5d478d', '#805e96', '#6965a3'],
  az: ['#176955', '#247c80', '#50713a'],
  ext: ['#335e86', '#806333', '#555868', '#65552b', '#606d35', '#496c7b', '#786173'],
};
const territoryColors = {
  'early-georgia': '#ad5b43',
  abkhazia_blk: '#637b4a',
  south_ossetia_blk: '#836386',
  karabakh_blk: '#916540',
};
const territoryCredits = {
  early: {
    name: '早期格鲁吉亚诸国图（前600—前150年）',
    url: 'https://commons.wikimedia.org/wiki/File:Georgian_States_Colchis_and_Iberia_(600-150BC)-en.svg',
    license: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  soviet: {
    name: '苏联高加索行政图（1957—1991年）',
    url: 'https://commons.wikimedia.org/wiki/File:Soviet_Caucasus_map.svg',
    license: 'https://creativecommons.org/licenses/by-sa/3.0/',
  },
  naturalEarth: {
    name: 'Natural Earth 2022',
    url: 'https://github.com/nvkelso/natural-earth-vector/blob/v5.1.2/geojson/ne_10m_admin_0_disputed_areas.geojson',
  },
};

function formatYear(year) {
  return year < 0 ? `公元前 ${-year} 年` : `${year} 年`;
}

function listItem(text, ka) {
  const item = document.createElement('li');
  item.textContent = text;
  if (ka) {
    const name = document.createElement('span');
    name.lang = 'ka';
    name.textContent = ` · ${ka}`;
    item.append(name);
  }
  return item;
}

function eventText({ year, approx, headline }) {
  return `${approx ? '约' : ''}${formatYear(year)} · ${headline}`;
}

function territoryColor(key, group) {
  const palette = territoryPalettes[group] ?? territoryPalettes.ext;
  const number = [...key].reduce((hash, letter) => (31 * hash + letter.charCodeAt(0)) >>> 0, 0);
  return territoryColors[key] ?? palette[number % palette.length];
}

function renderTerritories(phase) {
  const map = byId('territories');
  const legend = byId('territory-legend');
  const date = byId('territory-date');
  const snapshot = borders?.snapshots[phase.snap];
  if (!snapshot) {
    map.replaceChildren();
    legend.replaceChildren();
    date.textContent = '此阶段暂无疆域资料。';
    return;
  }
  const [sourceYear, indices, credits] = snapshot;
  const paths = [];
  const labels = new Map();
  for (const index of indices) {
    const [key, sourceLabel, outline, approximate] = borders.shapes[index];
    const polity = polities[key];
    const color = territoryColor(key, polity?.group);
    const area = document.createElementNS(svgNamespace, 'path');
    area.classList.add('territory');
    if (approximate) area.classList.add('approximate');
    area.setAttribute('d', outline);
    area.style.setProperty('--territory-color', color);
    if (polity?.label === false) {
      area.classList.add('color-only');
    } else {
      const name = sourceLabel ?? polity.zh;
      const title = document.createElementNS(svgNamespace, 'title');
      title.textContent = name;
      area.append(title);
      labels.set(name, color);
    }
    paths.push(area);
  }
  map.replaceChildren(...paths.reverse());
  legend.replaceChildren(...Array.from(labels, ([name, color]) => {
    const item = document.createElement('li');
    const sample = document.createElement('span');
    sample.className = 'territory-color';
    sample.style.setProperty('--territory-color', color);
    sample.setAttribute('aria-hidden', 'true');
    item.append(sample, name);
    return item;
  }));
  const source = document.createElement('a');
  source.href = 'https://github.com/Seshat-Global-History-Databank/cliopatria/releases/tag/v0.2.1';
  source.textContent = 'Cliopatria';
  const license = document.createElement('a');
  license.href = 'https://creativecommons.org/licenses/by/4.0/';
  license.textContent = 'CC BY 4.0';
  date.replaceChildren(`参考边界 · ${formatYear(sourceYear)} · `, source, '（', license, '，已裁剪和简化）');
  for (const key of credits) {
    const credit = territoryCredits[key];
    const supplemental = document.createElement('a');
    supplemental.href = credit.url;
    supplemental.textContent = credit.name;
    date.append(' · ', supplemental);
    if (credit.license) {
      const supplementLicense = document.createElement('a');
      supplementLicense.href = credit.license;
      supplementLicense.textContent = 'CC BY-SA 3.0';
      date.append('（', supplementLicense, '，虚线为近似范围）');
    }
  }
}

function renderMap(era, phase) {
  const [west, south, east, north] = config.bbox;
  const phaseIndex = era.phases.indexOf(phase);
  const firstYear = phaseIndex === 0 ? era.fromYear : era.phases[phaseIndex - 1].until + 1;
  const points = new Map();
  for (const place of era.settlements) {
    points.set(place.coord.join(','), {
      name: place.ancient,
      coord: place.coord,
      details: [listItem([place.remark, place.modern !== place.ancient && `今地：${place.modern}`].filter(Boolean).join(' · '), place.ka)],
    });
  }
  for (const event of era.milestones) {
    if (event.year < firstYear || event.year > phase.until) continue;
    const key = event.coord.join(',');
    const point = points.get(key) ?? { name: event.site || event.headline, coord: event.coord, details: [] };
    point.event = true;
    point.details.push(listItem(eventText(event), event.siteKa));
    points.set(key, point);
  }

  const pins = byId('pins');
  pins.replaceChildren();
  byId('point').hidden = true;
  for (const point of points.values()) {
    const [longitude, latitude] = point.coord;
    if (longitude < west || longitude > east || latitude < south || latitude > north) continue;
    const pin = document.createElement('button');
    pin.type = 'button';
    pin.className = point.event ? 'map-pin event' : 'map-pin';
    pin.title = point.name;
    pin.setAttribute('aria-label', point.name);
    pin.setAttribute('aria-pressed', 'false');
    pin.style.left = (100 * (longitude - west)) / (east - west) + '%';
    pin.style.top = (100 * (north - latitude)) / (north - south) + '%';
    pin.addEventListener('click', () => {
      pins.querySelector('[aria-pressed="true"]')?.setAttribute('aria-pressed', 'false');
      pin.setAttribute('aria-pressed', 'true');
      byId('point-name').textContent = point.name;
      byId('point-details').replaceChildren(...point.details);
      byId('point').hidden = false;
    });
    pins.append(pin);
  }
  pins.firstElementChild?.click();
}

if (!eras?.length || !polities || !config) {
  statusLine.textContent = '无法加载时间轴数据。';
} else {
  const form = byId('timeline');
  const input = byId('year');
  const slider = byId('year-slider');
  const eraSelect = byId('era-select');
  const stages = eras.flatMap((era, index) => era.phases.map((phase) => ({
    phase,
    referenceYear: borders?.snapshots[phase.snap]?.[0] ??
      Math.min(phase.until, (eras[index + 1]?.fromYear ?? config.toYear + 1) - 1),
  })));
  let currentPhase;
  for (const { key, title } of eras) {
    eraSelect.add(new Option(title, key));
  }
  input.min = config.fromYear;
  input.max = config.toYear;
  input.value = config.toYear;
  slider.min = 0;
  slider.max = stages.length - 1;

  function renderYear() {
    const year = input.valueAsNumber;
    if (year === 0) {
      statusLine.textContent = '没有公元 0 年。请选择 -1 年或 1 年。';
      return;
    }
    const era = eras.findLast(({ fromYear, toYear }) => fromYear <= year && year <= toYear);
    const phase = era.phases.find(({ until }) => year <= until);
    slider.value = stages.findIndex((stage) => stage.phase === phase);
    slider.setAttribute('aria-valuetext', phase.overview);
    eraSelect.value = era.key;
    statusLine.textContent = formatYear(year);
    byId('era-name').textContent = era.title;
    byId('era-ka').textContent = era.titleKa;
    byId('era-summary').textContent = era.summary;
    byId('phase').textContent = phase.overview;
    byId('border').textContent = phase.borderNote;
    byId('polities').replaceChildren(
      ...phase.polities.map((id) => polities[id]).filter(({ label }) => label !== false)
        .map(({ zh, ka }) => listItem(zh, ka)),
    );
    byId('events').replaceChildren(
      ...era.milestones.map((event) =>
        listItem(`${eventText(event)}${event.site ? ` · ${event.site}` : ''}`, event.siteKa),
      ),
    );
    if (phase !== currentPhase) {
      renderTerritories(phase);
      renderMap(era, phase);
      currentPhase = phase;
    }
    byId('era').hidden = false;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderYear();
  });
  slider.addEventListener('input', () => {
    input.value = stages[slider.valueAsNumber].referenceYear;
    renderYear();
  });
  eraSelect.addEventListener('change', () => {
    input.value = eras.find(({ key }) => key === eraSelect.value).focusYear;
    renderYear();
  });
  form.hidden = false;
  renderYear();
}
