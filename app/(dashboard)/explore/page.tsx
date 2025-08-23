import { getPublicTimeCapsules } from "@/app/actions/timecapsule";
import TimeCapsuleCard from "@/app/components/TimeCapsuleCard";

export default async function ExploreTimeCapsules() {
  const timeCapsules = await getPublicTimeCapsules();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/50 p-4 border-b">
        <h1 className="text-xl font-medium">Explore</h1>
      </header>

      <div className="px-4">
        {timeCapsules.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No time capsules found
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Be the first to create a public time capsule!
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
