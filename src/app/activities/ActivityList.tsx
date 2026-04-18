'use client';

import { useState, useEffect, useRef } from 'react';
import { Feature, LineString } from 'geojson';
import { saveAs } from 'file-saver';
import { featureCollection } from '@turf/helpers';
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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

  function downloadFeatures(e: React.SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const features = activities
      .filter(activity => checked.get(activity.feature.id as number))
      .map(({ feature: { id, ...feature } }) => ({
        ...feature,
        properties: {
          ...feature.properties,
          name: formData.get(`name-${id}`),
          url: formData.get(`url-${id}`),
        },
      }));
    const collectionJson = JSON.stringify(featureCollection(features));
    saveAs(new Blob([collectionJson], { type: 'application/geo+json' }), 'routes.geojson');
    setPreviewUrl(`https://geojson.io/#data=data:application/json,${encodeURIComponent(collectionJson)}`);
  }

  return (
    <form onSubmit={downloadFeatures}>
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
      {previewUrl && (
        <p>✅ Saved! · <a href={previewUrl} target="_blank" rel="noreferrer">Preview on geojson.io</a></p>
      )}
    </form>
  );
}
