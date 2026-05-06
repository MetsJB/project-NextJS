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
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-lg'>Посты</h2>
        <Link
          className='px-3 py-1 bg-zinc-200 hover:bg-zinc-300 rounded border border-zinc-200 transition-colors'
          href='/dashboard/posts/create'
        >
          Создать статью
        </Link>
      </div>
      <table className='border border-collapse  w-full '>
        <thead className='border-b border-zinc-200'>
          <tr className='hover:bg-zinc-50'>
            <th className='text-left p-2 text-sm text-zinc-500 font-medium'>
              ID
            </th>
            <th className='text-left p-2 text-sm text-zinc-500 font-medium'>
              Заголовок
            </th>
            <th className='text-left p-2 text-sm text-zinc-500 font-medium'>
              Автор
            </th>
            <th className='text-left p-2 text-sm text-zinc-500 font-medium'>
              Действия
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr className='hover:bg-zinc-50' key={post.id}>
              <td className='p-2 border-b border-zinc-100'> {post.id}</td>
              <td className='p-2 border-b border-zinc-100'> {post.title}</td>
              <td className='p-2 border-b border-zinc-100'> {post.userId}</td>
              <td className='p-2 border-b border-zinc-100'>
                <Link href={`/dashboard/posts/${post.id}`}>Просмотр</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='flex items-center gap-2 mt-6'>
        {pageSearch === 1 ? (
          <div className='text-zinc-300 px-3 py-1'>Назад</div>
        ) : (
          <Link
            className='px-3 py-1 hover:bg-zinc-100 rounded border border-zinc-200'
            href={`/dashboard/posts?page=${pageSearch - 1}`}
          >
            Назад
          </Link>
        )}

        {Array.from({ length: 10 }, (_, i) => {
          const item = i + 1;
          const elem =
            pageSearch === item ? (
              <span className='bg-zinc-900 text-white px-2 py-1 rounded font-semibold'>
                {item}
              </span>
            ) : (
              <Link
                className='px-2 py-1 hover:bg-zinc-100 rounded'
                href={`/dashboard/posts?page=${item}`}
              >
                {item}
              </Link>
            );
          return <div key={i}>{elem}</div>;
        })}
        {pageSearch === 10 ? (
          <div className='text-zinc-300 px-3 py-1'>Вперед</div>
        ) : (
          <Link
            className='px-3 py-1 hover:bg-zinc-100 rounded border border-zinc-200'
            href={`/dashboard/posts?page=${pageSearch + 1}`}
          >
            Вперед
          </Link>
        )}
      </div>
    </>
  );
};

export default page;
