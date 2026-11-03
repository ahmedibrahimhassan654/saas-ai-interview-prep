"use server";

import { forgotUserPassword as forgotUserPasswordController, resetUserPassword as resetUserPasswordController } from "@/backend/controllers/auth.controller";

type ResetPasswordInput = { password: string; confirmPassword: string };

export async function forgotPassword(email: string): Promise<{ success?: boolean; error?: { message: string; statusCode: number } }> {
  try {
    const result = await forgotUserPasswordController({ email });
    return { success: result.success };
  } catch (error: unknown) {
    return { error: { message: (error as Error)?.message || "Failed to send password reset email", statusCode: 500 } };
  }
}

export async function resetPassword(
  token: string,
  passwordOrData?: string | ResetPasswordInput,
  confirmPasswordArg?: string,
): Promise<{ passwordUpdated?: boolean; error?: { message: string; statusCode: number } }> {
  let password: string;
  let confirmPassword: string;

  if (typeof passwordOrData === "string") {
    password = passwordOrData;
    confirmPassword = confirmPasswordArg ?? passwordOrData;
  } else if (passwordOrData) {
    password = passwordOrData.password;
    confirmPassword = passwordOrData.confirmPassword;
  } else {
    password = "";
    confirmPassword = "";
  }

  try {
    const result = await resetUserPasswordController(token, password, confirmPassword);
    return { passwordUpdated: result.passwordUpdated };
  } catch (error: unknown) {
    return { error: { message: (error as Error)?.message || "Failed to reset password", statusCode: 500 } };
  }
}