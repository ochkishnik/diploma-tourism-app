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
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = new Date(formData.get("endDate") as string);

  // Простенькая валидация
  if (!title || !description || !country || isNaN(price) || price <= 0)
    throw new Error(
      "Все поля обязательны для заполнения, и цена должна быть положительной",
    );

  if (
    isNaN(startDate.getTime()) ||
    isNaN(endDate.getTime()) ||
    startDate >= endDate
  )
    throw new Error(
      "Некорректные даты: дата окончания должна быть позже даты начала",
    );

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
  const startDate = new Date(formData.get("startDate") as string);
  const endDate = new Date(formData.get("endDate") as string);

  if (!title || !description || !country || isNaN(price) || price <= 0)
    throw new Error(
      "Все поля обязательны для заполнения, и цена должна быть положительной",
    );

  if (
    isNaN(startDate.getTime()) ||
    isNaN(endDate.getTime()) ||
    startDate >= endDate
  )
    throw new Error(
      "Некорректные даты: дата окончания должна быть позже даты начала",
    );

  await prisma.tour.update({
    where: { id },
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
  redirect("/admin/tours");
}
