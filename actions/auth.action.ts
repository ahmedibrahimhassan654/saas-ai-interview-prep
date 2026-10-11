"use server";

import { register } from "@/backend/controllers/auth.controller";

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<{ created?: boolean; error?: { message: string; statusCode: number } }> {
  const result = await register(name, email, password);
  if ('error' in result) {
    return { error: result.error };
  }
  return { created: result.created };
}