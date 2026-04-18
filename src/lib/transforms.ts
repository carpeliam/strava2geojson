import type { LatLng, SummaryActivity } from 'strava-v3';
import type { Feature, FeatureCollection, LineString, Point } from 'geojson';
import polyline from '@mapbox/polyline';
import { lineString, featureCollection, type AllGeoJSON } from '@turf/helpers';
import simplify from '@turf/simplify';
import truncate from '@turf/truncate';
import pointToLineDistance from '@turf/point-to-line-distance';
import bbox from '@turf/bbox';
import distance from '@turf/distance';

export interface ActivityProperties {
  name: string;
  date: string;
  distance: number;
  total_elevation_gain: number;
  peaks: string[];
}
type ActivityWithoutPeaksProperties = Omit<ActivityProperties, 'peaks'>;

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


export function toGeoJSON(activities: SummaryActivity[]): FeatureCollection<LineString, ActivityWithoutPeaksProperties> {
  const features = activities.map(activity => {
    const coordinates = polyline.decode(activity.map!.summary_polyline).map(([lat, lng]) => [lng, lat]);
    const { name, distance, total_elevation_gain, start_date_local } = activity;
    return lineString(coordinates, { name, distance, total_elevation_gain, date: start_date_local.split('T')[0] }, { id: activity.id });
  });
  return featureCollection(features);
}


const CONTINUITY_THRESHOLD = 1.5;
export function isContinuous(feature: Feature<LineString>) {
  const coords = feature.geometry.coordinates;
  return coords.every((coord, i) =>
    i === 0 || distance(coords[i - 1], coord) <= CONTINUITY_THRESHOLD,
  );
}


export function simplifyLine<T extends AllGeoJSON>(lineString: T): T {
  return simplify(lineString, { tolerance: 0.0001, highQuality: false });
}


export function truncatePoints<T extends AllGeoJSON>(lineString: T): T {
  return truncate(lineString, { precision: 6 });
}

const PEAK_DISTANCE_THRESHOLD = 50; // meters
const BBOX_PADDING = 0.01; // degrees; roughly 1km
export function attachNearbyPeaks(peaks: FeatureCollection<Point>): (lineString: Feature<LineString, ActivityWithoutPeaksProperties>) => Feature<LineString, ActivityProperties> {
  return (lineString) => {
    const peakIds = peaks.features
      .filter(peak => {
        const [minLng, minLat, maxLng, maxLat] = bbox(lineString);
        const [lng, lat] = peak.geometry.coordinates;
        if (lng < minLng - BBOX_PADDING || lng > maxLng + BBOX_PADDING || lat < minLat - BBOX_PADDING || lat > maxLat + BBOX_PADDING) return false;
        return pointToLineDistance(peak, lineString, { units: 'meters' }) < PEAK_DISTANCE_THRESHOLD;
      })
      .map(peak => peak.id as string);
    return { ...lineString, properties: { ...lineString.properties, peaks: peakIds } };
  };
}
