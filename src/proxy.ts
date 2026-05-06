import { NextRequest, NextResponse } from 'next/server';

export default function proxy(request: NextRequest) {
  const username = request.cookies.get('username')?.value;

  if (!username && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (username && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
