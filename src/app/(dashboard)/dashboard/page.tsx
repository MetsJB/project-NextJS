import { fetchPosts } from '@/lib/api';

const page = async () => {
  const posts = await fetchPosts(1, 5);

  return (
    <div>
      <h2 className='text-2xl font-bold mb-6'>Обзор</h2>
      <div className='grid grid-cols-4 gap-4 mb-5 text-center'>
        <div className='bg-white border border-zinc-200 rounded-lg p-4 '>
          <p className='text-gray-500 text-sm'>Всего постов</p>
          <p className='font-semibold text-lg'>100</p>
        </div>
        <div className='bg-white border border-zinc-200 rounded-lg p-4'>
          <p className='text-gray-500 text-sm'>Пользователей</p>
          <p className='font-semibold text-lg'>10</p>
        </div>
        <div className='bg-white border border-zinc-200 rounded-lg p-4'>
          <p className='text-gray-500 text-sm'>Комментариев</p>
          <p className='font-semibold text-lg'>500</p>
        </div>
        <div className='bg-white border border-zinc-200 rounded-lg p-4'>
          <p className='text-gray-500 text-sm'>Альбомов</p>
          <p className='font-semibold text-lg'>100</p>
        </div>
      </div>
      <h3 className='font-medium text-lg text-zinc-800 mb-3'>
        Последние посты
      </h3>
      <div className='bg-white border border-zinc-200 rounded-lg p-4 '>
        {posts.map((post) => (
          <div
            className='border-b border-zinc-100 pb-2 mb-2 last:border-b-0 min-w-0'
            key={post.id}
          >
            <h4 className='font-medium'>{post.title}</h4>
            <p className='text-sm text-zinc-500 truncate'>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
