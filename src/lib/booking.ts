// src/lib/booking.ts

export function getBookingDeadline(isGuest: boolean): Date {
  const now = new Date();
  // Гостям дается три дня брони, а авторизованным пользователям - семь дней
  const days = isGuest ? 3 : 7;
  return new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
}
