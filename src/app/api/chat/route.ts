import { google } from '@ai-sdk/google';
import {
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  convertToModelMessages,
  stepCountIs,
} from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import { withAuth } from '@/lib/auth/withAuth';
import { prisma } from '@/lib/prisma';
import { checkRateLimit } from '@/lib/rateLimit';

export const POST = withAuth(async (request: NextRequest, payload) => {
  if (!checkRateLimit(`chat:${payload.userId}`, 20, 60_000)) {
    return NextResponse.json(
      { error: 'Слишком много запросов' },
      { status: 429 },
    );
  }

  let messages;
  try {
    ({ messages } = await request.json());

  } catch {
    return NextResponse.json(
      { error: 'Некорректный формат запроса' },
      { status: 400 },
    );
  }

  if (!Array.isArray(messages)) {
    return NextResponse.json(
      { error: 'Некорректный формат сообщений' },
      { status: 400 },
    );
  }

  const result = streamText({
    model: google('gemini-3.6-flash'),
    messages: await convertToModelMessages(messages),
    stopWhen: stepCountIs(4),
    instructions: `Ты - AI ассистент дашборда NextDash.
    Отвечай на русском языке.
    Используй инструменты для получения данных из базы данных.
    `,
    tools: {
      getPostsCount: {
        description: 'Возвращает количество постов в базе данных',
        inputSchema: z.object({}),
        execute: async () => {
          const count = await prisma.post.count();
          return { count };
        },
      },

      getUsersCount: {
        description: 'Возвращает общее количество пользователей',
        inputSchema: z.object({}),
        execute: async () => {
          const count = await prisma.user.count();
          return { count };
        },
      },

      getCommentsCount: {
        description: 'Возвращает общее количество комментариев',
        inputSchema: z.object({}),
        execute: async () => {
          const count = await prisma.comment.count();
          return { count };
        },
      },

      getTopActiveUser: {
        description: 'Возвращает пользователя с наибольшим количеством постов',
        inputSchema: z.object({}),
        execute: async () => {
          const users = await prisma.user.findMany({
            include: { _count: { select: { posts: true } } },
            orderBy: {
              posts: {
                _count: 'desc',
              },
            },
            take: 1,
          });

          if (users.length === 0) {
            return { user: null };
          }

          return {
            user: {
              name: users[0].name,
              postCount: users[0]._count.posts,
            },
          };
        },
      },

      getPopularPosts: {
        description:
          'Возвращает 3 самых популярных поста по количеству комментариев',
        inputSchema: z.object({}),
        execute: async () => {
          const posts = await prisma.post.findMany({
            include: { _count: { select: { comments: true } } },
            orderBy: {
              comments: { _count: 'desc' },
            },
            take: 3,
          });

          return posts.map((post) => ({
            title: post.title,
            commentsCount: post._count.comments,
          }));
        },
      },
    },
    onError({ error }) {
      console.error('Ошибка AI SDK:', error);
    },
  });

  const stream = toUIMessageStream({ stream: result.stream });

  return createUIMessageStreamResponse({ stream });
});
