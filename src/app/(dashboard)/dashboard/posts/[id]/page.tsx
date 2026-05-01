import { fetchComments, fetchPost, fetchUser } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PostProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 60;

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
      <Link href={'/dashboard/posts'}>Назад</Link>
      <h3>Заголовок: {post.title}</h3>
      <p>Текст: {post.body}</p>
      <Link href={`/dashboard/users/${user.id}`}>Имя: {user.name}</Link>
      <p>Количество комментариев: {comments.length}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {comments.map((comment) => {
          return (
            <div
              style={{
                backgroundColor: '#dfdfdf',
              }}
              key={comment.id}
            >
              <p>Имя автора:{comment.name}</p>
              <p>EMAIL:{comment.email}</p>
              <p>Комментарий: {comment.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
