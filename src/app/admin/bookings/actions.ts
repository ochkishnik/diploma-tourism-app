// src/app/admin/bookings/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function cancelBooking(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/admin/bookings");
}

export async function confirmPayment(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));

  await prisma.booking.update({
    where: { id: bookingId },
    data: { paid: true, status: "CONFIRMED" },
  });
  revalidatePath("/admin/bookings");
}

export async function cleanupBookings() {
  const now = new Date();

  await prisma.booking.deleteMany({
    where: {
      expiresAt: { lt: now },
      paid: false,
      status: "NEW",
    },
  });
  revalidatePath("/admin/bookings");
}
