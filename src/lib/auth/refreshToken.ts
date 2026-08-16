import { prisma } from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

function ManyDaysOfMovingInMilliseconds() {
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
}

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export async function cleanupExpiredTokens() {
  await prisma.refreshToken.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });
}

export async function createRefreshToken(userId: number) {
  const token = uuidv4();
  const family = uuidv4();

  await prisma.refreshToken.create({
    data: {
      userId,
      token: hashToken(token),
      family,
      expiresAt: ManyDaysOfMovingInMilliseconds(),
    },
  });

  if (Math.random() < 0.01) {
    cleanupExpiredTokens().catch(() => {});
  }

  return { token, family };
}

export async function rotateRefresh(oldToken: string) {
  const existing = await prisma.refreshToken.findUnique({
    where: {
      token: hashToken(oldToken),
    },
    include: {
      user: true,
    },
  });

  if (!existing) {
    return null;
  }

  if (existing.revokedAt) {
    await prisma.refreshToken.deleteMany({
      where: {
        family: existing.family,
      },
    });

    return null;
  }

  if (existing.expiresAt < new Date()) {
    await prisma.refreshToken.deleteMany({
      where: { family: existing.family },
    });

    return null;
  }

  await prisma.refreshToken.update({
    where: {
      id: existing.id,
    },
    data: {
      revokedAt: new Date(),
    },
  });

  const newToken = uuidv4();
  await prisma.refreshToken.create({
    data: {
      userId: existing.userId,
      family: existing.family,
      token: hashToken(newToken),
      expiresAt: ManyDaysOfMovingInMilliseconds(),
    },
  });

  return {
    token: newToken,
    family: existing.family,
    userId: existing.userId,
    role: existing.user.role,
    name: existing.user.name,
    username: existing.user.username,
  };
}

export async function deleteAllUsersByToken(userId: number) {
  await prisma.refreshToken.deleteMany({
    where: { userId },
  });
}

export async function deleteFamilyByToken(token: string) {
  const hashed = hashToken(token);
  const existing = await prisma.refreshToken.findUnique({
    where: { token: hashed },
  });

  if (!existing) return;

  await prisma.refreshToken.deleteMany({
    where: { family: existing.family },
  });
}
