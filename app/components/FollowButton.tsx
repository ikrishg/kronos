"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toggleFollow } from "@/app/actions/follow";
import { toast } from "sonner";

interface FollowButtonProps {
  targetUserId: string;
  initialIsFollowing: boolean;
}

export default function FollowButton({
  targetUserId,
  initialIsFollowing,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFollow = async () => {
    try {
      setIsLoading(true);
      const newFollowStatus = await toggleFollow({ targetUserId });
      setIsFollowing(newFollowStatus);

      if (newFollowStatus) {
        toast.success("Now following!");
      } else {
        toast.success("Unfollowed");
      }
    } catch (error) {
      console.error("Failed to toggle follow:", error);
      toast.error("Failed to update follow status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size="sm"
      variant={isFollowing ? "secondary" : "outline"}
      className="rounded-full text-xs"
      onClick={handleToggleFollow}
      disabled={isLoading}
    >
      {isLoading ? "..." : isFollowing ? "Following" : "Follow"}
    </Button>
  );
}
