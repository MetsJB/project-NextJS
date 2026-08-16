import { signAccessToken, verifyAccessToken } from '@/lib/auth/jwt';
import { rotateRefresh } from '@/lib/auth/refreshToken';
import { setAuthCookiesOnResponse } from '@/lib/auth/setAuthCookies';
import { NextRequest, NextResponse } from 'next/server';

export default async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  const isLoginRoute = request.nextUrl.pathname.startsWith('/login');
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');

  if (accessToken && isLoginRoute) {
    const validPayload = await verifyAccessToken(accessToken);
    if (validPayload) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  if (!isDashboardRoute) {
    return NextResponse.next();
  }

  if (accessToken) {
    const payload = await verifyAccessToken(accessToken);
    if (payload) {
      return NextResponse.next();
    }
  }

  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (refreshToken) {
    const resultRefreshToken = await rotateRefresh(refreshToken);

    if (resultRefreshToken) {
      const newAccessToken = await signAccessToken({
        userId: resultRefreshToken.userId,
        role: resultRefreshToken.role,
        username: resultRefreshToken.username,
        name: resultRefreshToken.name,
      });

      const response = NextResponse.next();

      setAuthCookiesOnResponse(
        response,
        newAccessToken,
        resultRefreshToken.token,
      );

      return response;
    }
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
