"use server";

import { forgotUserPassword as forgotUserPasswordController } from "@/backend/controllers/auth.controller";

export async function forgotPassword(email: string): Promise<{ success?: boolean; error?: { message: string; statusCode: number } }> {
  try {
    const result = await forgotUserPasswordController({ email });
    return { success: result.success };
  } catch (error: unknown) {
    return { error: { message: (error as Error)?.message || "Failed to send password reset email", statusCode: 500 } };
  }
}