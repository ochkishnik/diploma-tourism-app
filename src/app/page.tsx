// src/app/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
            {tours.map((tour) => {
              // Отладочная информация: console.log("Tour ID:", tour.id, typeof tour.id);
              return (
                <Card
                  key={tour.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                      {tour.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
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
                      <Button variant="link" asChild>
                        <Link
                          href={`tours/${tour.id}`}
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                        >
                          Подробнее{" --->"}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
