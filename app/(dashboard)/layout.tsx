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
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <Sidebar user={session.user} />

      {/* Main Content */}
      <main className="flex-1 border-x min-h-screen">
        <div className="max-w-2xl mx-auto">{children}</div>
      </main>

      {/* Right Sidebar */}
      <RightSidebar />

      <Toaster position="top-center" />
    </div>
  );
}
