import { test, expect, http, HttpResponse, passthrough } from 'next/experimental/testmode/playwright/msw';
import { loadEnv } from 'vite';
import { stravaActivities } from '../spec/support/fixtures';

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
  await expect(firstRow.getByRole('link', { name: /Up Mt Washington/ })).toBeVisible();
  await expect(firstRow.getByRole('link', { name: /Up Mt Washington/ })).toHaveAttribute('target', '_blank');

  await expect(firstRow.getByRole('textbox', { name: /name/i })).toHaveValue('Up Mt Washington');
  await expect(firstRow.getByRole('textbox', { name: /url/i })).toHaveValue('');

  await firstRow.getByRole('textbox', { name: /name/i }).fill('Mount Washington');
  await firstRow.getByRole('textbox', { name: /url/i }).fill('https://trips.com/washington');

  const secondRow = page.getByRole('listitem').nth(1);
  await secondRow.getByRole('checkbox').uncheck();

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Save activities' }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('routes.geojson');
});
