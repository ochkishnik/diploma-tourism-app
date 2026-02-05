// src/app/admin/tours/DeleteTourButton.tsx
"use client";
import { deleteTour } from "./actions";

export function DeleteTourButton({ tourId }: { tourId: number }) {
  return (
    <form
      action={deleteTour}
      onSubmit={(e) => {
        if (!confirm("Вы уверены, что хотите удалить этот тур?"))
          e.preventDefault();
      }}
    >
      <input type="hidden" name="tourId" value={tourId} />
      <button type="submit" className="text-red-600 hover:underline text-sm">
        Удалить
      </button>
    </form>
  );
}
