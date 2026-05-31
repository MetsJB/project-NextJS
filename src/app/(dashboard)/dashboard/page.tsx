import RecentPosts from '@/app/(dashboard)/dashboard/_components/recentPosts';
import RecentPostsSkeleton from '@/app/(dashboard)/dashboard/_components/recentPostsSkeleton';
import { fetchAlbums, fetchAllComments, fetchAllPosts, fetchUsers } from '@/lib/api';
import { Suspense } from 'react';

const page = async () => {
  const posts = (await fetchAllPosts()).length;
  const users = (await fetchUsers()).length;
  const comments = (await fetchAllComments()).length;
  const albums = (await fetchAlbums()).length;

  return (
    <div>
      <h2 className='text-2xl font-bold mb-6'>Обзор</h2>
      <div className='grid grid-cols-4 gap-4 mb-5 text-center'>
        <div className='bg-white border border-zinc-200 rounded-lg p-4 '>
          <p className='text-gray-500 text-sm'>Всего постов</p>
          <p className='font-semibold text-lg'>{posts}</p>
        </div>
        <div className='bg-white border border-zinc-200 rounded-lg p-4'>
          <p className='text-gray-500 text-sm'>Пользователей</p>
          <p className='font-semibold text-lg'>{users}</p>
        </div>
        <div className='bg-white border border-zinc-200 rounded-lg p-4'>
          <p className='text-gray-500 text-sm'>Комментариев</p>
          <p className='font-semibold text-lg'>{comments}</p>
        </div>
        <div className='bg-white border border-zinc-200 rounded-lg p-4'>
          <p className='text-gray-500 text-sm'>Альбомов</p>
          <p className='font-semibold text-lg'>{albums}</p>
        </div>
      </div>
      <h3 className='font-medium text-lg text-zinc-800 mb-3'>
        Последние посты
      </h3>
      <Suspense fallback={<RecentPostsSkeleton />}>
        <RecentPosts />
      </Suspense>
    </div>
  );
};

export default page;
