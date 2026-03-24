import strava, { type SummaryActivity } from 'strava-v3';

export function getAuthUrl(scope: string): string {
  const override = process.env.STRAVA_AUTH_URL;
  if (override) {
    const url = new URL(override);
    url.searchParams.append('scope', scope);
    url.searchParams.append('client_id', process.env.STRAVA_CLIENT_ID!);
    url.searchParams.append('redirect_uri', process.env.STRAVA_REDIRECT_URI!);
    return url.toString();
  }
  return strava.oauth.getRequestAccessURL({ scope });
}

const PER_PAGE = 100;
export async function fetchAllActivities(accessToken: string): Promise<SummaryActivity[]> {
  const all: SummaryActivity[] = [];
  let page = 1;

  while (true) {
    const results = await strava.athlete.listActivities({
      access_token: accessToken,
      per_page: PER_PAGE,
      page,
    });

    all.push(...results);

    if (results.length < PER_PAGE) break;
    page++;
  }

  return all;
}
