import type { Feature, LineString } from 'geojson';
import { featureCollection } from '@turf/helpers';

export async function POST(request: Request) {
  const formData = await request.formData();
  const formValues = formData.getAll('include') as string[];
  const features = formValues.map(value => JSON.parse(value) as Feature<LineString>);
  const collection = featureCollection(features);

  return new Response(JSON.stringify(collection), {
    headers: {
      'Content-Type': 'application/geo+json',
      'Content-Disposition': 'attachment; filename="routes.geojson"',
    },
  });
}
