import { getPublicTimeCapsules } from "@/app/actions/timecapsule";
import TimeCapsuleCard from "@/app/components/TimeCapsuleCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function FeedPage() {
  const timeCapsules = await getPublicTimeCapsules();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/50 p-4 border-b">
        <h1 className="text-xl font-medium">Feed</h1>
      </header>

      <div className="px-4">
        <Tabs defaultValue="all">
          <div className="sticky top-[73px] pt-2 bg-background/50 backdrop-blur-sm z-10">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            {timeCapsules.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No time capsules found</p>
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
          </TabsContent>

          <TabsContent value="following">
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Follow people to see their time capsules here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
