// src/app/profile/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function cancelBooking(formData: FormData) {
  const bookingid = Number(formData.get("bookingId"));
  const userId = await getCurrentUserId();

  if (!userId) throw new Error("Требуется авторизация");

  const booking = await prisma.booking.findUnique({ where: { id: bookingid } });

  if (!booking || booking.userId !== userId)
    throw new Error("Заявка не найдена");

  if (booking.status !== "NEW")
    throw new Error("Можно отменить только новую заявку");

  await prisma.booking.update({
    where: { id: bookingid },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/profile");
}
