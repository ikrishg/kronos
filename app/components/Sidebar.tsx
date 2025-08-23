import Link from "next/link";
import Image from "next/image";
import { Home, User2, PenSquare, LogOut, Globe } from "lucide-react";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import CreateTimeCapsule from "./CreateTimeCapsule";

interface SidebarProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export default function Sidebar({ user }: SidebarProps) {
  return (
    <aside className="w-20 md:w-64 p-4 sticky top-0 h-screen">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <Image
              src="/globe.svg"
              alt="Kronos Logo"
              width={24}
              height={24}
              className="opacity-80"
            />
            <h1 className="font-medium tracking-tight hidden md:block">
              Kronos
            </h1>
          </div>

          <nav className="space-y-1">
            <Link
              href="/feed"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <Home className="h-6 w-6" />
              <span className="hidden md:block">Feed</span>
            </Link>
            <Link
              href="/explore"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <Globe className="h-6 w-6" />
              <span className="hidden md:block">Explore</span>
            </Link>
            <Link
              href={`/profile/${user.id}`}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors"
            >
              <User2 className="h-6 w-6" />
              <span className="hidden md:block">Profile</span>
            </Link>
          </nav>

          <div className="mt-8">
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="rounded-full w-full justify-start gap-2">
                  <PenSquare className="h-5 w-5" />
                  <span className="hidden md:block">Create TimeCapsule</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Create Time Capsule</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 pt-0">
                  <CreateTimeCapsule userId={user.id} />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center gap-3 p-2">
            {user.image && (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={36}
                height={36}
                className="rounded-full"
              />
            )}
            <div className="hidden md:block">
              <p className="font-medium text-sm truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
            className="mt-2"
          >
            <Button
              type="submit"
              variant="ghost"
              className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:block">Sign out</span>
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}
