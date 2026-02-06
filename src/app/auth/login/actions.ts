// src/app/auth/login/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Простенькая валидация
  if (!email || !password) redirect("/auth/login?error=missing_fields");

  // Проверка на уникальность email
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) redirect("/auth/login?error=invalid");

  // Сопоставление введенного параля с хранимым в системе хэшем, соотносимым с паролем.
  const isValid = await compare(password, user.password);
  if (!isValid) redirect("/auth/login?error=invalid");

  // Установка куки
  const cookieStore = await cookies();
  cookieStore.set("user_id", user.id.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/",
  });
  cookieStore.set("user_role", user.role, {
    httpOnly: true,
    maxAge: 3600,
    path: "/",
  });

  redirect("/profile");
}
