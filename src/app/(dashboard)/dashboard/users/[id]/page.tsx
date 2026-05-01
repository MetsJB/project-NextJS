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
      <Link href={'/dashboard/users'}>Назад</Link>
      <p>{user.name}</p>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
      <Link href={`https://${user.website}`} target='_blank'>
        {user.website}
      </Link>
      <p>{user.company.name}</p>
      <div>
        Посты
        {posts.map((post) => (
          <Link href={`/dashboard/posts/${post.id}`} key={post.id}>
            {post.title}
          </Link>
        ))}
      </div>
      <div>
        Альбомы
        {albums.map((album) => (
          <div key={album.id}>{album.title}</div>
        ))}
      </div>
    </div>
  );
};

export default page;
