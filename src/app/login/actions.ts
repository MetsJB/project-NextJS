/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import bcrypt from 'bcryptjs';
import { cookies, headers } from 'next/headers';
import {
  ACCESS_TOKEN_MAX_AGE,
  authCookieOptions,
  REFRESH_TOKEN_MAX_AGE,
} from '@/lib/auth/authCookieOptions';
import { signAccessToken } from '@/lib/auth/jwt';
import { createRefreshToken } from '@/lib/auth/refreshToken';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, resetRateLimit } from '@/lib/rateLimit';

export type LoginState = {
  success: boolean;
  error: string | null;
};

export async function login(prevState: LoginState | null, formData: FormData) {
  const headersList = await headers();

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  
  const ip =
  headersList.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  const rateLimitKey = `login:${ip}:${username}`;

  if (!checkRateLimit(rateLimitKey, 5, 50000)) {
    return {
      success: false,
      error: 'Вы превысили лимит запросов, попробуйте позже',
    };
  }

  if (
    !username ||
    username.trim() === '' ||
    !password ||
    password.trim() === ''
  ) {
    return { error: 'Заполните все поля', success: false };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return {
        success: false,
        error: 'Пользователь не найден',
      };
    }

    if (!user?.passwordHash) {
      return {
        success: false,
        error: 'Неверный логин или пароль',
      };
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid)
      return {
        success: false,
        error: 'Неверный логин или пароль',
      };

    const accessToken = await signAccessToken({
      userId: user.id,
      role: user.role,
      username: user.username,
      name: user.name,
    });

    const refreshToken = await createRefreshToken(user.id);

    const cookieStore = await cookies();

    cookieStore.set(
      'accessToken',
      accessToken,
      authCookieOptions(ACCESS_TOKEN_MAX_AGE),
    );

    cookieStore.set(
      'refreshToken',
      refreshToken.token,
      authCookieOptions(REFRESH_TOKEN_MAX_AGE),
    );

    resetRateLimit(rateLimitKey)

    return {
      success: true,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Неверный логин или пароль',
    };
  }
}
