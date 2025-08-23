import Image from "next/image";
import Link from "next/link";
import { User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { toggleFollow } from "@/app/actions/follow";

interface UserListItemProps {
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  isFollowing?: boolean;
}

export async function UserListItem({ user, isFollowing }: UserListItemProps) {
  const session = await auth();
  const currentUserId = session?.user?.id;
  const isCurrentUser = currentUserId === user.id;

  return (
    <div className="flex items-center justify-between py-3 px-4 hover:bg-muted/30">
      <Link href={`/profile/${user.id}`} className="flex items-center gap-3">
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
          <div className="font-medium">{user.name}</div>
          <div className="text-sm text-muted-foreground">
            @{user.name?.toLowerCase().replace(/\s+/g, "")}
          </div>
        </div>
      </Link>

      {!isCurrentUser && currentUserId && (
        <form
          action={async () => {
            await toggleFollow({ targetUserId: user.id });
          }}
        >
          <Button
            variant={isFollowing ? "outline" : "default"}
            size="sm"
            className="rounded-full"
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </form>
      )}
    </div>
  );
}
