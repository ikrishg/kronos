import Image from "next/image";
import Link from "next/link";
import { User2 } from "lucide-react";
import { prisma } from "@/prisma";
import { auth } from "@/auth";
import FollowButton from "@/app/components/FollowButton";

export default async function WhoToFollow() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return null;
  }

  // Get users that the current user is not following
  const suggestedUsers = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
      },
      followers: {
        none: {
          id: userId,
        },
      },
    },
    take: 3,
  });

  if (suggestedUsers.length === 0) {
    return (
      <div className="text-sm text-muted-foreground text-center py-2">
        No suggestions available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {suggestedUsers.map((user) => (
        <div key={user.id} className="flex items-center justify-between">
          <Link
            href={`/profile/${user.id}`}
            className="flex items-center gap-2"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <User2 className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
            <div>
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">
                @{user.name?.toLowerCase().replace(/\s+/g, "")}
              </p>
            </div>
          </Link>
          <FollowButton targetUserId={user.id} initialIsFollowing={false} />
        </div>
      ))}
    </div>
  );
}
