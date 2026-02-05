// src/app/admin/bookings/page.tsx
import { prisma } from "@/lib/prisma";
import { getUserRole } from "@/lib/auth";

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
              <th className="border px-4 py-2">Дата заявки</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
