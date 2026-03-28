import { describe, it, expect } from 'vitest';
import { buildTripIndex, type Trip } from '@/lib/trips';

describe('buildTripIndex', () => {
  it('indexes trips by date', () => {
    const trips = [
      makeTrip(1, '2024-06-15', 'Hike up Washington'),
      makeTrip(2, '2024-07-04', 'Franconia Ridge Loop'),
    ];
    const index = buildTripIndex(trips);
    expect(index.get('2024-06-15')).toEqual([trips[0]]);
    expect(index.get('2024-07-04')).toEqual([trips[1]]);
  });

  it('groups multiple trips on the same date', () => {
    const trips = [
      makeTrip(1, '2024-06-15', 'Hike up Washington'),
      makeTrip(2, '2024-06-15', 'Hike up Adams'),
    ];
    const index = buildTripIndex(trips);
    expect(index.get('2024-06-15')).toEqual([trips[0], trips[1]]);
  });

  it('returns undefined for a date with no trips', () => {
    const index = buildTripIndex([makeTrip(1, '2024-06-15', 'Hike up Washington')]);
    expect(index.get('2024-07-04')).toBeUndefined();
  });
});

function makeTrip(id: number, tripDate: string, name: string): Trip {
  return {
    id,
    name,
    tripDate,
    url: '',
    program: '',
    primaryTripActivity: '',
    leaders: [],
    description: '',
  };
}
