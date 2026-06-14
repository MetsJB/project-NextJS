import { fetchAlbums } from '@/lib/api';
import Link from 'next/link';

const page = async () => {
  const albums = await fetchAlbums();

  return (
    <div>
      <h3 className='text-2xl font-bold mb-6 text-(--text-primary)'>Альбомы</h3>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {albums.map((album) => (
          <Link
            key={album.id}
            href={`/dashboard/albums/${album.id}`}
            className='bg-(--bg-primary) border border-(--border-color) rounded-lg p-4 hover:border-(--text-primary) transition-colors'
          >
            <h4 className='font-medium text-(--text-primary)'>Название альбома: {album.title}</h4>
            <p className='text-sm text-(--text-secondary)'>ID: {album.id}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;