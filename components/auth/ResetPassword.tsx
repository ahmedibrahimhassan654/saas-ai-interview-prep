"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Logo } from "@/config/Logo";
import { resetPassword } from "@/actions/userActions";
import { useGenericSubmitHandler } from "@/components/form/generic-submit-handler";

export function ResetPassword({ token }: { token: string }) {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const response = await resetPassword(token, {
      password: data.password,
      confirmPassword: data.confirmPassword,
    });

    if (response?.error) {
      toast.error(response.error.message);
      return;
    }

    if (response?.passwordUpdated) {
      toast.success("Password reset successfully");
      router.push("/login");
    }
  });

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-8 py-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <Logo size={48} className="text-accent" />
        <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
        <p className="text-sm text-muted">Enter your new password below</p>
      </div>

      <Form
        className="flex w-full max-w-sm flex-col gap-4"
        validationBehavior="native"
        onSubmit={handleSubmit}
      >
        <TextField
          name="password"
          type={isVisible ? "text" : "password"}
          isRequired
          minLength={8}
          fullWidth
        >
          <Label>New Password</Label>
          <InputGroup fullWidth>
            <InputGroup.Input placeholder="Enter new password" />
            <InputGroup.Suffix>
              <button
                type="button"
                aria-label={isVisible ? "Hide password" : "Show password"}
                className="text-muted transition-colors hover:text-foreground"
                onClick={() => setIsVisible((visible) => !visible)}
              >
                <Icon
                  icon={isVisible ? "solar:eye-closed-bold" : "solar:eye-bold"}
                  className="h-5 w-5"
                />
              </button>
            </InputGroup.Suffix>
          </InputGroup>
          <FieldError />
        </TextField>

        <TextField
          name="confirmPassword"
          type={isVisible ? "text" : "password"}
          isRequired
          minLength={8}
          fullWidth
        >
          <Label>Confirm Password</Label>
          <Input fullWidth placeholder="Confirm new password" />
          <FieldError />
        </TextField>

        <Button
          type="submit"
          variant="primary"
          isPending={loading}
          fullWidth
          className="mt-2"
        >
          Reset Password
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;
