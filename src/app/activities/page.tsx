import { Suspense } from 'react';
import { getSession } from '@/lib/session';
import { fetchAllActivities } from '@/lib/strava';
import { redirect } from 'next/navigation';
import { Feature, FeatureCollection, LineString, Point } from 'geojson';
import { isInNewEngland, simplifyLine, toGeoJSON, truncatePoints, attachNearbyPeaks } from '@/lib/transforms';
import peaks from '@/data/peaks.json';
import ActivityItem from './ActivityItem';
import styles from './page.module.css';
import { fetchTrips } from '@/lib/trips';

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

  return (
    <Suspense fallback={<p>Transforming to GeoJSON...</p>}>
      <ActivityList activities={activities} trips={trips} />
    </Suspense>
  );
}

async function ActivityList({ activities, trips }: { activities: Awaited<ReturnType<typeof fetchAllActivities>>, trips: Awaited<ReturnType<typeof fetchTrips>> }) {
  const featureCollection = toGeoJSON(activities.filter(isInNewEngland));
  const activityFeatures = featureCollection.features
    .map(simplifyLine)
    .map(truncatePoints)
    .map(withNearbyPeaks)
    .filter(f => f.properties?.peaks?.length > 0);

  if (activityFeatures.length === 0) {
    return <p>No matching activities found.</p>;
  }

  function activityItemForFeature(feature: Feature<LineString>) {
    const tripsOnDate = trips.get(feature.properties!.date) ?? [];
    const potentialTrips = tripsOnDate.filter(trip => trip.primaryTripActivity === 'Hiking');

    const peakNames = feature.properties!.peaks.map((peakId: string) => peakNameForId[peakId]).join(', ');

    return <ActivityItem key={feature.id} feature={feature} potentialTrips={potentialTrips} peakNames={peakNames} />;
  }

  return (
    <form action="/activities/export" method="POST">
      <ul className={styles.activities}>
        {activityFeatures.map(activityItemForFeature)}
      </ul>
      <button type="submit">Save activities</button>
    </form>
  );
}
