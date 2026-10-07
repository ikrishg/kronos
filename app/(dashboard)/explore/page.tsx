import Link from "next/link";
import { auth } from "@/auth";
import { getPublicTimeCapsules } from "@/app/actions/timecapsule";
import TimeCapsuleCard from "@/app/components/TimeCapsuleCard";
import PageHeader from "@/app/components/PageHeader";
import { Button } from "@/components/ui/button";
import NewCapsuleDrawer from "@/app/components/NewCapsuleDrawer";

export default async function ExploreTimeCapsules() {
  const session = await auth();
  const timeCapsules = await getPublicTimeCapsules();
  const userId = session?.user?.id ?? "";

  return (
    <div className="min-h-screen">
      <PageHeader eyebrow="Explore" />

      <div className="px-4">
        {timeCapsules.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-body-secondary">No public capsules yet.</p>
            <div className="mt-8 flex justify-center">
              {userId ? (
                <NewCapsuleDrawer userId={userId} label="Create" />
              ) : (
                <Button asChild>
                  <Link href="/login">Sign in to create</Link>
                </Button>
              )}
            </div>
          </div>
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
