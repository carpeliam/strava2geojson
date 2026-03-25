import { Suspense } from 'react';
import { getSession } from '@/lib/session';
import { fetchAllActivities } from '@/lib/strava';
import { redirect } from 'next/navigation';
import { FeatureCollection, Point } from 'geojson';
import { isInNewEngland, simplifyLine, toGeoJSON, truncatePoints, attachNearbyPeaks } from '@/lib/transforms';
import peaks from '@/data/peaks.json';

const peakNames = Object.fromEntries(
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
  const activities = await fetchAllActivities(accessToken);

  return (
    <Suspense fallback={<p>Transforming to GeoJSON...</p>}>
      <ActivityList activities={activities} />
    </Suspense>
  );
}

async function ActivityList({ activities }: { activities: Awaited<ReturnType<typeof fetchAllActivities>> }) {
  const featureCollection = toGeoJSON(activities.filter(isInNewEngland));
  const activityFeatures = featureCollection.features
    .map(simplifyLine)
    .map(truncatePoints)
    .map(withNearbyPeaks)
    .filter(f => f.properties?.peaks?.length > 0);

  if (activityFeatures.length === 0) {
    return <p>No matching activities found.</p>;
  }

  return (
    <form action="/activities/export" method="POST">
      <ul>
        {activityFeatures.map((feature) => {
          const { name, date, total_elevation_gain, peaks: peakIds } = feature.properties!;
          const { id, ...featureWithoutId } = feature;

          return (
            <li key={id as string}>
              <label>
                <input type="checkbox" name="include" value={JSON.stringify(featureWithoutId)} defaultChecked />
                <a href={`https://www.strava.com/activities/${id}`} target="_blank" rel="noreferrer">
                  {name}
                </a>
              </label>
              <p>
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </time>
                {' · '}
                {total_elevation_gain}m gain
                {' · '}
                {peakIds.map((peakId: string) => peakNames[peakId]).join(', ')}
              </p>
              <div>
                <label>
                  Name
                  <input type="text" name={`name-${id}`} defaultValue={name} />
                </label>
                <label>
                  URL
                  <input type="text" name={`url-${id}`} />
                </label>
              </div>
            </li>
          );
        })}
      </ul>
      <button type="submit">Save activities</button>
    </form>
  );
}
