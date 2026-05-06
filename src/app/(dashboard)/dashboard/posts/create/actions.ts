'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(
  prevState: { error: string } | null,
  formData: FormData
) {
  const title = formData.get('title') as string;
  const body = formData.get('body') as string;

  if (!title || title.trim() === '' || !body || body.trim() === '') {
    return { error: 'Заполните все поля' };
  }

  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({ title, body, userId: 1 }),
    headers: { 'Content-Type': 'application/json' },
  });

  const value = await res.json();
  console.log('VALUE', value);

  revalidatePath('/dashboard/posts');
  redirect('/dashboard/posts');
}
