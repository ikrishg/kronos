"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { z } from "zod";

const TimeCapsuleSchema = z.object({
  content: z.string().min(1).max(1000),
  isPublic: z.boolean(),
  deliverAt: z.date(),
  userId: z.string(),
});

interface CreateTimeCapsuleParams {
  content: string;
  isPublic: boolean;
  deliverAt: Date;
  userId: string;
}

export async function createTimeCapsule({
  content,
  isPublic,
  deliverAt,
  userId,
}: CreateTimeCapsuleParams) {
  const session = await auth();
  
  // Verify that the user is authenticated and is creating for themselves
  if (!session?.user || session.user.id !== userId) {
    throw new Error("Unauthorized");
  }
  
  // Validate input
  const validatedData = TimeCapsuleSchema.parse({
    content,
    isPublic,
    deliverAt,
    userId,
  });

  // Create the time capsule
  const timeCapsule = await prisma.timeCapsule.create({
    data: {
      content: validatedData.content,
      public: validatedData.isPublic,
      deliverAt: validatedData.deliverAt,
      userId: validatedData.userId,
    },
  });

  revalidatePath("/feed");
  revalidatePath(`/profile/${userId}`);

  return timeCapsule;
}

export async function getPublicTimeCapsules() {
  const timeCapsules = await prisma.timeCapsule.findMany({
    where: {
      public: true,
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
    take: 20,
  });

  return timeCapsules;
}

export async function getUserTimeCapsules(userId: string) {
  const session = await auth();
  
  // If viewing own profile, show all capsules (public and private)
  // Otherwise, show only public ones
  const isOwnProfile = session?.user?.id === userId;
  
  const timeCapsules = await prisma.timeCapsule.findMany({
    where: {
      userId: userId,
      ...(isOwnProfile ? {} : { public: true }),
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
  });

  return timeCapsules;
}

export async function toggleLikeTimeCapsule(timeCapsuleId: string) {
  const session = await auth();
  
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  
  // For future implementation: Add like functionality
}
