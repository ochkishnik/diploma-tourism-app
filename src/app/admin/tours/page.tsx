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

  const tours = await prisma.tour.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Управление турами</h2>
      <p className="mb-4">Всего туров: {tours.length}</p>

      <div className="grid gap-4">
        {tours.map((tour) => (
          <div key={tour.id} className="border p-4 rounded">
            <h3 className="font-bold">{tour.title}</h3>
            <p className="text-gray-600 mt-1">{tour.description}</p>
            <p>
              {tour.country} • {/*} {tour.description} •{" "} {*/}
              {tour.price.toLocaleString()} руб.
            </p>
            <div className="mt-2 space-x-2">
              <button className="text-blue-600 hover:underline">
                Редактировать
              </button>
              <button className="text-red-600 hover:underline">Удалить</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
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
            className="w-full ps-2 py-1 border rounded-2xl"
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
