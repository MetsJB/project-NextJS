import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default async function errorAuthentication() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}
