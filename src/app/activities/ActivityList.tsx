'use client';

import { useState, useEffect, useRef } from 'react';
import { Feature, LineString } from 'geojson';
import { Trip } from '@/lib/trips';
import ActivityItem from './ActivityItem';
import styles from './ActivityList.module.css';

interface ActivityWithTrips {
  feature: Feature<LineString>;
  potentialTrips: Trip[];
}
interface Props {
  peakNameForId: Record<string, string>;
  activities: ActivityWithTrips[];
}

export default function ActivityList({ activities, peakNameForId }: Props) {
  const [checked, setChecked] = useState<Map<number, boolean>>(
    () => new Map(activities.map(a => [a.feature.id as number, true])),
  );

  const allChecked = [...checked.values()].every(Boolean);
  const someChecked = [...checked.values()].some(Boolean);
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someChecked && !allChecked;
    }
  }, [someChecked, allChecked]);

  const handleSelectAll = () => {
    setChecked(new Map(activities.map(a => [a.feature.id as number, !allChecked])));
  };

  const handleChecked = (id: number) => {
    setChecked(prev => new Map(prev).set(id, !prev.get(id)));
  };

  function activityItem({ feature, potentialTrips }: ActivityWithTrips) {
    const peakNames = feature.properties!.peaks.map((peakId: string) => peakNameForId[peakId]).join(', ');

    return (
      <ActivityItem key={feature.id}
        feature={feature}
        potentialTrips={potentialTrips}
        peakNames={peakNames}
        checked={checked.get(feature.id as number) ?? true}
        onChecked={handleChecked}
      />
    );
  }

  return (
    <form action="/activities/export" method="POST">
      <label>
        <input
          type="checkbox"
          ref={selectAllRef}
          checked={allChecked}
          onChange={handleSelectAll}
          className={styles.selectAll}
        />
        Select All
      </label>
      <ul className={styles.activities}>
        {activities.map(activityItem)}
      </ul>
    <button type="submit">Save activities</button>
    </form>
  );
}
