import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, TrendingUp, Users, Calendar, Sparkles } from "lucide-react";
import { prisma } from "@/prisma";
import TimeCapsuleCard from "@/app/components/TimeCapsuleCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getPopularTimeCapsules() {
  // Get recent public time capsules
  const timeCapsules = await prisma.timeCapsule.findMany({
    where: {
      public: true,
      delivered: false,
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    take: 5,
  });

  return timeCapsules;
}

export default async function ExploreTimeCapsules() {
  const popularTimeCapsules = await getPopularTimeCapsules();

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/50 p-4 border-b">
        <h1 className="text-xl font-medium mb-4">Explore</h1>
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search time capsules..." 
              className="pl-10 w-full"
            />
          </div>
          <Button variant="outline" size="sm">Search</Button>
        </div>
      </header>

      <div className="p-4 space-y-8">
        <Tabs defaultValue="featured">
          <TabsList className="mb-4">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          <TabsContent value="featured" className="space-y-6">
            <section>
              <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-yellow-500" />
                Featured Time Capsules
              </h2>
              <div className="space-y-1">
                {popularTimeCapsules.map((timeCapsule) => (
                  <TimeCapsuleCard 
                    key={timeCapsule.id} 
                    timeCapsule={timeCapsule}
                  />
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Upcoming Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">{event.date}</p>
                    <h3 className="font-medium mt-1">{event.title}</h3>
                    <p className="text-sm mt-2">{event.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="trending" className="space-y-6">
            <section>
              <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-red-500" />
                Trending Topics
              </h2>
              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic) => (
                  <Link
                    key={topic.name}
                    href={`/explore/topic/${topic.slug}`}
                    className="px-3 py-1 bg-muted/30 rounded-full text-sm hover:bg-muted/50 transition-colors"
                  >
                    #{topic.name}
                  </Link>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-medium mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-violet-500" />
                Suggested Creators
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {suggestedCreators.map((creator) => (
                  <Link
                    key={creator.id}
                    href={`/profile/${creator.id}`}
                    className="p-4 border rounded-lg hover:bg-muted/20 transition-colors flex items-center gap-3"
                  >
                    <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                      {creator.image ? (
                        <Image
                          src={creator.image}
                          alt={creator.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      ) : (
                        <Users className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{creator.name}</p>
                      <p className="text-xs text-muted-foreground">{creator.capsules} capsules</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </TabsContent>
          
          <TabsContent value="categories" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/explore/${category.slug}`}
                  className="group flex justify-between items-center p-6 border rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div>
                    <h3 className="font-medium text-lg">{category.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {category.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const categories = [
  {
    name: "Life Milestones",
    slug: "life-milestones",
    description: "Celebrate important moments and achievements",
  },
  {
    name: "Personal Growth",
    slug: "personal-growth",
    description: "Reflect on your journey and aspirations",
  },
  {
    name: "Memories",
    slug: "memories",
    description: "Preserve precious moments to revisit later",
  },
  {
    name: "Messages to Future Self",
    slug: "future-messages",
    description: "Write letters to your future self",
  },
  {
    name: "World Events",
    slug: "world-events",
    description: "Document historic moments and your thoughts",
  },
  {
    name: "Predictions",
    slug: "predictions",
    description: "Make predictions about the future to check later",
  },
];

const trendingTopics = [
  { name: "TimeTravel", slug: "time-travel" },
  { name: "FutureSelf", slug: "future-self" },
  { name: "Memories2025", slug: "memories-2025" },
  { name: "LifeGoals", slug: "life-goals" },
  { name: "TimeCapsule", slug: "time-capsule" },
  { name: "Nostalgia", slug: "nostalgia" },
  { name: "FutureMe", slug: "future-me" },
  { name: "Reflection", slug: "reflection" },
];

const upcomingEvents = [
  {
    id: "1",
    title: "Digital Time Capsule Day",
    date: "September 15, 2025",
    description: "Join our community event to create special time capsules commemorating the day."
  },
  {
    id: "2",
    title: "Future Letters Workshop",
    date: "October 10, 2025",
    description: "Learn how to write meaningful letters to your future self with our guided workshop."
  },
  {
    id: "3",
    title: "End of Year Reflection",
    date: "December 20, 2025",
    description: "Create time capsules to be opened at the end of 2026. Share your hopes and predictions!"
  },
  {
    id: "4",
    title: "Memory Preservation Summit",
    date: "January 5, 2026",
    description: "Start the new year by learning techniques to preserve your most precious memories."
  },
];

const suggestedCreators = [
  {
    id: "creator1",
    name: "Memory Keeper",
    image: null,
    capsules: 24
  },
  {
    id: "creator2",
    name: "Future Thinker",
    image: null,
    capsules: 15
  },
  {
    id: "creator3",
    name: "Time Traveler",
    image: null,
    capsules: 32
  },
  {
    id: "creator4",
    name: "Nostalgic Soul",
    image: null,
    capsules: 18
  },
  {
    id: "creator5",
    name: "Dream Catcher",
    image: null,
    capsules: 27
  },
  {
    id: "creator6",
    name: "Memory Maker",
    image: null,
    capsules: 21
  },
];
