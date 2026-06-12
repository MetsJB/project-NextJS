"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPostSchema } from "./schema";

export async function createPost(
  prevState: { error: string[] } | null,
  formData: FormData,
) {
  const rawData = {
    title: formData.get("title") as string,
    body: formData.get("body") as string,
  };

  const validation = createPostSchema.safeParse(rawData);

  if (!validation.success) {
    const errors = validation.error.issues;
    return { error: errors.map((error) => error.message) };
  }

  await prisma.post.create({
    data: {
      title: validation.data.title.trim(),
      body: validation.data.body.trim(),
      userId: 1,
    },
  });

  revalidatePath("/dashboard/posts");
  redirect("/dashboard/posts");
}
