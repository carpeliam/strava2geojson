import { Suspense } from 'react';
import { getSession } from '@/lib/session';
import { fetchAllActivities } from '@/lib/strava';
import { redirect } from 'next/navigation';
import { FeatureCollection, Point } from 'geojson';
import { isInNewEngland, simplifyLine, toGeoJSON, truncatePoints, attachNearbyPeaks, isContinuous } from '@/lib/transforms';
import peaks from '@/data/peaks.json';
import { fetchTrips, hikingTripsForDate } from '@/lib/trips';
import ActivityList from './ActivityList';

const peakNameForId = Object.fromEntries(
  peaks.features.map((f) => [f.id, f.properties?.name]),
);
const withNearbyPeaks = attachNearbyPeaks(peaks as FeatureCollection<Point>);

export default function ActivitiesPage() {
  return (
    <main>
      <h1>Your activities</h1>
      <Suspense fallback={<p>Authenticating with Strava...</p>}>
        <AuthenticatedActivities />
      </Suspense>
    </main>
  );
}

async function AuthenticatedActivities() {
  const session = await getSession();
  if (!session) redirect('/');

  return (
    <Suspense fallback={<p>Fetching activities...</p>}>
      <FetchedActivities accessToken={session.access_token} />
    </Suspense>
  );
}

async function FetchedActivities({ accessToken }: { accessToken: string }) {
  const [activities, trips] = await Promise.all([
    fetchAllActivities(accessToken),
    fetchTrips(),
  ]);

  function buildActivityList() {
    const featureCollection = toGeoJSON(activities.filter(isInNewEngland));
    const activityFeatures = featureCollection.features
      .filter(isContinuous)
      .map(simplifyLine)
      .map(truncatePoints)
      .map(withNearbyPeaks)
      .filter(f => f.properties?.peaks?.length > 0);

    if (activityFeatures.length === 0) {
      return <p>No matching activities found.</p>;
    }

    const activitiesWithTrips = activityFeatures.map(feature => (
      { feature, potentialTrips: hikingTripsForDate(feature.properties.date, trips) }
    ));

    return (
      <ActivityList activities={activitiesWithTrips} peakNameForId={peakNameForId} />
    );
  }

  return (
    <Suspense fallback={<p>Transforming to GeoJSON...</p>}>
      {buildActivityList()}
    </Suspense>
  );
}
