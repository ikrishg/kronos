import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, User2 } from "lucide-react";
import { notFound } from "next/navigation";
import { formatDistanceToNow, format } from "date-fns";
import { prisma } from "@/prisma";
import { auth } from "@/auth";

export default async function TimeCapsulePage(props: any) {
  const { id } = props.params;
  const session = await auth();
  const userId = session?.user?.id;

  const timeCapsule = await prisma.timeCapsule.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!timeCapsule) {
    notFound();
  }

  // Check if the user has access to this time capsule
  const canView = 
    timeCapsule.public || // Public time capsules can be viewed by anyone
    timeCapsule.userId === userId || // Users can view their own time capsules
    (timeCapsule.delivered && timeCapsule.public); // Delivered public time capsules can be viewed

  if (!canView) {
    return (
      <div className="min-h-screen">
        <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/50 p-4 border-b">
          <div className="flex items-center gap-4">
            <Link href="/feed" className="rounded-full p-2 hover:bg-muted">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-xl font-medium">Time Capsule</h1>
          </div>
        </header>

        <div className="flex flex-col items-center justify-center p-8 text-center h-[80vh]">
          <div className="bg-muted/30 p-6 rounded-lg max-w-md">
            <h2 className="text-xl font-medium mb-2">Private Time Capsule</h2>
            <p className="text-muted-foreground">
              This time capsule is private and can only be viewed by its creator.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = formatDistanceToNow(new Date(timeCapsule.date), {
    addSuffix: true,
  });

  const deliveryDate = format(new Date(timeCapsule.deliverAt), "PPP");

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/50 p-4 border-b">
        <div className="flex items-center gap-4">
          <Link href="/feed" className="rounded-full p-2 hover:bg-muted">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-xl font-medium">Time Capsule</h1>
        </div>
      </header>

      <div className="p-4">
        <div className="flex items-center gap-3 mb-4">
          <Link href={`/profile/${timeCapsule.user.id}`}>
            {timeCapsule.user.image ? (
              <Image
                src={timeCapsule.user.image}
                alt={timeCapsule.user.name || "User"}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <User2 className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </Link>
          <div>
            <Link
              href={`/profile/${timeCapsule.user.id}`}
              className="font-medium hover:underline"
            >
              {timeCapsule.user.name}
            </Link>
            <div className="text-sm text-muted-foreground">{formattedDate}</div>
          </div>
        </div>

        <div className="border rounded-lg p-6 my-4">
          <p className="whitespace-pre-wrap break-words text-lg">
            {timeCapsule.content}
          </p>
          
          <div className="mt-6 text-sm text-muted-foreground border-t pt-4">
            <p>Created {format(new Date(timeCapsule.date), "PPP")}</p>
            {timeCapsule.delivered ? (
              <p>Delivered {deliveryDate}</p>
            ) : (
              <p>Will be delivered on {deliveryDate}</p>
            )}
            <p>
              Visibility: {timeCapsule.public ? "Public" : "Private"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
