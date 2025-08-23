import Image from "next/image";
import { ArrowLeft, Calendar, MapPin, User2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { getUserTimeCapsules } from "@/app/actions/timecapsule";
import TimeCapsuleCard from "@/app/components/TimeCapsuleCard";
import { format } from "date-fns";

export default async function ProfilePage(props: any) {
  const { id } = await props.params;
  const session = await auth();
  const currentUserId = session?.user?.id;

  // Get user profile
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
        },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const isCurrentUser = currentUserId === user.id;
  const isFollowing = currentUserId
    ? (await prisma.user.count({
        where: {
          id: currentUserId,
          following: {
            some: {
              id: user.id,
            },
          },
        },
      })) > 0
    : false;

  // Get time capsules
  const timeCapsules = await getUserTimeCapsules(id);

  // Calculate delivered and pending capsules
  const deliveredCapsules = timeCapsules.filter((capsule) => capsule.delivered);
  const pendingCapsules = timeCapsules.filter((capsule) => !capsule.delivered);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/50 p-4 border-b">
        <div className="flex items-center gap-4">
          <Link href="/feed" className="rounded-full p-2 hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-xl font-medium">{user.name}</h1>
            <p className="text-xs text-muted-foreground">
              {timeCapsules.length} time capsules
            </p>
          </div>
        </div>
      </header>

      {/* Profile header */}
      <div className="bg-muted/30 h-32"></div>
      <div className="px-4 pb-4 border-b relative">
        <div className="absolute -top-12 left-4">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={80}
              height={80}
              className="rounded-full border-4 border-background"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-4 border-background">
              <User2 className="h-10 w-10 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className="mt-14">
          <div className="flex justify-end mb-4">
            {isCurrentUser ? (
              <Button variant="outline" className="rounded-full">
                Edit profile
              </Button>
            ) : (
              <form
                action={async () => {
                  "use server";
                  if (!currentUserId) return;

                  if (isFollowing) {
                    // Unfollow
                    await prisma.user.update({
                      where: { id: currentUserId },
                      data: {
                        following: {
                          disconnect: { id: user.id },
                        },
                      },
                    });
                  } else {
                    // Follow
                    await prisma.user.update({
                      where: { id: currentUserId },
                      data: {
                        following: {
                          connect: { id: user.id },
                        },
                      },
                    });
                  }
                }}
              >
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  className="rounded-full"
                >
                  {isFollowing ? "Following" : "Follow"}
                </Button>
              </form>
            )}
          </div>

          <div className="mb-4">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">
              @{user.name?.toLowerCase().replace(/\s+/g, "")}
            </p>
          </div>

          <div className="mb-4 text-sm">
            <p>Saving memories for the future ✨</p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>
                Joined{" "}
                {format(
                  new Date(user.emailVerified || Date.now()),
                  "MMMM yyyy"
                )}
              </span>
            </div>
          </div>

          <div className="flex gap-5 text-sm">
            <Link href={`/profile/${id}/following`} className="hover:underline">
              <span className="font-bold">{user._count.following}</span>{" "}
              <span className="text-muted-foreground">Following</span>
            </Link>
            <Link href={`/profile/${id}/followers`} className="hover:underline">
              <span className="font-bold">{user._count.followers}</span>{" "}
              <span className="text-muted-foreground">Followers</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="capsules" className="w-full">
        <div className="sticky top-[73px] bg-background/50 backdrop-blur-sm z-10">
          <TabsList className="w-full justify-start p-0 bg-transparent">
            <TabsTrigger
              value="capsules"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Time Capsules
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Delivered
            </TabsTrigger>
            {isCurrentUser && (
              <TabsTrigger
                value="pending"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                Pending
              </TabsTrigger>
            )}
          </TabsList>
        </div>

        <TabsContent value="capsules">
          {timeCapsules.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No time capsules yet</p>
            </div>
          ) : (
            <div className="divide-y">
              {timeCapsules.map((capsule) => (
                <TimeCapsuleCard key={capsule.id} timeCapsule={capsule} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="delivered">
          {deliveredCapsules.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No delivered time capsules yet
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {deliveredCapsules.map((capsule) => (
                <TimeCapsuleCard key={capsule.id} timeCapsule={capsule} />
              ))}
            </div>
          )}
        </TabsContent>

        {isCurrentUser && (
          <TabsContent value="pending">
            {pendingCapsules.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground">
                  No pending time capsules
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {pendingCapsules.map((capsule) => (
                  <TimeCapsuleCard key={capsule.id} timeCapsule={capsule} />
                ))}
              </div>
            )}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
