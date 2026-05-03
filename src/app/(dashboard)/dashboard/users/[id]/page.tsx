import { fetchUser, fetchUserAlbums, fetchUserPosts } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface UserProps {
  params: Promise<{ id: string }>;
}
export const revalidate = 60;

export async function generateStaticParams() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: String(i + 1),
  }));
}

const page = async ({ params }: UserProps) => {
  const { id } = await params;
  const [user, albums, posts] = await Promise.all([
    fetchUser(id),
    fetchUserAlbums(id),
    fetchUserPosts(id),
  ]);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <Link
        className='inline-block mb-4 text-zinc-600 hover:text-zinc-900'
        href={'/dashboard/users'}
      >
        Назад
      </Link>
      <p className='text-2xl font-bold mb-4'>{user.name}</p>
      <p className='text-sm text-zinc-600 mb-1'>{user.username}</p>
      <p className='text-sm text-zinc-600 mb-1'>{user.email}</p>
      <p className='text-sm text-zinc-600 mb-1'>{user.phone}</p>
      <Link
        rel='noopener noreferrer'
        href={`https://${user.website}`}
        className='text-zinc-900 hover:underline'
        target='_blank'
      >
        {user.website}
      </Link>
      <p className='text-sm text-zinc-600 mb-1'>{user.company.name}</p>
      <div>
        <h3 className='text-lg font-semibold mt-6 mb-3'>Посты</h3>
        {posts.map((post) => (
          <Link href={`/dashboard/posts/${post.id}`} key={post.id}>
            <span className='block text-zinc-600 hover:text-zinc-900 mb-1'>
              {post.title}
            </span>
          </Link>
        ))}
      </div>
      <div>
        <h3 className='text-lg font-semibold mt-6 mb-3'>Альбомы</h3>

        {albums.map((album) => (
          <div
            className='block text-zinc-600 hover:text-zinc-900 mb-1'
            key={album.id}
          >
            {album.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
