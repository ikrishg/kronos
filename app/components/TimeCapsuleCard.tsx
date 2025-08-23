import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow, format } from "date-fns";
import { User2, Clock, Globe, Lock } from "lucide-react";
import { TimeCapsuleWithUser } from "@/types";

interface TimeCapsuleCardProps {
  timeCapsule: TimeCapsuleWithUser;
}

export default function TimeCapsuleCard({ timeCapsule }: TimeCapsuleCardProps) {
  const { id, content, public: isPublic, date, deliverAt, user } = timeCapsule;
  
  const formattedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });

  const deliveryDate = format(new Date(deliverAt), "PPP");
  
  return (
    <div className="border-b p-4 hover:bg-muted/20">
      <div className="flex gap-3">
        <div className="flex-shrink-0">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={48}
              height={48}
              className="rounded-full"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <User2 className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/profile/${user.id}`} className="font-medium hover:underline">
              {user.name}
            </Link>
            <span className="text-muted-foreground text-sm">·</span>
            <span className="text-muted-foreground text-sm">{formattedDate}</span>
          </div>

          <Link href={`/kronos/${id}`} className="block mb-3">
            <p className="whitespace-pre-wrap break-words">{content}</p>
          </Link>

          <div className="flex items-center text-xs text-muted-foreground gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Unlocks on {deliveryDate}</span>
            </div>
            {isPublic ? (
              <div className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                <span>Public</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>Private</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
