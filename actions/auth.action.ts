"use server";

import { register, updateUserProfile as updateProfile } from "@/backend/controllers/auth.controller";

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<{ created?: boolean; error?: { message: string; statusCode: number } }> {
  try {
    const result = await register(name, email, password);
    if ('error' in result) {
      return { error: result.error };
    }
    return { created: result.created };
  } catch (error: any) {
    return { error: { message: error.message || "Registration failed", statusCode: 500 } };
  }
}

export async function updateUserProfile(data: {
  name: string;
  email: string;
  avatar?: string;
  oldavatar?: string;
}): Promise<{ success?: boolean; error?: { message: string; statusCode: number } }> {
  try {
    const result = await updateProfile(data);
    if ('error' in result) {
      return { error: result.error };
    }
    return { success: result.success };
  } catch (error: any) {
    return { error: { message: error.message || "Update failed", statusCode: 500 } };
  }
}
