import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { overpassJson } from 'overpass-ts';
import osmtogeojson from 'osmtogeojson';
import { simplifyLine, truncatePoints } from '../src/lib/transforms.ts';


const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = join(__dirname, '..', 'src', 'data');
const peaksFile = join(dataDir, 'peaks.json');

const OVERPASS_QUERY = `
[out:json][timeout:60];

area["ISO3166-1"="US"][admin_level=2]->.usa;

node
  ["natural"="peak"]
  ["name"~"."]
  ["ele"~"^(9[0-9]{2}|[1-9][0-9]{3,})"]
  (41,-73.8,47.6,-66.7)
  (area.usa);

out;
`;

if (existsSync(peaksFile)) {
  console.log('OSM data already exists; skipping fetch.');
} else {
  mkdirSync(dataDir, { recursive: true });

  console.log('Fetching OSM data from Overpass…');
  const data = await overpassJson(OVERPASS_QUERY);

  if (data.elements.length === 0) {
    throw new Error(data.remark);
  }

  console.log('Converting to GeoJSON…');
  const geojson = truncatePoints(
    simplifyLine(
      osmtogeojson(
        data,
      ),
    ),
  );

  console.log('Writing file…');
  writeFileSync(peaksFile, JSON.stringify(geojson));

  console.log('Done.');
}
