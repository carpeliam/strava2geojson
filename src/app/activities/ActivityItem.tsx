'use client';

import { useState } from 'react';
import { Feature, LineString } from 'geojson';
import styles from './ActivityItem.module.css';
import { Trip } from '@/lib/trips';

interface Props {
  feature: Feature<LineString>;
  peakNames: string[];
  potentialTrips: Trip[];
  checked: boolean;
  onChecked: (id: number) => void;
}

export default function ActivityItem({ feature, peakNames, potentialTrips, checked, onChecked }: Props) {
  const { name, date, total_elevation_gain } = feature.properties!;
  const { id, ...featureWithoutId } = feature;
  const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const [url, setUrl] = useState('');
  const [routeName, setRouteName] = useState<string>(name);
  const [savedFeature, saveFeature] = useState(featureWithoutId);

  const itemState = () => {
    if (!checked) return styles.disabled;
    if (routeName === '') return styles.empty;
    if (url === '') return styles.incomplete;
    return styles.complete;
  };

  const updateName = (name: string) => {
    setRouteName(name);
    const properties = { ...savedFeature.properties, name };
    saveFeature({ ...savedFeature, properties });
  };
  const updateUrl = (url: string) => {
    setUrl(url);
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
        checked={checked}
        onChange={() => onChecked(id as number)}
      />
      <div>
        {name}
        {!checked && (
          <span> · <time dateTime={date}>{formattedDate}</time> · {peakNames}</span>
        )}
        {checked && (
          <>
            &nbsp;(<a href={`https://www.strava.com/activities/${id}`} style={{ fontWeight: 'bold' }} target="_blank" rel="noreferrer">View on Strava</a>)
            <div>
              <time dateTime={date}>{formattedDate}</time>
              {' · '}{total_elevation_gain}m gain
              {' · '}{peakNames}
            </div>
            <div className={styles.fieldGrouping}>
              <label>
                Route Name
                <input type="text" name={`name-${id}`} value={routeName} onChange={e => updateName(e.target.value)} />
              </label>
              <label>
                Trip URL
                <input type="url" name={`url-${id}`} value={url} onChange={e => updateUrl(e.target.value)} placeholder='https://mitoc-trips.mit.edu/trips/1234/' />
              </label>
            </div>
            {potentialTrips.every(trip => trip.url !== url) && (
              <div>
                {potentialTrips.map(trip => (
                  <div key={trip.id}>
                    <label>
                      <input type="radio" onChange={() => { updateName(trip.name); updateUrl(trip.url); }} /> {trip.name}
                    </label>
                    &nbsp;(<a href={trip.url} target="_blank">View in MITOC Trips</a>)
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </li>
  );
}
