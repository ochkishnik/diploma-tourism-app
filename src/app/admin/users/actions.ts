// src/app/admin/users/actions.ts
"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserRole, getCurrentUserId } from "@/lib/auth";

export async function toggleUserRole(formData: FormData) {
  const targetUserId = Number(formData.get("userId"));
  const currentUserId = await getCurrentUserId();
  const currentRole = await getUserRole();

  console.log("targetUserId:", targetUserId);
  console.log("currentUserId :", currentUserId);
  console.log("currentRole :", currentRole);
  // Проверки безопасности
  if (currentRole !== "ADMIN") throw new Error("Недостаточно прав!");
  if (targetUserId === currentUserId)
    throw new Error("Нельзя изменить свою роль!");

  const user = await prisma.user.findUnique({ where: { id: targetUserId } });
  console.log("user  :", user);
  if (!user || user.role === "ADMIN") throw new Error("Недопустимая операция");

  // Пеперключение роли
  const newRole = user.role === "USER" ? "MANAGER" : "USER";

  await prisma.user.update({
    where: { id: targetUserId },
    data: { role: newRole },
  });

  revalidatePath("/admin/users");
}

export async function deleteUser(formData: FormData) {
  const targetUserId = Number(formData.get("userId"));
  const currentUserId = await getCurrentUserId();
  const currentRole = await getUserRole();

  // Проверка безопасности
  if (currentRole !== "ADMIN") throw new Error("Недостаточно прав!");
  if (targetUserId === currentUserId)
    throw new Error("Нельзя удалить свой аккаунт");

  const user = await prisma.user.findUnique({ where: { id: targetUserId } });
  if (!user || user.role === "ADMIN")
    throw new Error("Нельзя удалить администратора!");

  await prisma.user.delete({ where: { id: targetUserId } });

  revalidatePath("/admin/users");
}
