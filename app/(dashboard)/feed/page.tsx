import { auth } from "@/auth";
import { getFollowingTimeCapsules } from "@/app/actions/timecapsule";
import TimeCapsuleCard from "@/app/components/TimeCapsuleCard";
import PageHeader from "@/app/components/PageHeader";
import FeedEmptyState from "@/app/components/FeedEmptyState";

export default async function FeedPage() {
  const session = await auth();
  const timeCapsules = await getFollowingTimeCapsules();
  const userId = session?.user?.id ?? "";

  return (
    <div className="min-h-screen">
      <PageHeader eyebrow="Feed" />

      <div className="px-4">
        {timeCapsules.length === 0 ? (
          <FeedEmptyState userId={userId} />
        ) : (
          <div>
            {timeCapsules.map((capsule) => (
              <TimeCapsuleCard key={capsule.id} timeCapsule={capsule} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
