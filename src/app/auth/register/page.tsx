// src/app/auth/register/page.tsx
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-2xl shadow max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Регистрация новых клиентов</h1>
        <p className="text-gray-600">
          Функция регистрации будет доступна скоро. <br />А пока, вы можете
          пользоваться сайтом как гость.
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
