// src/app/profile/page.tsx
import { prisma } from "@/lib/prisma";
import { getUserRole, getCurrentUserId } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cancelBooking } from "./actions";

export default async function ProfilePage() {
  const role = await getUserRole();
  const userId = await getCurrentUserId();

  // Доступ только для авторизованных пользователей
  if (role !== "USER" || !userId) redirect("/auth/login");

  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: { tour: true },
    orderBy: { createAt: "desc" },
  });

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Мой профиль</h1>
      {bookings.length === 0 ? (
        <p className="text-gray-600">У вас пока нет заявок</p>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Мои заявки</h2>
          {bookings.map((booking) => (
            <div key={booking.id} className="border p-4 rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-bold">{booking.tour.title}</h3>
                <span
                  className={`px-2 py-1 rounded-2xl text-xs ${
                    booking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-800"
                      : booking.status === "CANCELLED"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {booking.status === "CONFIRMED"
                    ? "Подтверждена"
                    : booking.status === "CANCELLED"
                      ? "Отменена"
                      : "Новая"}
                </span>
              </div>
              <p className="test-gray-600 text-sm mt-1">
                Страна: {booking.tour.country} | Цена:{" "}
                {booking.tour.price.toLocaleString()} руб.
              </p>
              <p className="text-sm mt-2">
                Дата бронирования: {booking.createAt.toLocaleDateString()}
                {booking.expiresAt && (
                  <> | Истекает: {booking.expiresAt.toLocaleDateString()}</>
                )}
              </p>

              {/* Кнопка отмены - только для новых заявок*/}
              {booking.status === "NEW" && (
                <form action={cancelBooking} className="mt-3">
                  <input type="hidden" name="bookingId" value={booking.id} />
                  <button
                    type="submit"
                    className="text-red-600 hover:text-red-700 border rounded-2xltext-sm bg-red-100"
                  >
                    Отменить заявку
                  </button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
