import { describe, it, expect } from 'vitest';
import { toGeoJSON, isInNewEngland, simplifyLine, truncatePoints, attachNearbyPeaks } from '@/lib/transforms';
import { featureCollection, lineString, point } from '@turf/helpers';
import { stravaActivities } from '../support/fixtures';

describe('strava', () => {
  it('should filter out strava activities that are outside New England', () => {
    expect(stravaActivities.filter(isInNewEngland)).toHaveLength(3);
  });

  it('should convert strava activities to geojson', () => {
    const geojson = toGeoJSON(stravaActivities.filter(a => !!a.map?.summary_polyline));
    expect(geojson.features.map(({ id, properties }) => ({ id, properties }))).toEqual([
      {
        id: 101,
        properties: {
          name: 'Up Mt Washington',
          total_elevation_gain: 1883.7,
          date: '2023-07-30',
        },
      },
      {
        id: 103,
        properties: {
          name: 'Blue Hills',
          total_elevation_gain: 461,
          date: '2025-04-05',
        },
      },
      {
        id: 104,
        properties: {
          name: 'Mount Whitney',
          total_elevation_gain: 1347,
          date: '2025-07-30',
        },
      },
      {
        id: 105,
        properties: {
          name: 'Katahdin via Cathedral',
          total_elevation_gain: 1126.4,
          date: '2019-08-20',
        },
      },
    ]);
  });

  it('should limit coordinates to 6 decimal places', () => {
    const geojson = lineString([
      [ -73.987654321, 41.123456789 ],
      [ -73.123456789, 41.987654321 ],
    ]);
    const simplifiedGeojson = truncatePoints(geojson);
    expect(simplifiedGeojson.geometry.coordinates).toEqual([
      [ -73.987654, 41.123457 ],
      [ -73.123457, 41.987654 ],
    ]);
  });

  it('should remove points that do not meaningfully contribute to the path', () => {
    const geojson = lineString([
      [0, 0],
      [0.00001, 0.5],
      [0, 1],
    ]);

    const simplifiedGeojson = simplifyLine(geojson);

    expect(simplifiedGeojson.geometry.coordinates).toHaveLength(2);
  });

  it('should decorate routes with their nearby peaks', () => {
    const withNearbyPeaks = attachNearbyPeaks(peaks);
    const routeNearSummit = lineString([
      [-71.3033, 44.2650],
      [-71.3033, 44.2706],
      [-71.3033, 44.2760],
    ]);
    expect(withNearbyPeaks(routeNearSummit)).toHaveProperty('properties.peaks', ['node/12345']);

    const routeFarAway = lineString([
      [-71.3033, 44.0000],
      [-71.3033, 44.0100],
    ]);
    expect(withNearbyPeaks(routeFarAway)).toHaveProperty('properties.peaks', []);
  });

  const peaks = featureCollection([
    point([-71.3033, 44.2705], { name: 'Mt. Washington' }, { id: 'node/12345' }),
  ]);
});
