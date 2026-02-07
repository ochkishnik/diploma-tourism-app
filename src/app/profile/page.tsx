// src/app/profile/page.tsx
import { prisma } from "@/lib/prisma";
import { getUserRole, getCurrentUserId } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cancelBooking, simulatePayment } from "./actions";

export default async function ProfilePage() {
  const role = await getUserRole();
  const userId = await getCurrentUserId();

  // Доступ только для авторизованных пользователей
  if (role !== "USER" || !userId) redirect("/auth/login");

  const bookings = await prisma.booking.findMany({
    where: { userId },
    include: { tour: true },
    orderBy: { createdAt: "desc" },
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
              {booking.status !== "CANCELLED" && (
                <div className="text-sm">
                  {/*Дата начала и окончания тура*/}
                  {booking.tour && (
                    <p className="mt-1">
                      Даты тура: {booking.tour.startDate.toLocaleDateString()} -{" "}
                      {booking.tour.endDate.toLocaleDateString()}
                    </p>
                  )}

                  {/*Дата бронирования - выводится всегда*/}
                  <p className="text-gray-600">
                    Дата бронирования: {booking.createdAt.toLocaleDateString()}
                  </p>
                  {/*Срок бронирования - только если не оплачено*/}
                  {!booking.paid && booking.expiresAt && (
                    <p className="text-gray-500">
                      Бронь действует до:{" "}
                      {booking.expiresAt.toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}
              {/*Блок с кнопками*/}
              <div className="mt-3 flex gap-2">
                {/*Кнопка оплаты - только для неоплаченных и неотмененных*/}
                {!booking.paid && booking.status === "NEW" && (
                  <form action={simulatePayment}>
                    <input type="hidden" name="bookingId" value={booking.id} />
                    <button
                      type="submit"
                      title="Имитация онлайн-оплаты. В реальном сервисе здесь был бы платёжный шлюз."
                      className="bg-green-600 text-white px-3 py-1 rounded-2xl hover:bg-green-700 text-sm"
                    >
                      Оплатить тур
                    </button>
                  </form>
                )}

                {/* Кнопка отмены - только для новых заявок*/}
                {booking.status === "NEW" && !booking.paid && (
                  <form action={cancelBooking}>
                    <input type="hidden" name="bookingId" value={booking.id} />

                    <button
                      type="submit"
                      className="text-red-600 hover:underline border rounded-2xl px-3 py-1 text-sm bg-red-100"
                    >
                      Отменить заявку
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
