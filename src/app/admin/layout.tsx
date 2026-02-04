// src/app/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Панель управления</h1>
          <nav>
            <Link href="/admin" className="text-blue-600 mr-4">
              Главная
            </Link>
            <Link href="/admin/tours" className="text-blue-600 mr-4">
              Туры
            </Link>
            <Link href="/admin/bookings" className="text-blue-600 mr-4">
              Заявки
            </Link>
            <Link href="/admin/users" className="text-blue-600 mr-4">
              Пользователи
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6">{children}</main>
    </div>
  );
}
