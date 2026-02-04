// src/app/admin/login/actions.ts
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Поиск пользователей в БД
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || user.password !== password)
    redirect("/admin/login?error=invalid");

  // Установка защищенного куки
  (await cookies()).set({
    name: "admin_auth",
    value: "granted",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 3600,
    path: "/admin",
  });

  // Сохранение роли в куки
  (await cookies()).set({
    name: "user_role",
    value: user.role,
    httpOnly: true,
    maxAge: 3600,
    path: "/admin",
  });
  redirect("/admin");
}
