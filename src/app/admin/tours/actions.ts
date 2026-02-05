// src/app/admin/tours/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteTour(formData: FormData) {
  const tourId = Number(formData.get("tourId"));

  await prisma.tour.delete({ where: { id: tourId } });

  revalidatePath("/admin/tours");
}

export async function createTour(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const country = formData.get("country") as string;
  const price = Number(formData.get("price"));

  // Простенькая валидация
  if (!title || !description || !country || isNaN(price) || price <= 0)
    throw new Error(
      "Все поля обязательны для заполнения, и цена должна быть положительной",
    );

  // Устанавливаем временные значения даты начала и конца тура
  const startDate = new Date("2026-06-01");
  const endDate = new Date("2026-06-08");

  await prisma.tour.create({
    data: {
      title,
      description,
      country,
      price,
      startDate,
      endDate,
    },
  });

  revalidatePath("/admin/tours");
}

export async function updateTour(formData: FormData) {
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const country = formData.get("country") as string;
  const price = Number(formData.get("price"));

  if (!title || !description || !country || isNaN(price) || price <= 0)
    throw new Error(
      "Все поля обязательны для заполнения, и цена должна быть положительной",
    );

  await prisma.tour.update({
    where: { id },
    data: {
      title,
      description,
      country,
      price,
    },
  });
  revalidatePath("/admin/tours");
  redirect("/admin/tours");
}
