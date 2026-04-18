'use client';

import { useState } from 'react';
import { Feature, LineString } from 'geojson';
import styles from './ActivityItem.module.css';
import { Trip } from '@/lib/trips';

interface Props {
  feature: Feature<LineString, { name: string, date: string, distance: number, total_elevation_gain: number }>;
  peakNames: string[];
  potentialTrips: Trip[];
  checked: boolean;
  onChecked: (id: number) => void;
}

export default function ActivityItem({ feature, peakNames, potentialTrips, checked, onChecked }: Props) {
  const { name, date, distance, total_elevation_gain } = feature.properties;
  const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  const [url, setUrl] = useState('');
  const [routeName, setRouteName] = useState(name);

  const itemState = () => {
    if (!checked) return styles.disabled;
    if (routeName === '') return styles.empty;
    if (url === '') return styles.incomplete;
    return styles.complete;
  };

  return (
    <li className={`${styles.activityItem} ${itemState()}`}>
      <input
        aria-label={`Include ${name}`}
        type="checkbox"
        checked={checked}
        onChange={() => onChecked(feature.id as number)}
      />
      <div>
        {name}
        {!checked && (
          <span> · <time dateTime={date}>{formattedDate}</time> · {peakNames}</span>
        )}
        {checked && (
          <>
            &nbsp;(<a href={`https://www.strava.com/activities/${feature.id}`} style={{ fontWeight: 'bold' }} target="_blank" rel="noreferrer">View on Strava</a>)
            <div>
              <time dateTime={date}>{formattedDate}</time>
              {' · '}{metersToMiles(distance)} mi distance, {metersToFeet(total_elevation_gain)} ft gain
              {' · '}{peakNames}
            </div>
            <div className={styles.fieldGrouping}>
              <label>
                Route Name
                <input type="text" name={`name-${feature.id}`} value={routeName} onChange={e => setRouteName(e.target.value)} />
              </label>
              <label>
                Trip URL
                <input type="url" name={`url-${feature.id}`} value={url} onChange={e => setUrl(e.target.value)} placeholder='https://mitoc-trips.mit.edu/trips/...' />
              </label>
            </div>
            {potentialTrips.every(trip => trip.url !== url) && (
              <div>
                {potentialTrips.map(trip => (
                  <div key={trip.id}>
                    <label>
                      <input type="radio" onChange={() => { setRouteName(trip.name); setUrl(trip.url); }} /> {trip.name}
                    </label>
                    &nbsp;(<a href={trip.url} target="_blank" rel="noopener">View in MITOC Trips</a>)
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

const METERS_TO_FEET = 3.28084;
function metersToFeet(meters: number): string {
  return Math.round(meters * METERS_TO_FEET).toLocaleString();
}
const FEET_PER_MILE = 5280;
function metersToMiles(meters: number): string {
  return (meters * METERS_TO_FEET / FEET_PER_MILE).toFixed(2);
}
