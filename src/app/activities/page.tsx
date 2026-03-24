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

export default async function ActivitiesPage() {
  const session = await getSession();
  if (!session) redirect('/');

  const activities = await fetchAllActivities(session.access_token);
  const featureCollection = toGeoJSON(activities.filter(isInNewEngland));
  const activityFeatures = featureCollection.features
    .map(simplifyLine)
    .map(truncatePoints)
    .map(withNearbyPeaks)
    .filter(f => f.properties?.peaks?.length > 0);

  return (
    <main>
      <h1>Your activities</h1>
      {activityFeatures.length === 0 ? (
        <p>No matching activities found.</p>
      ) : (
        <form action="/activities/export" method="POST">
          <ul>
            {activityFeatures.map((feature) => {
              const { name, date, total_elevation_gain, peaks: peakIds } = feature.properties!;
              const { id, ...featureWithoutId } = feature;

              return (
                <li key={id}>
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
      )}
    </main>
  );
}
