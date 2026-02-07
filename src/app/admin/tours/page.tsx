// src/app/admin/tours/page.tsx
import { prisma } from "@/lib/prisma";
import { getUserRole } from "@/lib/auth";
import { DeleteTourButton } from "./DeleteTourButton";
import { createTour, updateTour } from "./actions";

export default async function ToursAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const role = await getUserRole();

  if (role !== "MANAGER" && role !== "ADMIN") {
    return (
      <div className="text-red-600">
        <h2 className="text-2xl font-bold">Доступ запрещён</h2>
        <p>Только мененджеры и администраторы могут управлять турами.</p>
      </div>
    );
  }

  const sp = await searchParams;
  const editTourId = sp.edit ? Number(sp.edit) : null;

  let editTour = null;
  if (editTourId)
    editTour = await prisma.tour.findUnique({ where: { id: editTourId } });

  // Безопасно вычисляем даты по умолчанию до рендера
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const todayStr = today.toISOString().split("T")[0];
  const nextWeekStr = nextWeek.toISOString().split("T")[0];

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
            <div className="text-sm items-center mt-1 mb-3">
              Начало тура: {tour.startDate.toLocaleDateString()}
              <br />
              Конец тура: {tour.endDate.toLocaleDateString()}
            </div>
            <div className="mt-2 flex space-x-2 items-center">
              <a
                href={`/admin/tours?edit=${tour.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                Редактировать
              </a>
              <DeleteTourButton tourId={tour.id} />
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
        <h3 className="font-bold mb-2">
          {editTour ? "Редактировать тур" : "Добавить новый тур"}
        </h3>
        <form
          action={editTour ? updateTour : createTour}
          className="space-y-2 max-w-md"
        >
          {editTour && <input type="hidden" name="id" value={editTour.id} />}
          <input
            name="title"
            placeholder="Название"
            defaultValue={editTour?.title || ""}
            className="w-full px-2 py-1 border rounded-2xl"
            required
          />
          <input
            name="description"
            placeholder="Описание"
            defaultValue={editTour?.description || ""}
            className="w-full px-2 py-1 border rounded-2xl"
            required
          />
          <input
            name="country"
            placeholder="Страна"
            defaultValue={editTour?.country || ""}
            className="w-full px-2 py-1 border rounded-2xl"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Цена"
            defaultValue={editTour?.price?.toString() || ""}
            className="w-full px-2 py-1 border rounded-2xl"
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium mb-1">
                Дата начала
              </label>
              <input
                name="startDate"
                type="date"
                defaultValue={
                  editTour?.startDate.toISOString().split("T")[0] || todayStr
                }
                className="w-full px-2 py-1 border rounded-2xl"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Дата окончания
              </label>
              <input
                name="endDate"
                type="date"
                defaultValue={
                  editTour?.endDate.toISOString().split("T")[0] || nextWeekStr
                }
                className="w-full px-2 py-1 border rounded-2xl"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={!!editTour}
              className={`px-4 py-1 rounded-3xl ${
                editTour
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              Добавить тур
            </button>

            {/* Кнопка "применить изменения" - только при редактировании */}
            {editTour && (
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-1 rounded-3xl hover:bg-blue-700"
              >
                Применить извенения
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
