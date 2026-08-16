import { verifyAccessToken } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function requireAdmin() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    redirect('/login');
  }

  const payload = await verifyAccessToken(accessToken);
  if (!payload || payload.role !== 'admin') {
    redirect('/dashboard');
  }
}
