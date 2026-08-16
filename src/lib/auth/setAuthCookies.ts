import {
  ACCESS_TOKEN_MAX_AGE,
  authCookieOptions,
  REFRESH_TOKEN_MAX_AGE,
} from '@/lib/auth/authCookieOptions';
import { NextResponse } from 'next/server';

export function setAuthCookiesOnResponse(
  response: NextResponse,
  accessToken: string,
  refreshToken: string,
) {
  response.cookies.set(
    'accessToken',
    accessToken,
    authCookieOptions(ACCESS_TOKEN_MAX_AGE),
  );
  response.cookies.set(
    'refreshToken',
    refreshToken,
    authCookieOptions(REFRESH_TOKEN_MAX_AGE),
  );
}
