import { Bell } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/50 p-4 border-b">
        <h1 className="text-xl font-medium">Notifications</h1>
      </header>

      <div className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-muted/40 h-12 w-12 rounded-full flex items-center justify-center">
            <Bell className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <h3 className="text-lg font-medium">No notifications yet</h3>
        <p className="text-muted-foreground text-sm mt-2 max-w-md mx-auto">
          When your time capsules are delivered or when someone follows you,
          you'll see them here.
        </p>
      </div>
    </div>
  );
}
