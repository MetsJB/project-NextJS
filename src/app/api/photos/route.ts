import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Загрузка');
  await new Promise((resolve) => {
    setTimeout(() => resolve(''), 1500);
  });
  console.log('Завершена');

  const { searchParams } = new URL(request.url);
  const albumId = searchParams.get('albumId');

  if (!albumId) {
    return NextResponse.json({ error: 'albumId is required' }, { status: 400 });
  }

  const photos = await prisma.photo.findMany({
    where: {
      albumId: Number(albumId),
    },
  });

  return NextResponse.json(photos);
}
