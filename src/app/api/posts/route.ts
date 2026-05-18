import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get('page') || '1';
  const limit = searchParams.get('limit') || '10';
  

  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );


  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }

  const data = await res.json();

  return NextResponse.json(data);
}
