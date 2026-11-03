"use server";

import { register, updateUserProfile as updateProfile, updateUserPassword as updatePasswordController } from "@/backend/controllers/auth.controller";

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
  } catch (error: unknown) {
    return { error: { message: (error as Error)?.message || "Registration failed", statusCode: 500 } };
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
  } catch (error: unknown) {
    return { error: { message: (error as Error)?.message || "Update failed", statusCode: 500 } };
  }
}

export async function updatePassword(data: {
  name: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}): Promise<{ success?: boolean; error?: { message: string; statusCode: number } }> {
  try {
    const result = await updatePasswordController(data);
    if ('error' in result) {
      return { error: result.error };
    }
    return { success: result.success };
  } catch (error: unknown) {
    return { error: { message: (error as Error)?.message || "Update password failed", statusCode: 500 } };
  }
}

import { forgotPassword as forgotPasswordFromUserActions } from "@/actions/userActions";

export async function forgotPassword(email: string): Promise<{ success?: boolean; error?: { message: string; statusCode: number } }> {
  return forgotPasswordFromUserActions(email);
}

import { resetPassword as resetPasswordFromUserActions } from "@/actions/userActions";

export async function resetPassword(
  token: string,
  passwordOrData?: string | { password: string; confirmPassword: string },
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

  return resetPasswordFromUserActions(token, password, confirmPassword);
}
