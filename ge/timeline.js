'use strict';

const { GE_DYNASTY_DATA: eras, GE_POLITIES: polities, GE_ATLAS_CONFIG: config } = window;
const byId = (id) => document.getElementById(id);
const statusLine = byId('status');

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
  for (const { key, title } of eras) {
    eraSelect.add(new Option(title, key));
  }
  for (const control of [input, slider]) {
    control.min = config.fromYear;
    control.max = config.toYear;
    control.value = config.toYear;
  }

  function renderYear() {
    const year = input.valueAsNumber;
    if (year === 0) {
      statusLine.textContent = '没有公元 0 年。请选择 -1 年或 1 年。';
      return;
    }
    const era = eras.findLast(({ fromYear, toYear }) => fromYear <= year && year <= toYear);
    const phase = era.phases.find(({ until }) => year <= until);
    slider.value = year;
    slider.setAttribute('aria-valuetext', formatYear(year));
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
    renderMap(era, phase);
    byId('era').hidden = false;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderYear();
  });
  slider.addEventListener('input', () => {
    input.value = slider.valueAsNumber || (input.valueAsNumber < 0 ? 1 : -1);
    renderYear();
  });
  eraSelect.addEventListener('change', () => {
    input.value = eras.find(({ key }) => key === eraSelect.value).focusYear;
    renderYear();
  });
  form.hidden = false;
  renderYear();
}
