// src/app/tours/[id]/BookingSection.tsx
"use client";
import { createBooking } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BookingSection({
  tourId,
  success,
  userRole,
}: {
  tourId: number;
  success: boolean;
  userRole: string | null | undefined;
}) {
  const isStaff = userRole === "ADMIN" || userRole === "MANAGER";
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Оставить свою заявку</h2>
      <Card>
        <CardHeader>
          <CardTitle>
            Оставить заявку
            {isStaff && (
              <p className="italic text-sm text-yellow-700 mt-3">
                Примечание: Этот функционал предназначен для обычных
                пользователей и гостей. Чтобы забронировать тур, войдите как
                клиент или используйте гостевой режим.
              </p>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Сообщение об успехе */}
          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-2xl">
              Заявка успешно отправлена! Менеджер свяжется с вами.
            </div>
          )}

          {/*Предложение авторизации*/}
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 text-sm text-blue-800">
            <strong>Хотите управлять заявками в личном кабинете?</strong>
            <a href="/auth/login" className="underline hover:text-blue-600">
              {" "}
              Войдите
            </a>{" "}
            или{" "}
            <a href="/auth/register" className="underline hover:text-blue-600">
              зарегистрируйтесь
            </a>
            .
          </div>

          <form action={createBooking} className="space-y-4">
            <input type="hidden" name="tourId" value={tourId} />

            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-1"
              >
                ФИО
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                className="w-full px-3 py-2 border rounded-md"
                disabled={isStaff}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-3 py-2 border rounded-md"
                disabled={isStaff}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Телефон
              </label>
              <input
                id="phone"
                name="phone"
                required
                className="w-full px-3 py-2 border rounded-md"
                disabled={isStaff}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isStaff}>
              Забронировать тур
            </Button>
          </form>

          {/*Ссылка на реквизиты*/}
          <div className="mt-4 text-sm text-gray-600 text-center">
            ● Оплата возможна и{" "}
            <a
              href="/payment-info"
              className="text-blue-600 underline hover:text-blue-800"
            >
              по банковским реквизитам
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
