// src/app/auth/login/page.tsx
import { login } from "./actions";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Вход в аккаунт</h1>
        <form action={login} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-2xl"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль"
            className="w-full px-3 py-2 border rounded-2xl"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-2xl hover:bg-green-700"
          >
            Войти
          </button>
        </form>
        <Link
          href="/"
          className="mt-4 pr-10 w-full text-center inline-block text-green-600 hover:underline"
        >
          {"<---"} Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
