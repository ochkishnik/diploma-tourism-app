// src/app/admin/page.tsx
import { getUserRole } from "@/lib/auth";

export default async function AdminDashboard() {
  const role = await getUserRole();

  if (role === "ADMIN") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Панель администратора</h2>
        <p>Вы можете:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Управлять пользователями</li>
          <li>Настраивать глобальные параметры</li>
          <li>Полный доступ ко всем разделам</li>
        </ul>
      </div>
    );
  }

  if (role === "MANAGER") {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Панель мененджера</h2>
        <p>Вы можете:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Добавлять и редактировать туры</li>
          <li>Обрабатывать заявки пользователей</li>
          <li>Управлять контентом сайта</li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-red-600">Доступ запрещён</h2>
      <p>Недействительная роль пользователя.</p>
    </div>
  );
}
