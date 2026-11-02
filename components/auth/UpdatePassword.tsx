"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Input, Label } from "@heroui/react";
import { Icon } from "@iconify/react";
import { updatePassword } from "@/actions/auth.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function UpdatePassword() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setNewPassword("");
      setConfirmPassword("");
    }
  }, [session]);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = session?.user?.email;

    if (!email) {
      toast.error("You must be logged in to update your password");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    setIsLoading(true);

    try {
      const result = await updatePassword({
        name: session.user.name || "",
        email,
        newPassword,
        confirmPassword,
      });

      if (result.error) {
        toast.error(result.error.message || "Password update failed");
        console.error("Password update error:", result.error);
        console.error("Full result:", result);
      } else if (result.success) {
        toast.success("Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
        await update();
      } else {
        toast.error("Unexpected response from server");
        console.error("Unexpected result:", result);
      }
    } catch (error: unknown) {
      console.error("Password update exception:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] px-4">
      <div className="w-full max-w-md rounded-lg border border-separator bg-background p-6 shadow-sm">
        <div className="flex flex-col gap-1 mb-6">
          <h2 className="text-xl font-semibold">Update Password</h2>
          <p className="text-sm text-muted-foreground">
            Update your account password
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 relative">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              isIconOnly
              onPress={toggleNewPasswordVisibility}
              className="absolute right-3 mt-9"
            >
              <Icon
                icon={
                  showNewPassword ? "solar:eye-linear" : "solar:eye-off-linear"
                }
                className="h-4 w-4"
              />
            </Button>
          </div>

          <div className="flex flex-col gap-2 relative">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              isIconOnly
              onPress={toggleConfirmPasswordVisibility}
              className="absolute right-3 mt-9"
            >
              <Icon
                icon={
                  showConfirmPassword
                    ? "solar:eye-linear"
                    : "solar:eye-off-linear"
                }
                className="h-4 w-4"
              />
            </Button>
          </div>

          <Button
            type="submit"
            variant="primary"
            isDisabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
