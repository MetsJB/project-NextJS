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
      <h2 className='text-2xl font-bold mb-6 text-(--text-primary)'>Обзор</h2>
      <div className='grid grid-cols-4 gap-4 mb-5 text-center'>
        <div className='bg-(--bg-primary) border border-(--border-color) rounded-lg p-4'>
          <p className='text-(--text-secondary) text-sm'>Всего постов</p>
          <p className='font-semibold text-lg text-(--text-primary)'>{posts}</p>
        </div>
        <div className='bg-(--bg-primary) border border-(--border-color) rounded-lg p-4'>
          <p className='text-(--text-secondary) text-sm'>Пользователей</p>
          <p className='font-semibold text-lg text-(--text-primary)'>{users}</p>
        </div>
        <div className='bg-(--bg-primary) border border-(--border-color) rounded-lg p-4'>
          <p className='text-(--text-secondary) text-sm'>Комментариев</p>
          <p className='font-semibold text-lg text-(--text-primary)'>{comments}</p>
        </div>
        <div className='bg-(--bg-primary) border border-(--border-color) rounded-lg p-4'>
          <p className='text-(--text-secondary) text-sm'>Альбомов</p>
          <p className='font-semibold text-lg text-(--text-primary)'>{albums}</p>
        </div>
      </div>
      <h3 className='font-medium text-lg text-(--text-primary) mb-3'>
        Последние посты
      </h3>
      <Suspense fallback={<RecentPostsSkeleton />}>
        <RecentPosts />
      </Suspense>
    </div>
  );
};

export default page;