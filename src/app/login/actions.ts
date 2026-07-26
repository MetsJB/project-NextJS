/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { signIn } from "@/auth";
import { redirect } from "next/navigation";

export type LoginState = {
  success: boolean;
  error: string | null;
};

export async function login(prevState: LoginState | null, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (
    !username ||
    username.trim() === "" ||
    !password ||
    password.trim() === ""
  ) {
    return { error: "Заполните все поля", success: false };
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
  } catch (error) {
    return {
      success: false,
      error: "Неверный логин или пароль",
    };
  }

   return { success: true, error: null };
}
