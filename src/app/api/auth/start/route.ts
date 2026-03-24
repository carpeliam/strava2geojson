import { redirect } from 'next/navigation';
import { getSession, isSessionValid } from '@/lib/session';
import { getAuthUrl } from '@/lib/strava';

export async function GET() {
  const session = await getSession();
  if (session && isSessionValid(session)) {
    redirect('/activities');
  }
  redirect(getAuthUrl('activity:read_all'));
}
