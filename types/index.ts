import 'next-auth';
import { User as PrismaUser } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export type TimeCapsuleWithUser = {
  id: string;
  content: string;
  public: boolean;
  date: Date;
  deliverAt: Date;
  delivered: boolean;
  userId: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
};

export type UserWithFollows = PrismaUser & {
  followers: PrismaUser[];
  following: PrismaUser[];
};
