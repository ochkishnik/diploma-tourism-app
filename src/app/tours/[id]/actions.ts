// src/app/tours/[id]/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBooking(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const tourId = Number(formData.get("tourId"));

  // Простенькая валидация
  if (!fullName || !email || !phone || isNaN(tourId))
    throw new Error("Все поля обязательны");

  try {
    await prisma.booking.create({
      data: {
        fullName,
        email,
        phone,
        tourId,
        isGuest: true,
        userId: null,
      },
    });
  } catch (error) {
    {
      /*Отладочная информация: console.error("Ошибка бронирования:", error);*/
    }
    throw new Error("Не удалось отправить заявку");
  }
  /*
   * The revalidatePath and redirect functions were removed
   * from the try catch system,
   * as it caught Error: NEXT_REDIRECT exceptions.
   */
  revalidatePath(`/tours/${tourId}`);
  redirect(`/tours/${tourId}?success=1`);
}
