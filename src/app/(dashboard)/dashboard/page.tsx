import { fetchPosts } from '@/lib/api';

const page = async () => {
  const posts = await fetchPosts(1, 5);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.id}. {post.title}</div>
      ))}
    </div>
  );
};

export default page;
