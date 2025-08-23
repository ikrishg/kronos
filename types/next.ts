import { ReactNode } from 'react';

// Generic page props type
export interface PageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string | string[]>;
  children?: ReactNode;
}

// Dynamic route props
export interface DynamicRouteProps {
  params: {
    [key: string]: string;
  };
}

// Specific route props
export interface ProfilePageProps {
  params: {
    id: string;
  };
}

export interface TimeCapsulePageProps {
  params: {
    id: string;
  };
}
