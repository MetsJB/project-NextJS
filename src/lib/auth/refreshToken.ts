import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

function nowDateInMilliseconds() {
  return new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
}

export async function createRefreshToken(userId: number) {
  const token = uuidv4();
  const family = uuidv4();

  await prisma.refreshToken.create({
    data: {
      userId,
      token,
      family,
      expiresAt: nowDateInMilliseconds(),
    },
  });

  return { token, family };
}

export async function rotateRefresh(oldToken: string) {
  const existing = await prisma.refreshToken.findUnique({
    where: {
      token: oldToken,
    },
  });

  if (!existing) {
    return null;
  }

  await prisma.refreshToken.delete({
    where: {
      id: existing.id,
    },
  });

  const newToken = uuidv4();

  await prisma.refreshToken.create({
    data: {
      token: newToken,
      userId: existing.userId,
      family: existing.family,
      expiresAt: nowDateInMilliseconds(),
    },
  });

  return { token: newToken, family: existing.family, userId: existing.userId };
}

export async function deleteAllUsersToken(userId: number) {
  await prisma.refreshToken.deleteMany({
    where: { userId },
  });
}

export async function deleteRefreshToken(token: string) {
  await prisma.refreshToken.delete({
    where: { token },
  });
}
