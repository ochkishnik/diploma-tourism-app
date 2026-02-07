//src/app/tours/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { BookingSection } from "./BookingSection";
import { getUserRole } from "@/lib/auth";
import Link from "next/link";

export default async function TourPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string }>;
}) {
  const { id: idStr } = await params;
  const sp = await searchParams;
  const userRole = await getUserRole();

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
      <nav className="max-w-4xl mx-auto mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:underline text-blue-600">
          Главная
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-900 dark:text-white">{tour.title}</span>
      </nav>
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

        {/* Клиенская секция с формой и сообщением */}
        <BookingSection
          tourId={tour.id}
          success={sp.success === "1"}
          userRole={userRole}
        />
      </div>
    </main>
  );
}
