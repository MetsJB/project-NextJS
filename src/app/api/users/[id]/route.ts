import errorAuthentication from "@/lib/auth/checkAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const errorAuth = await errorAuthentication();
  if (errorAuth) return errorAuth;

  const { id = 1 } = await params;

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (!res.ok) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const data = await res.json();

  return NextResponse.json(data);
}
