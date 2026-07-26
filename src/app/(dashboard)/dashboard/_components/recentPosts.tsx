import { fetchPosts } from '@/lib/api';

const RecentPosts = async () => {
  const posts = await fetchPosts(1, 5);

  return (
    <div className='bg-(--bg-primary) border border-(--border-color) rounded-lg p-4'>
      {posts.map((post) => (
        <div
          className='border-b border-(--border-color) pb-2 mb-2 last:border-b-0 min-w-0'
          key={post.id}
        >
          <h4 className='font-medium text-(--text-primary)'>{post.title}</h4>
          <p className='text-sm text-(--text-secondary) truncate'>{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default RecentPosts;