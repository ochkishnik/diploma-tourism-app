// src/app/admin/login/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { login } from "./actions";

export default function AdminLogin() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Вход для администратора
        </h1>
        {error && (
          <div className="text-red-500 mb-4">Неверный email или пароль</div>
        )}
        <form action={login} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}
