import { redirect } from 'next/navigation';
import strava from 'strava-v3';
import { setSession } from '@/lib/session';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  if (!code) redirect('/');

  const token = await strava.oauth.getToken(code);

  await setSession({
    access_token: token.access_token,
    refresh_token: token.refresh_token,
    expires_at: token.expires_at,
  });

  redirect('/activities');
}
