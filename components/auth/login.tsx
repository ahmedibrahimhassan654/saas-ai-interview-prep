"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
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
import { useGenericSubmitHandler } from "@/components/form/generic-submit-handler";

export function Login() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const { handleSubmit, loading } = useGenericSubmitHandler(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      const message = res.error === "CredentialsSignin" ? "Invalid email or password" : res.error;
      toast.error(message);
      return;
    }

    if (res?.ok) {
      toast.success("Logged in successfully");
      router.push("/dashboard");
    }
  });

  const handleGitHubLogin = async () => {
    await signIn("github", { callbackUrl: "/app/dashboard" });
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/app/dashboard" });
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
          isPending={loading}
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

      <div className="flex w-full max-w-sm flex-col items-center gap-4">
        <div className="flex w-full items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-separator" />
          or continue with
          <span className="h-px flex-1 bg-separator" />
        </div>

        <Button
          type="button"
          variant="outline"
          fullWidth
          onPress={handleGitHubLogin}
          isDisabled={loading}
        >
          <span className="flex items-center gap-2">
            <Icon icon="logos:github-icon" className="h-5 w-5" />
            Continue with GitHub
          </span>
        </Button>

        <Button
          type="button"
          variant="outline"
          fullWidth
          onPress={handleGoogleLogin}
          isDisabled={loading}
        >
          <span className="flex items-center gap-2">
            <Icon icon="logos:google-icon" className="h-5 w-5" />
            Continue with Google
          </span>
        </Button>
      </div>
    </div>
  );
}
