// src/app/auth/login/page.tsx
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Вход для клиентов</h1>
        <p className="text-gray-600">
          Функция входа будет скоро доступна. <br />А пока, вы можете оставить
          заявку как гость.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          {"<---"} Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
