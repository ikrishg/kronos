import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ExploreTimeCapsules() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 backdrop-blur-sm bg-background/50 p-4 border-b">
        <h1 className="text-xl font-medium">Explore</h1>
      </header>

      <div className="p-4 space-y-6">
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
