// src/app/admin/bookings/page.tsx
import { prisma } from "@/lib/prisma";
import { getUserRole } from "@/lib/auth";
import { cancelBooking } from "./actions";

export default async function BookingsAdminPage() {
  const role = await getUserRole();

  //Доступ Разрешен только пользователям с ролью MANAGER и ADMIN
  if (role !== "ADMIN" && role !== "MANAGER") {
    return (
      <div className="text-red-600">
        <h2 className="text-2xl font-bold">Доступ запрещён</h2>
        <p>Только мененджеры и администраторы могут просматривать заявки.</p>
      </div>
    );
  }

  const bookings = await prisma.booking.findMany({
    include: { tour: true },
    orderBy: { createAt: "desc" },
  });

  // Функция для получения цвета статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-yellow-100 text-yellow-800";
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Заявки на бронирование</h2>
      <p className="mb-4">Всего заявок: {bookings.length}</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">ФИО</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Телефон</th>
              <th className="border px-4 py-2">Тур</th>
              <th className="border px-4 py-2">Дата</th>
              <th className="border px-4 py-2">Статус</th>
              <th className="border px-4 py-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{booking.id}</td>
                <td className="border px-4 py-2">{booking.fullName}</td>
                <td className="border px-4 py-2">{booking.email}</td>
                <td className="border px-4 py-2">{booking.phone}</td>
                <td className="border px-4 py-2">
                  {booking.tour ? booking.tour.title : "-"}
                </td>
                <td className="border px-4 py-2">
                  {new Date(booking.createAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-2xl text-xs ${getStatusColor(booking.status)}`}
                  >
                    {booking.status === "NEW"
                      ? "Новая"
                      : booking.status === "CONFIRMED"
                        ? "Подтверждена"
                        : "Отменена"}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  {booking.status !== "CANCELLED" ? (
                    <form action={cancelBooking} className="inline">
                      <input
                        type="hidden"
                        name="bookingId"
                        value={booking.id}
                      />
                      <button
                        type="submit"
                        className="text-red-600 hover:underline"
                      >
                        Отменить
                      </button>
                    </form>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
