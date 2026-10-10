"use client";

import { Avatar, Dropdown } from "@heroui/react";
import { Icon } from "@iconify/react";

const user = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
};

export function HeaderUser() {
  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="User menu"
        className="h-auto cursor-pointer bg-transparent p-0 data-[hovered=true]:bg-transparent"
      >
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <Avatar.Image src={user.avatar} alt={user.name} />
            <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
          </Avatar>
          <div className="hidden flex-col items-start sm:flex">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted">{user.email}</span>
          </div>
        </div>
      </Dropdown.Trigger>

      <Dropdown.Popover>
        <Dropdown.Menu>
          <Dropdown.Item isDisabled textValue={`Signed in as ${user.name}`}>
            <span className="text-xs text-muted">Signed in as {user.name}</span>
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
          <Dropdown.Item id="logout" textValue="Logout">
            <Icon icon="solar:logout-bold" className="h-4 w-4" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
