// src/app/admin/users/page.tsx
import { prisma } from "@/lib/prisma";
import { getUserRole } from "@/lib/auth";
import { ToggleRoleButton } from "./ToggleRoleButton";
import { DeleteUserButton } from "./DeleteUserButton";

export default async function UsersAdminPage() {
  const role = await getUserRole();

  // Доступ только для пользователя с ролью ADMIN
  if (role !== "ADMIN") {
    return (
      <div className="text-red-600">
        <h2 className="text-2xl font-bold">Доступ запрещён</h2>
        <p>Только администратор может управлять пользователями.</p>
      </div>
    );
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Управление пользователями</h2>
      <p className="mb-4">Всего пользователей: {users.length}</p>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Роль</th>
              <th className="border px-4 py-2">Дата</th>
              <th className="border px-4 py-2">Действие</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{user.id}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2 text-center">
                  <span
                    className={`px-2 py-1 rounded-2xl text-xs ${
                      user.role === "ADMIN"
                        ? "bg-red-100 text-red-800"
                        : user.role === "MANAGER"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="border px-4 py-2">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2  text-center">
                  {user.role !== "ADMIN" && (
                    <ToggleRoleButton
                      userId={user.id}
                      currentRole={user.role}
                    />
                  )}
                  {user.role !== "ADMIN" && (
                    <DeleteUserButton userId={user.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
