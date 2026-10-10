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

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  roles: string[];
  profilePicture?: ProfilePicture | null;
  subscription?: Subscription | null;
  authProviders?: AuthProvider[];
}

declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }

  interface User {
    id: string;
    roles: string[];
    profilePicture?: ProfilePicture | null;
    subscription?: Subscription | null;
    authProviders?: AuthProvider[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    roles?: string[];
    user?: SessionUser;
  }
}