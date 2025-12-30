"use server";

import { cookies } from "next/headers";

/**
 * Sets the authentication token in an httpOnly cookie on the frontend domain.
 * This allows the Next.js middleware to see the token even if the backend is on a different domain.
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  
  cookieStore.set("cinehall-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 3 * 24 * 60 * 60, // 3 days
  });
}

/**
 * Removes the authentication token cookie from the frontend domain.
 */
export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete("cinehall-token");
}
