import Link from "next/link";
import { Icon } from "@iconify/react";

interface HeaderAnnouncementProps {
  isVisible?: boolean;
}

export function HeaderAnnouncement({ isVisible = true }: HeaderAnnouncementProps) {
  const isSubscribed = false;

  if (!isVisible || isSubscribed) {
    return null;
  }

  return (
    <div className="w-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 py-2 text-center sm:flex-row sm:gap-4">
        <p className="text-sm font-medium">
          Prep smarter, succeed faster. Your interview journey starts here.
        </p>
        <Link
          href="/subscribe"
          className="flex shrink-0 items-center gap-1 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition-colors hover:bg-white/90"
        >
          Subscribe
          <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
