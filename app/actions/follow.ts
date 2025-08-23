"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const FollowSchema = z.object({
  targetUserId: z.string(),
});

interface FollowParams {
  targetUserId: string;
}

// Get followers of a user
export async function getFollowers(userId: string) {
  const followers = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      followers: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return followers?.followers || [];
}

// Get users that a user is following
export async function getFollowing(userId: string) {
  const following = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      following: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });

  return following?.following || [];
}

// Toggle follow status (follow if not following, unfollow if already following)
export async function toggleFollow({ targetUserId }: FollowParams) {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const currentUserId = session.user.id;
  
  // Can't follow yourself
  if (currentUserId === targetUserId) {
    throw new Error("Cannot follow yourself");
  }
  
  // Validate input
  const validatedData = FollowSchema.parse({
    targetUserId,
  });

  // Check if already following
  const existingFollow = await prisma.user.findFirst({
    where: {
      id: currentUserId,
      following: {
        some: {
          id: validatedData.targetUserId,
        },
      },
    },
  });

  if (existingFollow) {
    // Unfollow
    await prisma.user.update({
      where: { id: currentUserId },
      data: {
        following: {
          disconnect: { id: validatedData.targetUserId },
        },
      },
    });
  } else {
    // Follow
    await prisma.user.update({
      where: { id: currentUserId },
      data: {
        following: {
          connect: { id: validatedData.targetUserId },
        },
      },
    });
  }

  revalidatePath(`/profile/${targetUserId}`);
  revalidatePath(`/profile/${targetUserId}/followers`);
  revalidatePath(`/profile/${targetUserId}/following`);
  revalidatePath(`/profile/${currentUserId}/following`);

  return !existingFollow;
}
