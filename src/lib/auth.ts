// src/lib/auth.ts
import { cookies } from "next/headers";

export async function getUserRole() {
  const roleCookie = (await cookies()).get("user_role");
  return roleCookie?.value as "ADMIN" | "MANAGER" | "USER" | undefined;
}
