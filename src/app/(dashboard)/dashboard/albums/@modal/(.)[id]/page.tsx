'use client';

import dynamic from 'next/dynamic';
import { use } from 'react';

interface AlbumProps {
  params: Promise<{ id: string }>;
}

const ModalContent = dynamic(() => import('./modalContent'), {
  loading: () => (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black/50' />
      <div className='relative z-10 bg-white rounded-xl p-6'>Загрузка...</div>
    </div>
  ),
});

const Page = ({ params }: AlbumProps) => {
  const { id } = use(params);

  return <ModalContent id={id} />;
};

export default Page;
