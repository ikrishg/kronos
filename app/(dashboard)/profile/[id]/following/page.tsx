import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { getFollowing } from "@/app/actions/follow";
import { UserListItem } from "@/app/components/UserListItem";

export default async function FollowingPage(props: any) {
  const { id } = props.params;
  const session = await auth();
  const currentUserId = session?.user?.id;

  // Get user profile
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!user) {
    notFound();
  }

  // Get following
  const following = await getFollowing(id);

  // Get current user's following list to determine follow status
  let currentUserFollowing: string[] = [];
  if (currentUserId) {
    const userFollowing = await prisma.user.findUnique({
      where: {
        id: currentUserId,
      },
      select: {
        following: {
          select: {
            id: true,
          },
        },
      },
    });
    currentUserFollowing = userFollowing?.following.map(user => user.id) || [];
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/50 p-4 border-b">
        <div className="flex items-center gap-4">
          <Link href={`/profile/${id}`} className="rounded-full p-2 hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-medium">{user.name}</h1>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
        </div>
      </header>

      {/* Following List */}
      <div className="divide-y">
        {following.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            Not following anyone yet
          </div>
        ) : (
          following.map((followedUser) => (
            <UserListItem 
              key={followedUser.id} 
              user={followedUser} 
              isFollowing={currentUserFollowing.includes(followedUser.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
