'use strict';

const assert = require('node:assert/strict');
const { test } = require('node:test');

global.window = {};
require('../../ge/ge_dynasty_data');
require('../../ge/ge_polities');

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
