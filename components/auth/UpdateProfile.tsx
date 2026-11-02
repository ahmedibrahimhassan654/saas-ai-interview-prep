"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Input, Label } from "@heroui/react";
import { Icon } from "@iconify/react";
import { updateUserProfile } from "@/actions/auth.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function UpdateProfile() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setAvatarPreview(session.user.profilePicture?.url || session.user.image || null);
    }
  }, [session]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      let avatarBase64: string | undefined = undefined;
      if (avatarFile && avatarPreview) {
        avatarBase64 = avatarPreview;
      }

      const oldAvatarId = session?.user?.profilePicture?.id || undefined;

      console.log("Calling updateUserProfile with:", { name, email, hasAvatar: !!avatarBase64, oldavatar: !!oldAvatarId });

      let result: any;
      try {
        result = await updateUserProfile({
          name,
          email,
          avatar: avatarBase64,
          oldavatar: oldAvatarId,
        });
      } catch (callError: any) {
        console.error("Server action call error:", callError);
        toast.error("Server error: " + (callError.message || "Unknown error"));
        setIsLoading(false);
        return;
      }

      console.log("Server action result:", result);

      if (result && result.error) {
        toast.error(result.error.message || "Update failed");
        console.error("Profile update error:", result.error);
        console.error("Full result:", result);
      } else if (result && result.success) {
        toast.success("Profile updated successfully!");
        await update();
        router.refresh();
      } else {
        toast.error("Unexpected response from server");
        console.error("Unexpected result:", result);
      }
    } catch (error: unknown) {
      console.error("Profile update exception:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh] px-4">
      <div className="w-full max-w-md rounded-lg border border-separator bg-background p-6 shadow-sm">
        <div className="flex flex-col gap-1 mb-6">
          <h2 className="text-xl font-semibold">Update Profile</h2>
          <p className="text-sm text-muted-foreground">
            Update your personal information
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24 rounded-full overflow-hidden bg-default-100">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Icon icon="solar:user-linear" className="w-12 h-12 text-default-400" />
                </div>
              )}
            </div>
            <label className="cursor-pointer" htmlFor="avatar-upload">
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="inline-flex items-center justify-center gap-1 rounded-md border border-separator px-2.5 py-1.5 text-sm hover:bg-default-100">
                <Icon icon="solar:camera-linear" className="w-4 h-4" />
                Change Avatar
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              readOnly
              disabled
              placeholder="Enter your email"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            isDisabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}
