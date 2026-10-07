import Link from "next/link";
import { Button } from "@/components/ui/button";
import NewCapsuleDrawer from "./NewCapsuleDrawer";

type FeedEmptyStateProps = {
  userId: string;
};

export default function FeedEmptyState({ userId }: FeedEmptyStateProps) {
  return (
    <div className="py-16 text-center">
      <p className="text-body-secondary">
        No capsules from people you follow yet.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button variant="outline" asChild>
          <Link href="/explore">Explore</Link>
        </Button>
        <NewCapsuleDrawer userId={userId} variant="outline" label="Create" />
      </div>
    </div>
  );
}
