import { withAuth } from '@/lib/auth/withAuth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = withAuth(async (request, payload) => {
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
});
