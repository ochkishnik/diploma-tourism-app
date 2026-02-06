// src/app/auth/register/page.tsx
import { register } from "./actions";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Анкета регистрации нового
          <br />
          пользователя
        </h1>
        <form action={register} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-2xl required"
          />
          <input
            name="password"
            type="password"
            placeholder="Пароль (мин. 6 символов)"
            className="w-full px-3 py-2 border rounded-2xl"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-2xl hover:bg-blue-70"
          >
            Зарегистрироваться
          </button>
        </form>
        <Link
          href="/"
          className="mt-4 pr-10 w-full text-center inline-block text-blue-600 hover:underline"
        >
          {"<---"} Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
