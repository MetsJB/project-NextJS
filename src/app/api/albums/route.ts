import { withAuth } from '@/lib/auth/withAuth';
import { NextRequest, NextResponse } from 'next/server';

export const GET = withAuth(async (request: NextRequest, payload) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums`);

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }

  const data = await res.json();

  return NextResponse.json(data);
});
