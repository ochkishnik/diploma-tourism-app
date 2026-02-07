// src/lib/auth.ts

import { cookies } from "next/headers";

export async function getUserRole() {
  const roleCookie = (await cookies()).get("user_role");
  return roleCookie?.value as "ADMIN" | "MANAGER" | "USER" | undefined;
}

export async function getCurrentUserId(): Promise<number | null> {
  const idCookie = (await cookies()).get("user_id");

  if (!idCookie) return null;

  const id = parseInt(idCookie.value, 10);

  return isNaN(id) ? null : id;
}
