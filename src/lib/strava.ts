import type { LatLng, SummaryActivity } from 'strava-v3';
import type { Feature, FeatureCollection, LineString, Point } from 'geojson';
import polyline from '@mapbox/polyline';
import { lineString, featureCollection } from '@turf/helpers';
import simplify from '@turf/simplify';
import truncate from '@turf/truncate';
import pointToLineDistance from '@turf/point-to-line-distance';

const BOUNDS = { minLat: 41, minLng: -73.8, maxLat: 47.6, maxLng: -66.7 };
function isInBounds (latLng: LatLng | null) {
  if (!latLng) return false;
  const [lat, lng] = latLng;
  return lat >= BOUNDS.minLat && lat <= BOUNDS.maxLat &&
  lng >= BOUNDS.minLng && lng <= BOUNDS.maxLng;
}

export function isInNewEngland(activity: SummaryActivity): boolean {
  return isInBounds(activity.start_latlng) || isInBounds(activity.end_latlng);
}


export function toGeoJSON(activities: SummaryActivity[]): FeatureCollection<LineString> {
  const features = activities.map(activity => {
    const coordinates = polyline.decode(activity.map!.summary_polyline).map(([lat, lng]) => [lng, lat]);
    const { name, total_elevation_gain, start_date_local } = activity;
    return lineString(coordinates, { name, total_elevation_gain, date: start_date_local.split('T')[0] });
  });
  return featureCollection(features);
}


export function simplifyLine(lineString: Feature<LineString>): Feature<LineString> {
  return simplify(lineString, { tolerance: 0.0001, highQuality: false });
}


export function truncatePoints(lineString: Feature<LineString>): Feature<LineString> {
  return truncate(lineString, { precision: 6 });
}


const PEAK_DISTANCE_THRESHOLD = 50;
export function isNearPeak(route: Feature<LineString>, peaks: FeatureCollection<Point>): boolean {
  return peaks.features.some(peak =>
    pointToLineDistance(peak, route, { units: 'meters' }) <= PEAK_DISTANCE_THRESHOLD,
  );
}
