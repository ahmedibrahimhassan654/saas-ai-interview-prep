"use client";

import { useRouter } from "next/navigation";
import { Avatar, Dropdown, toast } from "@heroui/react";
import { Icon } from "@iconify/react";
import { signOut } from "next-auth/react";

export type SessionUser = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  profilePicture?: {
    id?: string;
    url?: string | null;
  } | null;
  roles?: string[];
};

const DEFAULT_AVATAR = "/images/default-user.svg";

export function HeaderUser({ user }: { user?: SessionUser }) {
  const router = useRouter();
  const name = user?.name ?? "User";
  const email = user?.email ?? "";
  const role = user?.roles?.[0];
  const avatar =
    user?.profilePicture?.url ?? user?.image ?? DEFAULT_AVATAR;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    toast.success("You have been logged out.");
    router.push("/");
    router.refresh();
  };

  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="User menu"
        className="h-auto cursor-pointer bg-transparent p-0 data-[hovered=true]:bg-transparent"
      >
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <Avatar.Image src={avatar} alt={name} />
            <Avatar.Fallback>{name.charAt(0).toUpperCase()}</Avatar.Fallback>
          </Avatar>
          <div className="hidden flex-col items-start sm:flex">
            <span className="text-sm font-medium">{name}</span>
            <span className="text-xs text-muted">{email}</span>
            {role ? (
              <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium capitalize text-accent">
                <Icon icon="solar:shield-user-bold" className="h-3 w-3" />
                {role}
              </span>
            ) : null}
          </div>
        </div>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item isDisabled textValue={`Signed in as ${email}`}>
            <span className="text-xs text-muted">Signed in as {email}</span>
          </Dropdown.Item>
          <Dropdown.Item
            id="admin-dashboard"
            href="/admin/dashboard"
            textValue="Admin Dashboard"
          >
            <Icon icon="solar:shield-user-bold" className="h-4 w-4" />
            Admin Dashboard
          </Dropdown.Item>
          <Dropdown.Item
            id="app-dashboard"
            href="/dashboard"
            textValue="App Dashboard"
          >
            <Icon icon="solar:widget-bold" className="h-4 w-4" />
            App Dashboard
          </Dropdown.Item>
          <Dropdown.Item
            id="logout"
            variant="danger"
            textValue="Logout"
            onAction={handleLogout}
          >
            <Icon icon="solar:logout-bold" className="h-4 w-4" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
