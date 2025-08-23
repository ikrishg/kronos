import { getFollowingTimeCapsules } from "@/app/actions/timecapsule";
import TimeCapsuleCard from "@/app/components/TimeCapsuleCard";

export default async function FeedPage() {
  const timeCapsules = await getFollowingTimeCapsules();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/50 p-4 border-b">
        <h1 className="text-xl font-medium">Feed</h1>
      </header>

      <div className="px-4">
        {timeCapsules.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No time capsules from people you follow
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Follow people to see their time capsules here, or check out the
              Explore page to discover new content!
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {timeCapsules.map((capsule) => (
              <TimeCapsuleCard key={capsule.id} timeCapsule={capsule} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
