'use server';

import { prisma } from '@/lib/prisma';
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

  const res = await prisma.post.create({
    data: {
      title: title.trim(),
      body: body.trim(),
      userId: 1,
    },
  });

  console.log(res)

  revalidatePath('/dashboard/posts');
  redirect('/dashboard/posts');
}
