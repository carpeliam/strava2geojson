import { test, expect, http, HttpResponse } from 'next/experimental/testmode/playwright/msw';
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
  await expect(firstRow.getByRole('checkbox', { name: 'Include Up Mt Washington' })).toBeChecked();
  await expect(firstRow).toContainText('Up Mt Washington');
  await expect(firstRow).toContainText('Jul 30, 2023');
  await expect(firstRow).toContainText('Boott Spur, Mount Isolation, Mount Washington, Lion Head, North Isolation');
  await firstRow.getByText('crampons').click();
  await firstRow.getByText('buttsled').click();

  await expect(firstRow.getByLabel('Route Name')).toHaveValue('Up Mt Washington');

  await firstRow.getByLabel('Route Name').fill('Mount Washington');
  await firstRow.getByLabel('Trip URL').fill('https://trips.com/washington');

  const secondRow = page.getByRole('listitem').nth(1);
  await secondRow.getByRole('checkbox', { name: 'Katahdin via Cathedral' }).uncheck();

  const thirdRow = page.getByRole('listitem').nth(2);
  await page.getByLabel('Cool Cats on Cannon').click();
  await expect(thirdRow.getByLabel('Route Name')).toHaveValue('Cool Cats on Cannon');
  await expect(thirdRow.getByLabel('Trip URL')).toHaveValue('https://mitoc-trips.mit.edu/trips/456/');

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Save activities' }).click(),
  ]);
  expect(download.suggestedFilename()).toBe('routes.geojson');
  const fileContents = JSON.parse(await readFile(await download.path(), 'utf8')) as FeatureCollection<LineString>;

  expect(fileContents.features).toHaveLength(2);
  expect(fileContents.features[0].id).toBeUndefined();
  expect(fileContents.features[0].properties).toEqual(expect.objectContaining({
    name: 'Mount Washington',
    url: 'https://trips.com/washington',
    keywords: ['crampons', 'buttsled'],
    peaks: ['node/357729727', 'node/357730186', 'node/2432687944', 'node/2951268816', 'node/7289040579'],
  }));
  expect(fileContents.features[1].properties).toEqual(expect.objectContaining({
    name: 'Cool Cats on Cannon',
    url: 'https://mitoc-trips.mit.edu/trips/456/',
    keywords: [],
    peaks: ['node/357731219'],
  }));
});
