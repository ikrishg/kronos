import { Bell, User, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { prisma } from "@/prisma";
import { auth } from "@/auth";

async function getNotifications() {
  const session = await auth();
  
  if (!session?.user) {
    return [];
  }

  const notifications = await prisma.notification.findMany({
    where: {
      receiverId: session.user.id,
    },
    include: {
      actor: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return notifications;
}

export default async function NotificationsPage() {
  const notifications = await getNotifications();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/50 p-4 border-b">
        <h1 className="text-xl font-medium">Notifications</h1>
      </header>

      {notifications.length > 0 ? (
        <div className="divide-y">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 flex items-center gap-3 hover:bg-muted/20 transition-colors ${
                !notification.read ? "bg-muted/10" : ""
              }`}
            >
              <div className="flex-shrink-0">
                {notification.type === "follow" ? (
                  <div className="bg-blue-100 dark:bg-blue-900 h-10 w-10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-500 dark:text-blue-300" />
                  </div>
                ) : notification.type === "time_capsule_delivered" ? (
                  <div className="bg-green-100 dark:bg-green-900 h-10 w-10 rounded-full flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-500 dark:text-green-300" />
                  </div>
                ) : (
                  <div className="bg-muted/40 h-10 w-10 rounded-full flex items-center justify-center">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <div className="flex-grow">
                <div className="flex items-start gap-2">
                  {notification.actor && notification.actor.image ? (
                    <Link href={`/profile/${notification.actor.id}`}>
                      <Image
                        src={notification.actor.image}
                        alt={notification.actor.name || "User"}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    </Link>
                  ) : null}
                  
                  <div>
                    <p className="text-sm">
                      {notification.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}
