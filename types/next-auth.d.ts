import type { DefaultSession } from "next-auth";

export interface ProfilePicture {
  id?: string;
  url?: string | null;
}

export interface Subscription {
  id?: string;
  customerId?: string;
  created?: string;
  status?: string;
  startDate?: string;
  currentPeriodEnd?: string;
  nextPaymentAttempt?: string;
}

export interface AuthProvider {
  provider: string;
  providerId: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles: string[];
      profilePicture?: ProfilePicture;
      subscription?: Subscription;
      authProviders?: AuthProvider[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    roles: string[];
    profilePicture?: ProfilePicture;
    subscription?: Subscription;
    authProviders?: AuthProvider[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    roles?: string[];
    profilePicture?: ProfilePicture;
    subscription?: Subscription;
    authProviders?: AuthProvider[];
  }
}
