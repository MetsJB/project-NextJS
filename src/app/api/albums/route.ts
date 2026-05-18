import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/albums`);

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }

  const data = await res.json();

  return NextResponse.json(data);
}
