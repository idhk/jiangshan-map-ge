'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

global.window = {};
require('../../ge/ge_dynasty_data');
require('../../ge/ge_polities');
require('../../ge/borders-data');

test('every supported year resolves to a phase with known polities', () => {
  const { GE_DYNASTY_DATA: eras, GE_POLITIES: polities, GE_ATLAS_CONFIG: config } = window;
  const snapshots = new Set();
  for (const era of eras) {
    assert.ok(era.titleKa, era.key);
    let until = era.fromYear - 1;
    for (const phase of era.phases) {
      assert.ok(phase.until > until && !snapshots.has(phase.snap), phase.snap);
      until = phase.until;
      snapshots.add(phase.snap);
      for (const id of phase.polities) assert.ok(Object.hasOwn(polities, id), `${phase.snap}: ${id}`);
    }
    assert.equal(until, era.toYear);
  }
  for (let year = config.fromYear; year <= config.toYear; year++) {
    if (year === 0) continue;
    const era = eras.findLast(({ fromYear, toYear }) => fromYear <= year && year <= toYear);
    assert.ok(era?.phases.some(({ until }) => year <= until), `No phase for ${year}`);
  }
});

test('every era has visible places and valid WGS84 coordinates for its milestones', () => {
  const { GE_DYNASTY_DATA: eras, GE_ATLAS_CONFIG: { bbox: [west, south, east, north] } } = window;
  for (const { key, settlements, milestones } of eras) {
    assert.ok(settlements.some(({ coord: [lon, lat] }) => west <= lon && lon <= east && south <= lat && lat <= north), key);
    for (const { coord: [lon, lat] } of [...settlements, ...milestones]) {
      assert.ok(Math.abs(lon) <= 180 && Math.abs(lat) <= 90, `${key}: ${lon},${lat}`);
    }
  }
});

test('every timeline stage has a nonempty territory snapshot at an applicable year', () => {
  const { GE_DYNASTY_DATA: eras, GE_POLITIES: polities, GE_BORDERS: borders } = window;
  const phaseKeys = [];
  const geometrySets = new Set();
  for (const era of eras) {
    for (const phase of era.phases) {
      phaseKeys.push(phase.snap);
      const [year, indices, sources] = borders.snapshots[phase.snap];
      assert.notEqual(year, 0);
      assert.equal(eras.findLast(({ fromYear, toYear }) => fromYear <= year && year <= toYear), era);
      assert.equal(era.phases.find(({ until }) => year <= until), phase);
      assert.ok(indices.length, phase.snap);
      assert.equal(indices.length, new Set(indices).size, phase.snap);
      assert.ok(sources.every((source) => ['early', 'soviet', 'naturalEarth'].includes(source)), phase.snap);
      geometrySets.add(JSON.stringify(indices.map((index) => borders.shapes[index][2]).sort()));
    }
  }
  assert.deepEqual(Object.keys(borders.snapshots), phaseKeys);
  assert.equal(geometrySets.size, phaseKeys.length, 'each stage must switch the visible territory geometry');

  for (const [key, name, path, approximate] of borders.shapes) {
    assert.ok(Object.hasOwn(polities, key) || name, key);
    assert.equal(typeof approximate, 'boolean', key);
    assert.match(path, /^(M\d+,\d+( \d+,\d+){2,}Z)+$/, key);
    assert.ok([...path.matchAll(/(\d+),(\d+)/g)].every(([, x, y]) => Number(x) <= 1200 && Number(y) <= 930), key);
    if (polities[key]?.label === false) assert.equal(name, null, key);
  }
});

test('key regional boundaries change across ancient, Soviet and modern snapshots', () => {
  const { shapes, snapshots } = window.GE_BORDERS;
  const keys = (phase) => new Set(snapshots[phase][1].map((index) => shapes[index][0]));
  assert.ok(keys('s_ge_colchis_a').has('colchis'));
  assert.ok(keys('s_ge_iberia_a').has('iberia'));
  assert.ok(keys('s_ge_golden_d').has('kingdom_georgia'));
  assert.ok(keys('s_ge_drg_a').has('drg'));
  for (const key of ['ge_ssr', 'am_ssr', 'az_ssr']) assert.ok(keys('s_ge_soviet_e').has(key));
  assert.ok(keys('s_ge_ind_d').has('karabakh_blk'));
  assert.ok(!keys('s_ge_ind_e').has('karabakh_blk'));
  assert.ok(keys('s_ge_ind_e').has('abkhazia_blk'));
  assert.ok(keys('s_ge_ind_e').has('south_ossetia_blk'));
});
