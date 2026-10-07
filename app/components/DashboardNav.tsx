"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User2, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/feed", label: "Feed", icon: Home, match: (p: string) => p === "/feed" },
  {
    href: "/explore",
    label: "Explore",
    icon: Globe,
    match: (p: string) => p.startsWith("/explore"),
  },
];

type DashboardNavProps = {
  userId: string;
};

export default function DashboardNav({ userId }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <nav className="space-y-1">
      {links.map(({ href, label, icon: Icon, match }) => {
        const active = match(pathname);
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-4 rounded-lg border border-transparent px-3 py-3 transition-colors",
              active
                ? "border-border bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-6 w-6 shrink-0" />
            <span className="sr-only md:not-sr-only">{label}</span>
          </Link>
        );
      })}
      <Link
        href={`/profile/${userId}`}
        className={cn(
          "flex items-center gap-4 rounded-lg border border-transparent px-3 py-3 transition-colors",
          pathname.startsWith(`/profile/${userId}`)
            ? "border-border bg-muted text-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <User2 className="h-6 w-6 shrink-0" />
        <span className="sr-only md:not-sr-only">Profile</span>
      </Link>
    </nav>
  );
}
