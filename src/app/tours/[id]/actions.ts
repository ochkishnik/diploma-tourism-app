// src/app/tours/[id]/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getBookingDeadline } from "@/lib/booking";
import { getCurrentUserId } from "@/lib/auth";

export async function createBooking(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const tourId = Number(formData.get("tourId"));

  // Простенькая валидация
  if (!fullName || !email || !phone || isNaN(tourId))
    throw new Error("Все поля обязательны");

  // Проверка авторизован ли пользователь
  const currentUserId = await getCurrentUserId();
  const isGuest = currentUserId === null;

  // Если пользователь авторизован - используем его id, игнорируя emeil из формы!
  let userId: number | null = null;
  if (!isGuest) {
    userId = currentUserId;
  }

  try {
    await prisma.booking.create({
      data: {
        fullName,
        email,
        phone,
        tourId,
        isGuest,
        userId,
        expiresAt: getBookingDeadline(isGuest),
        status: "NEW",
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
