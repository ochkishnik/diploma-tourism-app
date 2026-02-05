// src/app/tours/[id]/BookingSection.tsx
"use client";
import { createBooking } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BookingSection({
  tourId,
  success,
}: {
  tourId: number;
  success: boolean;
}) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Оставить свою заявку</h2>
      <Card>
        <CardHeader>
          <CardTitle>Оставить заявку</CardTitle>
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
              />
            </div>

            <Button type="submit" className="w-full">
              Забронировать тур
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
