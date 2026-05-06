'use client';

import { createPost } from '@/app/(dashboard)/dashboard/posts/create/actions';
import Link from 'next/link';
import { useActionState } from 'react';

const Page = () => {
  const [state, formAction, isPending] = useActionState(createPost, null);

  return (
    <div className='max-w-2xl mx-auto'>
      <Link
        className='inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-6 transition-colors'
        href='/dashboard/posts'
      >Назад</Link>

      <h2 className='text-2xl font-bold mb-6'>Создать пост</h2>
      <form
        className='bg-white border border-zinc-200 rounded-xl p-6 space-y-4'
        action={formAction}
      >
        <label
          className='block text-sm font-medium text-zinc-700 mb-1'
          htmlFor='title'
        >
          Заголовок
        </label>
        <input
          name='title'
          type='text'
          className='w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition'
        />
        <label
          htmlFor='body'
          className='block text-sm font-medium text-zinc-700 mb-1'
        >
          Текст
        </label>
        <textarea
          name='body'
          className='w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition min-h-[150px] resize-y'
        />
        <button
          type='submit'
          className='w-full bg-zinc-900 text-white py-2 rounded-lg hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed'
          disabled={isPending}
        >
          {isPending ? 'Отправка...' : 'Создать'}
        </button>
        {state?.error && (
          <p className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm'>
            {state.error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Page;
