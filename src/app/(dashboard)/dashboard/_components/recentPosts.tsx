import { fetchPosts } from '@/lib/api';

const RecentPosts = async () => {
  await new Promise((resolve) => setTimeout(() => resolve(''), 2000));
  const posts = await fetchPosts(1, 5);

  return (
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
  );
};

export default RecentPosts;
