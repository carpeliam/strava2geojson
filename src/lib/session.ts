import { cookies } from 'next/headers';

const COOKIE_NAME = 'strava_session';

export interface StravaSession {
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

export async function getSession(): Promise<StravaSession | null> {
  const cookie = (await cookies()).get(COOKIE_NAME);
  if (!cookie) return null;
  try {
    return JSON.parse(cookie.value) as StravaSession;
  } catch {
    return null;
  }
}

export async function setSession(session: StravaSession): Promise<void> {
  const maxAge = session.expires_at - Math.floor(Date.now() / 1000);
  (await cookies()).set(COOKIE_NAME, JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
  });
}

export function isSessionValid(session: StravaSession): boolean {
  return session.expires_at > Math.floor(Date.now() / 1000);
}
