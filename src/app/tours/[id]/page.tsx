//src/app/tours/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { createBooking } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function TourPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // params - это Promise! Стас, его нужно await'ить
  const { id: idStr } = await params;

  // Проверяем, что id - это число
  if (!/^\d+$/.test(idStr))
    return <div className="p-4">Некорректный идентификатор тура</div>;

  const id = parseInt(idStr, 10);
  const tour = await prisma.tour.findUnique({
    where: { id },
  });

  if (!tour) return <div className="p-4">Тур не найден</div>;

  return (
    <main className="min-h-screen bg-zinc-50 p-6 dark:bg-black">
      {/*Отображение подробной информации о туре*/}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {tour.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Страна
            </h2>
            <p>{tour.country}</p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Период
            </h2>
            <p>
              {new Date(tour.startDate).toLocaleDateString()} -{" "}
              {new Date(tour.endDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Цена
            </h2>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {tour.price.toLocaleString()} руб.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Оставить свою заявку</h2>
          {/*Заглушка}<p>Форма бронирования будет здесь (6 Дней).</p>{Заглушка*/}
        </div>
      </div>

      {/*Форма бронирования*/}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Оставить заявку</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createBooking} className="space-y-4">
              <input type="hidden" name="tourId" value={tour.id} />

              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-1"
                >
                  ФИО
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Телефон
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <Button type="submit" className="w-full">
                Забронировать тур
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
