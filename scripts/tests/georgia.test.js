'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

global.window = { addEventListener() {} };
require('../../ge/ge_dynasty_data');
require('../../ge/ge_polities');
require('../../ge/borders-data');
require('../../ge/atlas-data');
require('../../js/app');

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
  const { GE_DYNASTY_DATA: eras, GE_POLITIES: polities, GE_BORDERS: borders, GE_ATLAS_REGION: region } = window;
  const { west, east, south, north } = region.bounds;
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

  for (const [key, name, coordinates, approximate] of borders.shapes) {
    assert.ok(Object.hasOwn(polities, key) || name, key);
    assert.equal(typeof approximate, 'boolean', key);
    assert.ok(coordinates.length, key);
    for (const ring of coordinates.flat()) {
      assert.ok(ring.length >= 4, key);
      assert.deepEqual(ring[0], ring.at(-1), key);
      assert.ok(ring.every(([lng, lat]) => west <= lng && lng <= east && south <= lat && lat <= north), key);
    }
    if (polities[key]?.label === false) assert.equal(name, null, key);
  }
});

test('the shared atlas resolves and draws Georgia snapshots across its entire timeline', () => {
  const { GE_ATLAS_REGION: region, GE_BORDERS: borders, HistoricalAtlasController, MercatorProjector } = window;
  const atlas = Object.assign(Object.create(HistoricalAtlasController.prototype), { region, dynasties: region.dynasties });
  const projector = new MercatorProjector(1000, 700, region.bounds);
  const seen = new Set();
  for (let year = region.dynasties[0].fromYear; year <= region.dynasties.at(-1).toYear; year++) {
    if (year === 0) continue;
    const key = atlas._resolveSnapKey(region.dynasties[atlas._findDynastyIndex(year)], year);
    assert.ok(region.snapshots[key]?.polities.length, `${year}: ${key}`);
    seen.add(key);
  }
  assert.equal(seen.size, 50);
  for (const [key, [year]] of Object.entries(borders.snapshots)) {
    assert.equal(atlas._resolveSnapKey(region.dynasties[atlas._findDynastyIndex(year)], year), key);
    for (const polity of region.snapshots[key].polities) {
      assert.match(projector.shapeToSvgPath(polity.shape), /^M[\d.-]+ /, key);
      if (!polity.label) assert.deepEqual([polity.title, polity.anchor], ['', null]);
    }
  }
  assert.match(projector.shapeToSvgPath(region.land), /^M/);
  assert.ok(region.hydro.rivers.length);
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
