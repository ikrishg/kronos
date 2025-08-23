import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import WhoToFollow from "./WhoToFollow";

export default function RightSidebar() {
  return (
    <aside className="w-0 lg:w-80 p-4 sticky top-0 h-screen overflow-y-auto hidden lg:block">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
          <Input
            placeholder="Search"
            className="pl-10 bg-muted/50 border-none"
          />
        </div>

        {/* Who to follow */}
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="font-medium mb-4">Who to follow</h3>
          <WhoToFollow />
        </div>
        
        {/* Footer */}
        <div className="text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Kronos · CD Doon</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Cookies</a>
            <a href="#" className="hover:underline">About</a>
          </div>
        </div>
      </div>
    </aside>
  );
}
