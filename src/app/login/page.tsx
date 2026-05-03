'use client';

import { login } from '@/app/login/actions';
import { useActionState } from 'react';

const Page = () => {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className=' min-h-screen flex items-center justify-center bg-zinc-100 gap-3'>
      <form
        action={formAction}
        className='bg-white p-8 rounded-xl shadow-sm border border-zinc-200 w-full max-w-md'
      >
        <h1 className='text-2xl font-bold text-center mb-6'>Вход</h1>
        <label
          htmlFor='username'
          className='block text-lg font-medium text-zinc-700 mb-1'
        >
          Введите имя пользователя
        </label>
        <input
          className='w-full mb-4 px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition'
          name='username'
          type='text'
        />
        <button
          className='w-full mt-2 mb-2 bg-zinc-900 text-white py-2 rounded-lg hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed'
          type='submit'
          disabled={isPending}
        >
          {isPending ? 'Загрузка...' : 'Войти'}
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
