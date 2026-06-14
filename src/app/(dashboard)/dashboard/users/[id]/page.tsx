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
        className='inline-block mb-4 text-(--text-secondary) hover:text-(--text-primary) transition-colors'
        href={'/dashboard/users'}
      >
        ← Назад
      </Link>
      <p className='text-2xl font-bold mb-4 text-(--text-primary)'>{user.name}</p>
      <p className='text-sm text-(--text-secondary) mb-1'>@{user.username}</p>
      <p className='text-sm text-(--text-primary) mb-1'>{user.email}</p>
      <p className='text-sm text-(--text-secondary) mb-1'>{user.phone}</p>
      <Link
        rel='noopener noreferrer'
        href={`https://${user.website}`}
        className='text-(--text-primary) hover:underline'
        target='_blank'
      >
        {user.website}
      </Link>
      <p className='text-sm text-(--text-secondary) mb-1'>
        {user?.company?.name ?? 'Здесь должно быть название кампании'}
      </p>
      <div>
        <h3 className='text-lg font-semibold mt-6 mb-3 text-(--text-primary)'>Посты</h3>
        {posts.map((post) => (
          <Link href={`/dashboard/posts/${post.id}`} key={post.id}>
            <span className='block text-(--text-secondary) hover:text-(--text-primary) mb-1 transition-colors'>
              {post.title}
            </span>
          </Link>
        ))}
      </div>
      <div>
        <h3 className='text-lg font-semibold mt-6 mb-3 text-(--text-primary)'>Альбомы</h3>
        {albums.map((album) => (
          <div
            className='block text-(--text-secondary) hover:text-(--text-primary) mb-1 transition-colors'
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