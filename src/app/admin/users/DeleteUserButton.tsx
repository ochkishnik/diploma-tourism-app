"use client";
import { deleteUser } from "./actions";

export function DeleteUserButton({ userId }: { userId: number }) {
  return (
    <form
      action={deleteUser}
      onSubmit={(e) => {
        if (
          !confirm(
            "Удалить пользователя? Это действие влечет необратимые последствия.",
          )
        )
          e.preventDefault();
      }}
    >
      <input type="hidden" name="userId" value={userId} />
      <button
        type="submit"
        className="text-red-600 bg-red-100 border rounded-2xl p-1 m-1 hover:underline text-sm"
      >
        Удалить
      </button>
    </form>
  );
}
