"use server";

import {
  register,
  type RegisterResult,
} from "@/backend/controllers/auth.controller";

export async function registerUser(
  name: string,
  email: string,
  password: string,
): Promise<RegisterResult> {
  return await register(name, email, password);
}
