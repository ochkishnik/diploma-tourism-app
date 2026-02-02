// src/app/tours/[id]/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBooking(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const tourId = Number(formData.get("tourId"));

  // Простенькая валидация
  if (!fullName || !email || !phone || isNaN(tourId))
    return { error: "Все поля обязательны" };

  try {
    await prisma.booking.create({
      data: {
        fullName,
        email,
        phone,
        tourId,
      },
    });
    revalidatePath(`/tours/${tourId}`);
    return { success: true };
  } catch (error) {
    console.error("Ошибка бронирования:", error);
    return { error: "Не удалось отправить заявку" };
  }
}
