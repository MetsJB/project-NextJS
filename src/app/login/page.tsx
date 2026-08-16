"use client";

import { login, LoginState } from "@/app/login/actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef } from "react";


const Page = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<LoginState | null, FormData>(login, null);
  const redirected = useRef(false);

  useEffect(() => {
    if (state?.success && !redirected.current) {
      redirected.current = true;
      router.push("/dashboard");
    }
  }, [router, state]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-primary) gap-3">
      <form
        action={formAction}
        className="bg-(--bg-secondary) p-8 rounded-xl shadow-sm border border-(--border-color) w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-(--text-primary)">
          Вход
        </h1>

        <label
          htmlFor="username"
          className="block text-lg font-medium text-(--text-primary) mb-1"
        >
          Введите имя пользователя
        </label>
        <input
          autoComplete="off"
          className="w-full mb-4 px-3 py-2 border border-(--border-color) bg-(--bg-primary) text-(--text-primary) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--accent) focus:border-transparent transition"
          name="username"
          type="text"
        />

        <label
          htmlFor="password"
          className="block text-lg font-medium text-(--text-primary) mb-1"
        >
          Введите пароль
        </label>
        <input
          autoComplete="off"
          className="w-full mb-4 px-3 py-2 border border-(--border-color) bg-(--bg-primary) text-(--text-primary) rounded-lg focus:outline-none focus:ring-2 focus:ring-(--accent) focus:border-transparent transition"
          name="password"
          type="password"
        />

        <button
          className="w-full mt-2 mb-2 bg-(--accent) text-(--text-active) py-2 rounded-lg hover:bg-(--accent-hover) transition disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isPending}
        >
          {isPending ? "Загрузка..." : "Войти"}
        </button>

        {state?.error && (
          <p className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
            {state.error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Page;