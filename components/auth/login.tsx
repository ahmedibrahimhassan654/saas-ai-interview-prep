"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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

export function Login() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        toast.danger("Incorrect email or password.");
      } else {
        toast.success("Signed in successfully. Welcome back!");
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.danger("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-8 py-12">
      <div className="flex flex-col items-center gap-2 text-center">
        <Logo size={48} className="text-accent" />
        <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted">Sign in to continue your prep</p>
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

        <TextField
          name="password"
          type={isVisible ? "text" : "password"}
          isRequired
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
          isPending={isLoading}
          fullWidth
          className="mt-2"
        >
          Sign in
        </Button>

        <p className="text-center text-sm text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-accent hover:underline">
            Sign up
          </Link>
        </p>
      </Form>
    </div>
  );
}
