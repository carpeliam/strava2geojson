import { copyFileSync, existsSync, mkdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { overpassJson } from 'overpass-ts';
import osmtogeojson from 'osmtogeojson';
import { simplifyLine, truncatePoints } from '../src/lib/transforms.ts';


const __dirname = dirname(fileURLToPath(import.meta.url));
const cacheDir = join(__dirname, '..', '.next', 'cache');
const dataDir = join(__dirname, '..', 'src', 'data');
const peaksCache = join(cacheDir, 'peaks.json');
const peaksFile = join(dataDir, 'peaks.json');
const MAX_CACHE_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 1 week

function isCached() {
  if (existsSync(peaksCache)) {
    const { mtimeMs } = statSync(peaksCache);
    console.log('Cached file found, created at:', new Date(mtimeMs).toLocaleString());
    return (Date.now() - mtimeMs < MAX_CACHE_AGE_MS);
  }
  return false;
}

if (existsSync(peaksFile)) {
  console.log('Peaks file already exists at destination output, no further action necessary.');
  process.exit(0);
}

if (isCached()) {
  console.log('Peaks cache still fresh, skipping fetch');
} else {
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

  console.log('Writing cache…');
  mkdirSync(cacheDir, { recursive: true });
  writeFileSync(peaksCache, JSON.stringify(geojson));
}
console.log('copying cached file to data dir…');
mkdirSync(dataDir, { recursive: true });
copyFileSync(peaksCache, peaksFile);
console.log('Done.');
