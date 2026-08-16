import { withAuth } from '@/lib/auth/withAuth';
import { NextResponse } from 'next/server';

export const GET = withAuth<RouteContext<'/api/users/[id]'>>(
  async (request, payload, { params }) => {
    const { id = 1 } = await params;

    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

    if (!res.ok) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const data = await res.json();

    return NextResponse.json(data);
  },
);
