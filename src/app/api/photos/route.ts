import errorAuthentication from "@/lib/auth/checkAuth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const errorAuth = await errorAuthentication();
  if (errorAuth) return errorAuth;;
 

  const { searchParams } = new URL(request.url);
  const albumId = searchParams.get("albumId");

  if (!albumId) {
    return NextResponse.json({ error: "albumId is required" }, { status: 400 });
  }

  const photos = await prisma.photo.findMany({
    where: {
      albumId: Number(albumId),
    },
  });

  return NextResponse.json(photos);
}
