'use client';

import { fetchPhotos } from '@/lib/api';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

interface AlbumProps {
  params: Promise<{ id: string }>;
}

const Page = ({ params }: AlbumProps) => {
  const { id } = use(params);
  const [photosLoad, setPhotosLoad] = useState('Загрузка...');
  const router = useRouter();

  useEffect(() => {
    fetchPhotos(id)
      .then((data) =>
        setPhotosLoad(`Загружено, количество фото: ${data.length}`)
      )
      .catch((error) => setPhotosLoad(`Ошибка загрузки, статус код ${error}`));
  }, [id]);

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Оверлей */}
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={() => router.back()}
      />

      {/* Модальное окно */}
      <div
        className='relative z-10 bg-white dark:bg-zinc-900 rounded-xl shadow-2xl 
                      w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-in'
      >
        {/* Шапка */}
        <div
          className='sticky top-0 bg-white dark:bg-zinc-900 border-b px-6 py-4 
                        rounded-t-xl flex items-center justify-between'
        >
          <div>
            <h4 className='text-lg font-semibold'>Фотографии альбома</h4>
            <p className='text-sm text-zinc-500 dark:text-zinc-400 mt-1'>
              ID альбома: {id}
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className='p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 
                       transition-colors'
          >
            ✕
          </button>
        </div>

        {/* Статус загрузки */}
        <div className='px-6 pt-4'>
          <div
            className='bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-3 
                          flex items-center gap-3'
          >
            {photosLoad.includes('Загрузка') && (
              <div
                className='w-4 h-4 border-2 border-zinc-400 border-t-transparent 
                              rounded-full animate-spin'
              />
            )}
            <p className='text-sm'>
              {photosLoad.includes('Загрузка') && (
                <span className='text-zinc-600 dark:text-zinc-400'>
                  Загрузка данных с сервера:{' '}
                </span>
              )}
              <span
                className={
                  photosLoad.includes('Ошибка')
                    ? 'text-red-600 dark:text-red-400 font-medium'
                    : photosLoad.includes('Загружено')
                    ? 'text-green-600 dark:text-green-400 font-medium'
                    : 'text-zinc-600 dark:text-zinc-400'
                }
              >
                {photosLoad}
              </span>
            </p>
          </div>
        </div>

        {/* Сетка фото */}
        <div className='p-6'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='relative aspect-square rounded-lg overflow-hidden 
                           border bg-zinc-100 dark:bg-zinc-800 
                           hover:ring-2 hover:ring-zinc-900 dark:hover:ring-zinc-100 
                           transition-all'
              >
                <Image
                  width={200}
                  height={200}
                  className='object-cover w-full h-full'
                  alt={`Фото ${index + 1}`}
                  src='https://avatars.mds.yandex.net/i?id=e20fea717012d1912012c7bb09bc24c26c5e0d1c-10695851-images-thumbs&n=13'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Футер */}
        <div
          className='sticky bottom-0 bg-white dark:bg-zinc-900 border-t px-6 py-4 
                        rounded-b-xl'
        >
          <button
            onClick={() => router.back()}
            className='w-full px-4 py-2 text-sm font-medium 
                       bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 
                       rounded-lg hover:opacity-90 transition-opacity'
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
