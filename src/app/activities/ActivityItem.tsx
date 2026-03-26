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
    if (!isChecked) return 'disabled';
    if (!isNamePresent) return 'empty';
    if (!isUrlPresent) return 'incomplete';
    return 'complete';
  };

  const updateName = (name: string) => {
    setNamePresent(name !== '');
    const properties = { ...savedFeature.properties, name };
    saveFeature({ ...savedFeature, properties });
  };
  const updateUrl = (url: string) => {
    setUrlPresent(url !== '');
    const properties = { ...savedFeature.properties, url };
    saveFeature({ ...savedFeature, properties });
  };

  return (
    <li className={styles.activityItem} style={{ backgroundColor: `var(--item-${itemState()})` }}>
      <input
        aria-label={`Include ${name}`}
        type="checkbox"
        name="include"
        value={JSON.stringify(savedFeature)}
        checked={isChecked}
        onChange={e => setChecked(e.target.checked)}
      />
      <div>
        <a href={`https://www.strava.com/activities/${id}`} target="_blank" rel="noreferrer">
          {name}
        </a>
        {!isChecked && (
          <span> · <time dateTime={date}>{formattedDate}</time> · {peakList}</span>
        )}
        {isChecked && (
          <>
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
                <input type="text" name={`url-${id}`} onChange={e => updateUrl(e.target.value)} placeholder='https://mitoc-trips.mit.edu/trips/1234/' />
              </label>
            </div>
          </>
        )}
      </div>
    </li>
  );
}
