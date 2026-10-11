"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Button,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { Logo } from "@/config/Logo";
import { registerUser } from "@/actions/auth.action";
import { useGenericSubmitHandler } from "@/components/form/generic-submit-handler";

export function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const form = document.querySelector('form') as HTMLFormElement;
    const response = await registerUser(data.name, data.email, data.password);
    console.log(response);
    if (response?.error) {
      console.error(response.error.message, response.error.statusCode);
      // TODO: display error to user (next lecture)
    } else if (response?.created) {
      toast.success("Account created successfully. Welcome aboard!");
      form?.reset();
    }
  });

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-8 py-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <Logo size={48} className="text-accent" />
        <h1 className="text-2xl font-bold tracking-tight">Welcome</h1>
        <p className="text-sm text-muted">
          Create a new account to get started
        </p>
      </div>

      <Form
        className="flex w-full max-w-sm flex-col gap-4"
        validationBehavior="native"
        onSubmit={handleSubmit}
      >
        <TextField name="name" type="text" isRequired fullWidth>
          <Label>Full Name</Label>
          <Input fullWidth placeholder="Enter your full name" />
          <FieldError />
        </TextField>

        <TextField name="email" type="email" isRequired fullWidth>
          <Label>Email</Label>
          <Input fullWidth placeholder="Enter your email" />
          <FieldError />
        </TextField>

        <TextField
          name="password"
          type={isVisible ? "text" : "password"}
          isRequired
          minLength={8}
          fullWidth
        >
          <Label>Password</Label>
          <InputGroup fullWidth>
            <InputGroup.Input placeholder="Enter your password" />
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

        <Button
          type="submit"
          variant="primary"
          isPending={loading}
          fullWidth
          className="mt-2"
        >
          Register
        </Button>

        <p className="text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-accent hover:underline">
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
}
