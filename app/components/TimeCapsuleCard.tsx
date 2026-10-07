import Image from "next/image";
import Link from "next/link";
import { formatDistanceToNow, format } from "date-fns";
import { User2 } from "lucide-react";
import { TimeCapsuleWithUser } from "@/types";

interface TimeCapsuleCardProps {
  timeCapsule: TimeCapsuleWithUser;
  hideContent?: boolean;
}

export default function TimeCapsuleCard({
  timeCapsule,
  hideContent = false,
}: TimeCapsuleCardProps) {
  const { id, content, public: isPublic, date, deliverAt, user } = timeCapsule;

  const formattedDate = formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });

  const deliveryDate = format(new Date(deliverAt), "PPP");
  const isDelivered = new Date(deliverAt) <= new Date();

  return (
    <article className="border-b border-border p-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex gap-3">
          <div className="shrink-0">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "User"}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <User2 className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Link
                href={`/profile/${user.id}`}
                className="font-normal hover:underline"
              >
                {user.name}
              </Link>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="text-sm text-muted-foreground">{formattedDate}</span>
            </div>

            <Link href={`/kronos/${id}`} className="mb-3 block">
              {hideContent ? (
                <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  LOCKED · unlocks {deliveryDate}
                </p>
              ) : (
                <p className="whitespace-pre-wrap break-words text-body-secondary">
                  {content}
                </p>
              )}
            </Link>

            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              <span>
                {isDelivered ? "Unlocked" : "Unlocks"} {deliveryDate}
              </span>
              <span>·</span>
              <span>{isPublic ? "Public" : "Private"}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
