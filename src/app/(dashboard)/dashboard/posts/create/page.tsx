"use client";

import { createPost } from "@/app/(dashboard)/dashboard/posts/create/actions";
import Link from "next/link";
import { useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePostFormData, createPostSchema } from "./schema";
import { startTransition } from "react";

const Page = () => {
  const [state, formAction, isPending] = useActionState(createPost, null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
  });

  const onSubmit = (data: CreatePostFormData) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    startTransition(() => formAction(formData));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        className="inline-flex items-center text-sm text-zinc-500 hover:text-zinc-900 mb-6 transition-colors"
        href="/dashboard/posts"
      >
        Назад
      </Link>

      <h2 className="text-2xl font-bold mb-6">Создать пост</h2>

      <form
        className="bg-white border border-zinc-200 rounded-xl p-6 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="title">
          Заголовок
        </label>
        <input
        autoComplete="off"
          id="title"
          {...register("title")}
          name="title"
          type="text"
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
        )}

        <label htmlFor="body">Текст</label>
        <textarea
          id="body"
          {...register("body")}
          name="body"
          className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent transition min-h-[150px] resize-y"
        />
        {errors.body && (
          <p className="text-red-600 text-sm mt-1">{errors.body.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-zinc-900 text-white py-2 rounded-lg hover:bg-zinc-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? "Отправка..." : "Создать"}
        </button>

        {state?.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {state.error.map((err, i) => (
              <p key={i} className="px-1">
                {err}
              </p>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Page;