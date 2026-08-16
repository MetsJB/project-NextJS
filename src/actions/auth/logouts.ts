'use server';

import { deleteFamilyByToken } from '@/lib/auth/refreshToken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function logout() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (refreshToken) {
    await deleteFamilyByToken(refreshToken);
  }

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');

  redirect('/login');
}
