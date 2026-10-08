import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/app/components/Sidebar";
import RightSidebar from "@/app/components/RightSidebar";
import { Toaster } from "@/components/ui/sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar user={session.user} />

      <main className="min-h-screen flex-1 border-x border-border">
        <div className="mx-auto max-w-2xl">{children}</div>
      </main>

      <RightSidebar />

      <Toaster position="top-center" />
    </div>
  );
}
