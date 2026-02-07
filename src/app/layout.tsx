// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getCurrentUserId, getUserRole } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "тур-ТУТ",
  description: "Сервис бронирования туров",
};

async function UserInfo() {
  const role = await getUserRole();
  const userId = await getCurrentUserId();

  // Контент для гостя
  if (!role || !userId) {
    return (
      <div className="flex gap-4">
        <Link
          href="/auth/login"
          className="text-blue-600 bg-gray-100 hover:text-blue-800 hover:bg-gray-200 text-sm border rounded-2xl p-2"
        >
          Войти
        </Link>
        <Link
          href="/auth/register"
          className="text-blue-600 bg-gray-100 hover:text-blue-800 hover:bg-gray-200 text-sm border rounded-2xl p-2"
        >
          Регистрация
        </Link>
      </div>
    );
  }

  // Обычный пользователь
  if (role === "USER") {
    const totalBooking = await prisma.booking.count({
      where: { userId },
    });
    const unpaidBookings = await prisma.booking.count({
      where: { userId, status: "NEW" },
    });
    const cancelledBooking = await prisma.booking.count({
      where: { userId, status: "CANCELLED" },
    });
    return (
      <div className="text-sm flex items-center gap-4 justify-between">
        <div>
          {totalBooking > 0 ? (
            <>
              <ul>Всего заявок: {totalBooking}</ul>
              {unpaidBookings > 0 && (
                <li className="text-yellow-800">
                  Неоплаченных: {unpaidBookings}
                </li>
              )}
              <li className="text-red-800">Отмененныx: {cancelledBooking}</li>
            </>
          ) : (
            "У вас пока нет заявок"
          )}
        </div>
        <Link
          href="/profile"
          className="text-blue-600 bg-gray-100 hover:text-blue-800 hover:bg-gray-200 text-sm border rounded-2xl p-2"
        >
          Личный кабинет
        </Link>
      </div>
    );
  }

  // Администратор или менеджер
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const roleName = role === "ADMIN" ? "Администратор" : "Менеджер";

  return (
    <div className="text-sm flex items-center gap-2">
      <span>
        {user?.email}
        {" ("}
        <span className={role === "ADMIN" ? "text-red-600" : "text-blue-600"}>
          {roleName}
        </span>
        {")"}
      </span>
      <Link
        href="/admin"
        className="text-blue-600 bg-gray-100 hover:text-blue-800 hover:bg-gray-200 text-sm border rounded-2xl p-2"
      >
        Панель управления
      </Link>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="bg-white shadow p-4 border-b">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:bg-gray-900 hover:text-white border rounded-full pl-1 pr-1 pb-3 pt-3"
            >
              тур-ТУТ
            </Link>
            <UserInfo />
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
