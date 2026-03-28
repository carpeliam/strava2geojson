import { test, expect, http, HttpResponse, passthrough } from 'next/experimental/testmode/playwright/msw';
import { loadEnv } from 'vite';
import { stravaActivities, trips } from '../spec/support/fixtures';
import { readFile } from 'node:fs/promises';
import type { FeatureCollection, LineString } from 'geojson';

const { STRAVA_CLIENT_ID } = loadEnv('development', process.cwd(), 'STRAVA');

test.use({
  mswHandlers: [
    [
      http.post('https://www.strava.com/oauth/token', () =>
        HttpResponse.json({
          access_token: 'fake_access_token',
          refresh_token: 'fake_refresh_token',
          expires_at: 9999999999,
          token_type: 'Bearer',
          athlete: { id: 123 },
        }),
      ),
      http.get('https://www.strava.com/api/v3/athlete/activities', () =>
        HttpResponse.json(stravaActivities),
      ),
      http.get('https://private.blob.vercel-storage.com/trips.json', () =>
        HttpResponse.json(trips),
      ),
      http.all('*', () => passthrough()),
    ],
    { scope: 'test' },
  ],
});

test('can download geojson based on activities', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.getByRole('link', { name: 'Connect to Strava' })).toBeVisible();

  await page.getByRole('link', { name: 'Connect to Strava' }).click();
  await expect(page).toHaveURL(/test\/auth\/stub/);
  expect(decodeURIComponent(page.url())).toMatch(`client_id=${STRAVA_CLIENT_ID}`);
  expect(decodeURIComponent(page.url())).toMatch('scope=activity:read_all');

  await page.getByRole('button', { name: 'Authorize' }).click();

  await expect(page).toHaveURL('http://localhost:3000/activities');

  await expect(page.getByRole('list')).toBeVisible();

  const firstRow = page.getByRole('listitem').nth(0);
  await expect(firstRow.getByRole('checkbox')).toBeChecked();
  await expect(firstRow).toContainText('Up Mt Washington');

  await expect(firstRow.getByLabel('Route Name')).toHaveValue('Up Mt Washington');
  await page.getByLabel('Mt Isolation via Boott Spur').click();
  await expect(firstRow.getByLabel('Trip URL')).toHaveValue('https://mitoc-trips.mit.edu/trips/123/');

  await firstRow.getByLabel('Route Name').fill('Mount Washington');
  await firstRow.getByLabel('Trip URL').fill('https://trips.com/washington');

  const secondRow = page.getByRole('listitem').nth(1);
  await secondRow.getByRole('checkbox').uncheck();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Save activities' }).click(),
  ]);
  expect(download.suggestedFilename()).toBe('routes.geojson');
  const fileContents = JSON.parse(await readFile(await download.path(), 'utf8')) as FeatureCollection<LineString>;

  expect(fileContents.features[0].properties).toEqual(expect.objectContaining({
    name: 'Mount Washington',
    url: 'https://trips.com/washington',
  }));
});
