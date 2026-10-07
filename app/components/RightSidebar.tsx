import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import WhoToFollow from "./WhoToFollow";

export default function RightSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-0 overflow-y-auto border-l border-border bg-background p-4 lg:block lg:w-80">
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search" className="pl-10" />
        </div>

        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Who to follow
          </h3>
          <WhoToFollow />
        </div>

        <div className="text-xs text-muted-foreground">
          <p className="font-mono">© {new Date().getFullYear()} Kronos</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link href="/terms" className="hover:text-foreground">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
