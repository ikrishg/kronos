import Image from "next/image";
import { LogOut } from "lucide-react";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import KronosWordmark from "./KronosWordmark";
import DashboardNav from "./DashboardNav";
import NewCapsuleDrawer from "./NewCapsuleDrawer";

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
    <aside className="sticky top-0 h-screen w-20 shrink-0 border-r border-border bg-background p-4 md:w-64">
      <div className="flex h-full flex-col justify-between">
        <div>
          <div className="mb-8 flex justify-center md:justify-start">
            <KronosWordmark
              size="md"
              href="/feed"
              collapseBelowMd
            />
          </div>

          <DashboardNav userId={user.id} />

          <div className="mt-8">
            <NewCapsuleDrawer
              userId={user.id}
              className="w-full justify-center md:justify-start"
              label="New capsule"
              collapseLabelBelowMd
            />
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
            <div className="hidden min-w-0 md:block">
              <p className="truncate text-sm font-normal">{user.name}</p>
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
              className="w-full justify-center gap-2 text-muted-foreground hover:text-foreground md:justify-start"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline">Sign out</span>
            </Button>
          </form>
        </div>
      </div>
    </aside>
  );
}
