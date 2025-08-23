import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { getFollowers } from "@/app/actions/follow";
import { UserListItem } from "@/app/components/UserListItem";

export default async function FollowersPage(props: any) {
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

  // Get followers
  const followers = await getFollowers(id);

  // Get current user's following list to determine follow status
  let currentUserFollowing: string[] = [];
  if (currentUserId) {
    const following = await prisma.user.findUnique({
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
    currentUserFollowing = following?.following.map(user => user.id) || [];
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
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
        </div>
      </header>

      {/* Followers List */}
      <div className="divide-y">
        {followers.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            No followers yet
          </div>
        ) : (
          followers.map((follower) => (
            <UserListItem 
              key={follower.id} 
              user={follower}
              isFollowing={currentUserFollowing.includes(follower.id)} 
            />
          ))
        )}
      </div>
    </div>
  );
}
