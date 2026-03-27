'use client';

import { useState } from 'react';
import { Feature, LineString } from 'geojson';
import styles from './ActivityItem.module.css';

interface Props {
  feature: Feature<LineString>;
  peakNames: Record<string, string>;
}

export default function ActivityItem({ feature, peakNames }: Props) {
  const { name, date, total_elevation_gain, peaks: peakIds } = feature.properties!;
  const { id, ...featureWithoutId } = feature;
  const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const peakList = peakIds.map((peakId: string) => peakNames[peakId]).join(', ');

  const [savedFeature, saveFeature] = useState(featureWithoutId);
  const [isChecked, setChecked] = useState(true);
  const [isNamePresent, setNamePresent] = useState(name !== '');
  const [isUrlPresent, setUrlPresent] = useState(false);

  const itemState = () => {
    if (!isChecked) return styles.disabled;
    if (!isNamePresent) return styles.empty;
    if (!isUrlPresent) return styles.incomplete;
    return styles.complete;
  };

  const updateName = (name: string) => {
    setNamePresent(name !== '');
    const properties = { ...savedFeature.properties, name };
    saveFeature({ ...savedFeature, properties });
  };
  const updateUrl = (url: string) => {
    setUrlPresent(url.startsWith('http'));
    const properties = { ...savedFeature.properties, url };
    saveFeature({ ...savedFeature, properties });
  };

  return (
    <li className={`${styles.activityItem} ${itemState()}`}>
      <input
        aria-label={`Include ${name}`}
        type="checkbox"
        name="include"
        value={JSON.stringify(savedFeature)}
        checked={isChecked}
        onChange={e => setChecked(e.target.checked)}
      />
      <div>
        {name}
        {!isChecked && (
          <span> · <time dateTime={date}>{formattedDate}</time> · {peakList}</span>
        )}
        {isChecked && (
          <>
            &nbsp;(<a href={`https://www.strava.com/activities/${id}`} style={{ fontWeight: 'bold' }} target="_blank" rel="noreferrer">View on Strava</a>)
            <div>
              <time dateTime={date}>{formattedDate}</time>
              {' · '}{total_elevation_gain}m gain
              {' · '}{peakList}
            </div>
            <div className={styles.fieldGrouping}>
              <label>
                Route Name
                <input type="text" name={`name-${id}`} defaultValue={name} onChange={e => updateName(e.target.value)} />
              </label>
              <label>
                Trip URL
                <input type="url" name={`url-${id}`} onChange={e => updateUrl(e.target.value)} placeholder='https://mitoc-trips.mit.edu/trips/1234/' />
              </label>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
