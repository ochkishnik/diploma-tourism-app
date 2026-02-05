// src/app/admin/tours/page.tsx
import { prisma } from "@/lib/prisma";
import { getUserRole } from "@/lib/auth";

export default async function ToursAdminPage() {
  const role = await getUserRole();

  if (role !== "MANAGER" && role !== "ADMIN") {
    return (
      <div className="text-red-600">
        <h2 className="text-2xl font-bold">Доступ запрещён</h2>
        <p>Только мененджеры и администраторы могут управлять турами.</p>
      </div>
    );
  }

  const tours = await prisma.tour.findMany({
    orderBy: { createdAt: "desc" },
    take: 9 /* Добавление ограничения */,
  });

  // Считает общее количество туров
  const totalTours = await prisma.tour.count();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Управление турами</h2>
      <p className="mb-4">
        Всего туров: {totalTours} | Отображается: {tours.length}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">{tour.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{tour.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span>{tour.country}</span>
              <span className="font-semibold text-blue-600">
                {tour.price.toLocaleString()} руб.
              </span>
            </div>
            <div className="mt-2 flex space-x-2">
              <button className="text-blue-600 hover:underline text-sm">
                Редактировать
              </button>
              <button className="text-red-600 hover:underline text-sm">
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
      {totalTours > 9 && (
        <div className="mt-6 text-center text-gray-500">
          Показано 9 из {totalTours} туров
        </div>
      )}
      <div className="my-8 border-t border-gray-200 pt-6">
        <h3 className="font-bold mb-2">Добавить новый тур</h3>
        <form className="space-y-2 max-w-md">
          <input
            name="title"
            placeholder="Название"
            className="w-full px-2 py-1 border rounded-2xl"
          />
          <input
            name="description"
            placeholder="Описание"
            className="w-full px-2 py-1 border rounded-2xl"
          />
          <input
            name="country"
            placeholder="Страна"
            className="w-full px-2 py-1 border rounded-2xl"
          />
          <input
            name="price"
            type="number"
            placeholder="Цена"
            className="w-full px-2 py-1 border rounded-2xl"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-1 rounded-3xl hover:bg-green-700"
          >
            Добавить тур
          </button>
        </form>
      </div>
    </div>
  );
}
