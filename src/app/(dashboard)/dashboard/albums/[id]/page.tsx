import { fetchPhotos, PHOTO_URL } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AlbumPage({ params }: Props) {
  const { id } = await params;
  const photos = await fetchPhotos(id);

  return (
    <div className='max-w-7xl mx-auto'>
      {/* Навигация и заголовок */}
      <div className='flex items-center gap-4 mb-8'>
        <Link
          href='/dashboard/albums'
          className='inline-flex items-center px-4 py-2 text-sm font-medium 
                     bg-white dark:bg-zinc-900 border rounded-lg 
                     hover:bg-zinc-50 dark:hover:bg-zinc-800 
                     transition-colors'
        >
          ← Назад к альбомам
        </Link>
        <h2 className='text-2xl font-bold'>Фотографии альбома</h2>
      </div>

      {/* Сетка фотографий */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {photos.map((photo) => (
          <div
            key={photo.id}
            className='group relative aspect-square rounded-lg overflow-hidden 
                       border bg-white dark:bg-zinc-900 
                       hover:shadow-lg transition-shadow'
          >
            <Image
              src={PHOTO_URL + String(photo.id)}
              alt={photo.title}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw'
            />
            {/* Оверлей при наведении */}
            <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors' />
          </div>
        ))}
      </div>
    </div>
  );
}
