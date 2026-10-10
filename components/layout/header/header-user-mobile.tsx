"use client";

import { Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

export type MobileUser = {
  name?: string | null;
  email?: string | null;
  profilePicture?: {
    id?: string;
    url?: string | null;
  } | null;
  roles?: string[];
};

const DEFAULT_AVATAR = "/images/default-user.svg";

export function HeaderUserMobile({ user }: { user?: MobileUser }) {
  const name = user?.name ?? "User";
  const email = user?.email ?? "";
  const role = user?.roles?.[0];
  const avatar = user?.profilePicture?.url ?? DEFAULT_AVATAR;

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <Avatar.Image src={avatar} alt={name} />
        <Avatar.Fallback>{name.charAt(0).toUpperCase()}</Avatar.Fallback>
      </Avatar>

      <div className="flex min-w-0 flex-col items-start">
        <span className="truncate text-sm font-medium">{name}</span>
        <span className="truncate text-xs text-muted">{email}</span>
        {role ? (
          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-medium capitalize text-accent">
            <Icon icon="solar:shield-user-bold" className="h-3 w-3" />
            {role}
          </span>
        ) : null}
      </div>
    </div>
  );
}
