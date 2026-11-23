'use strict';

const { GE_DYNASTY_DATA: eras, GE_POLITIES: polities, GE_ATLAS_CONFIG: config } = window;
const byId = (id) => document.getElementById(id);
const status = byId('status');

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

if (!eras?.length || !polities || !config) {
  status.textContent = '无法加载时间轴数据。';
} else {
  const form = byId('timeline');
  const input = byId('year');
  input.min = config.fromYear;
  input.max = config.toYear;
  input.value = config.toYear;
  form.hidden = false;

  function renderYear() {
    const year = input.valueAsNumber;
    if (year === 0) {
      status.textContent = '没有公元 0 年。请选择 -1 年或 1 年。';
      byId('era').hidden = true;
      return;
    }
    const era = eras.findLast(({ fromYear, toYear }) => fromYear <= year && year <= toYear);
    const phase = era.phases.find(({ until }) => year <= until);
    status.textContent = formatYear(year);
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
      ...era.milestones.map(({ year, approx, headline, site, siteKa }) =>
        listItem(`${approx ? '约' : ''}${formatYear(year)} · ${headline}${site ? ` · ${site}` : ''}`, siteKa),
      ),
    );
    byId('era').hidden = false;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderYear();
  });
  renderYear();
}
