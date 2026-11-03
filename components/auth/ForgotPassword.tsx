"use client";

import { toast } from "react-hot-toast";
import Link from "next/link";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Logo } from "@/config/Logo";
import { forgotPassword } from "@/actions/userActions";
import { useGenericSubmitHandler } from "@/components/form/generic-submit-handler";

export function ForgotPassword() {
  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const response = await forgotPassword(data.email);

    if (response?.error) {
      toast.error(response.error.message);
      return;
    }

    if (response?.success) {
      toast.success("Password reset link sent to your email");
    }
  });

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-8 py-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <Logo size={48} className="text-accent" />
        <h1 className="text-2xl font-bold tracking-tight">Forgot Password</h1>
        <p className="text-sm text-muted">
          Enter your email to receive a password reset link
        </p>
      </div>

      <Form
        className="flex w-full max-w-sm flex-col gap-4"
        validationBehavior="native"
        onSubmit={handleSubmit}
      >
        <TextField name="email" type="email" isRequired fullWidth>
          <Label>Email</Label>
          <Input fullWidth placeholder="Enter your email" />
          <FieldError />
        </TextField>

        <Button type="submit" variant="primary" isPending={loading} fullWidth className="mt-2">
          Send Reset Link
        </Button>

        <p className="text-center text-sm text-muted">
          Remember your password?{" "}
          <Link href="/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
}

export default ForgotPassword;
