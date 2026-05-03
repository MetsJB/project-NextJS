'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(
  prevState: { error: string } | null,
  formData: FormData
) {
  const username = formData.get('username') as string;

  if (!username || username.trim() === '') {
    return { error: 'Имя обязательно' };
  }

  if (username.trim() !== 'zahar') {
    return { error: 'Неверное имя' };
  }

  const cookieStore = await cookies();
  cookieStore.set('username', username.trim());

  redirect('/dashboard');
}
