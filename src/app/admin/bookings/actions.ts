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
