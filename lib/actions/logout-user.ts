"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LogoutUser() {
  const cookie = await cookies();
  cookie.delete("token");
  redirect("/auth/login");
}
