// src/app/admin/users/ToggleRoleButton.tsx
"use client";
import { toggleUserRole } from "./actions";

export function ToggleRoleButton({
  userId,
  currentRole,
}: {
  userId: number;
  currentRole: string;
}) {
  return (
    <form
      action={toggleUserRole}
      onSubmit={(e) => {
        const msg =
          currentRole === "USER"
            ? "Сделать менеджером"
            : "Сделать пользователем";
        if (!confirm(msg + "?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="userId" value={userId} />
      <button
        type="submit"
        className="text-blue-600 bg-blue-100  border rounded-2xl p-1 m-1 hover:underline text-sm"
      >
        {currentRole === "USER"
          ? "Сделать менеджером!"
          : "Сделать пользователем!"}
      </button>
    </form>
  );
}
