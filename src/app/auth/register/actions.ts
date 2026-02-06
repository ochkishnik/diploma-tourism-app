// src/app/auth/register/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Простенькая валидация
  if (!email || !password || password.length < 6)
    throw new Error("Email и пароль (минимум - 6 символов) обязательны");

  // Проверка на уникальность email
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (!!existingUser)
    throw new Error('Пользователь c email "' + email + '" уже существует');

  // Хэширование
  const hashedPassword = await hash(password, 10);

  // Создание/регистрация нового пользователя
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: "USER",
    },
  });

  redirect("/auth/login?success=registered");
}
