'use client';

import { useState } from 'react';
import { Feature, LineString } from 'geojson';

interface Props {
  feature: Feature<LineString>;
  peakNames: Record<string, string>;
}

export default function ActivityItem({ feature, peakNames }: Props) {
  const [checked, setChecked] = useState(true);
  const { name, date, total_elevation_gain, peaks: peakIds } = feature.properties!;
  const { id, ...featureWithoutId } = feature;
  const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const peakList = peakIds.map((peakId: string) => peakNames[peakId]).join(', ');

  return (
    <li>
      <label>
        <input
          type="checkbox"
          name="include"
          value={JSON.stringify(featureWithoutId)}
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
        />
        <a href={`https://www.strava.com/activities/${id}`} target="_blank" rel="noreferrer">
          {name}
        </a>
        {!checked && (
          <span> · <time dateTime={date}>{formattedDate}</time> · {total_elevation_gain}m gain · {peakList}</span>
        )}
      </label>
      {checked && (
        <>
          <p>
            <time dateTime={date}>{formattedDate}</time>
            {' · '}{total_elevation_gain}m gain
            {' · '}{peakList}
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
        </>
      )}
    </li>
  );
}
