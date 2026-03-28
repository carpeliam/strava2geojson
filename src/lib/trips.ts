export interface TripLeader {
  name: string,
  id: number,
  url: string,
};

export interface Trip {
  id: number,
  name: string,
  url: string,
  program: string,
  primaryTripActivity: string,
  tripDate: string,
  leaders: TripLeader[],
  description: string,
}

let tripsCache: Map<string, Trip[]> | null = null;

export function buildTripIndex(trips: Trip[]): Map<string, Trip[]> {
  const index = new Map<string, Trip[]>();
  for (const trip of trips) {
    const existing = index.get(trip.tripDate) ?? [];
    existing.push(trip);
    index.set(trip.tripDate, existing);
  }
  return index;
}

export async function fetchTrips(): Promise<Map<string, Trip[]>> {
  if (tripsCache) return tripsCache;
  const res = await fetch(process.env.MITOC_TRIPS_URL!, {
    headers: { authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
  });
  const trips: Trip[] = await res.json();
  tripsCache = buildTripIndex(trips);
  return tripsCache;
}

export function hikingTripsForDate(date: string, trips: Map<string, Trip[]>) {
  const tripsOnDate = trips.get(date) ?? [];
  return tripsOnDate.filter(trip => trip.primaryTripActivity === 'Hiking');
}
