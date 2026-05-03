import { fetchComments, fetchPost, fetchUser } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PostProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
  }));
}

const page = async (props: PostProps) => {
  const { params } = props;
  const { id } = await params;
  const [post, comments] = await Promise.all([
    fetchPost(id).catch(() => notFound()),
    fetchComments(id),
  ]);
  const user = await fetchUser(String(post.userId));

  return (
    <div>
      <Link
        className='inline-block mb-4 text-zinc-600 hover:text-zinc-900'
        href={'/dashboard/posts'}
      >
        Назад
      </Link>
      <h3 className='text-2xl font-bold mb-2'>{post.title}</h3>
      <p className='text-zinc-700 mb-6 leading-relaxed'>{post.body}</p>
      <div className='flex items-center gap-2 text-sm text-zinc-500 mb-6'>
        <span>Автор:</span>
        <Link
          href={`/dashboard/users/${user.id}`}
          className='text-zinc-900 hover:underline'
        >
          {user.name}
        </Link>
      </div>
      <hr className='my-6 border-zinc-200' />
      <p className='text-lg font-semibold mb-4'>
        Количество комментариев: {comments.length}
      </p>
      {comments.map((comment) => {
        return (
          <div
            className='bg-zinc-50 border border-zinc-100 rounded-lg p-4 mb-3'
            key={comment.id}
          >
            <p className='font-medium'>{comment.name}</p>
            <p className='text-sm text-zinc-400'>{comment.email}</p>
            <p className='text-zinc-600 mt-1'>{comment.body}</p>
          </div>
        );
      })}
    </div>
  );
};

export default page;
