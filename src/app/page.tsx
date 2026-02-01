// src/app/page.tsx
import { prisma } from "@/lib/prisma";
import link from "next/link";

export default async function HomePage() {
  // В данном месте загружаем все туры, хранящиеся в базе данных
  const tours = await prisma.tour.findMany();
  return (
    <main className="min-h-screen bg-zinc-50 p-6 dark:bg-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Наши туры
        </h1>
        {tours.length === 0 ? (
          <p className="text-gray-600 dark:text-fray-400">
            Нет доступных туров.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {tour.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {tour.description}
                  </p>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{tour.country}</span>
                    <span>
                      {new Date(tour.startDate).toLocaleDateString("ru")} -{" "}
                      {new Date(tour.endDate).toLocaleDateString("ru")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {tour.price.toLocaleString("ru")} руб.
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

/*
<link
                      href={`/tours/${tour.id}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      Подробнее {"---->"}
                    </link>
*/
