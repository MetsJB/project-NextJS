import { signAccessToken } from '@/lib/auth/jwt';
import { rotateRefresh } from '@/lib/auth/refreshToken';
import { setAuthCookiesOnResponse } from '@/lib/auth/setAuthCookies';
import { checkRateLimit } from '@/lib/rateLimit';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';

  if (!checkRateLimit(`refresh:${ip}`, 10, 30*1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const oldToken = request.cookies.get('refreshToken')?.value;

  if (!oldToken) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  const result = await rotateRefresh(oldToken);

  if (!result) {
    const response = NextResponse.json(
      { error: 'Invalid refresh token' },
      { status: 401 },
    );

    response.cookies.delete('refreshToken');
    return response;
  }

  const accessToken = await signAccessToken({
    userId: result.userId,
    role: result.role,
    name: result.name,
    username: result.username,
  });

  const response = new NextResponse();

  setAuthCookiesOnResponse(response, accessToken, result.token);

  return response;
}
