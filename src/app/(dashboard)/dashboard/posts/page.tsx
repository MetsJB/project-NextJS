import { fetchPosts } from '@/lib/api';
import Link from 'next/link';

interface PostsPage {
  searchParams: Promise<{ page: string }>;
}

const page = async (props: PostsPage) => {
  const { searchParams } = props;
  const { page } = await searchParams;
  const pageSearch = Number(page) || 1;

  const posts = await fetchPosts(pageSearch, 10);

  return (
    <>
      <h2>Посты</h2>
      <table
        style={{ marginTop: '40px', width: '100%' }}
        className='border border-collapse text-center'
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Автор</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr className='border' key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.userId}</td>
              <td>
                <Link href={`/dashboard/posts/${post.id}`}>Просмотр</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '40px', display: 'flex', gap: '5px' }}>
        {pageSearch === 1 ? (
          <div style={{ opacity: '0.5' }}>Назад</div>
        ) : (
          <Link href={`/dashboard/posts?page=${pageSearch - 1}`}>Назад</Link>
        )}

        {Array.from({ length: 10 }, (_, i) => {
          const item = i + 1;
          const elem =
            pageSearch === item ? (
              <strong>{item}</strong>
            ) : (
              <Link href={`/dashboard/posts?page=${item}`}>{item}</Link>
            );
          return <div key={i}>{elem}</div>;
        })}
        {pageSearch === 10 ? (
          <div style={{ opacity: '0.5' }}>Вперед</div>
        ) : (
          <Link href={`/dashboard/posts?page=${pageSearch + 1}`}>Вперед</Link>
        )}
      </div>
    </>
  );
};

export default page;
