import type { AuthOptions, Profile } from "next-auth";
import type { SessionUser, Subscription } from "@/types/next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user.model";

type SubscriptionLike = {
  id?: string;
  customerId?: string;
  status?: string;
  created?: Date | string;
  startDate?: Date | string;
  currentPeriodEnd?: Date | string;
  nextPaymentAttempt?: Date | string;
};

function toIso(value?: Date | string): string | undefined {
  if (!value) {
    return undefined;
  }
  return value instanceof Date ? value.toISOString() : value;
}

function toSubscription(
  subscription: SubscriptionLike | null | undefined,
): Subscription | undefined {
  if (!subscription) {
    return undefined;
  }
  return {
    id: subscription.id,
    customerId: subscription.customerId,
    status: subscription.status,
    created: toIso(subscription.created),
    startDate: toIso(subscription.startDate),
    currentPeriodEnd: toIso(subscription.currentPeriodEnd),
    nextPaymentAttempt: toIso(subscription.nextPaymentAttempt),
  };
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password.");
        }

        await dbConnect();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password",
        );

        if (!user || !user.password) {
          throw new Error("No account found with this email.");
        }

        const isPasswordMatched = await user.comparePassword(
          credentials.password,
        );

        if (!isPasswordMatched) {
          throw new Error("Incorrect email or password.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles,
          profilePicture: user.profilePicture,
          subscription: toSubscription(user.subscription),
          authProviders: user.authProviders,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();

      if (account?.provider === "credentials") {
        // Credentials flow: authorize already sets the DB id as user.id
        return true;
      }

      // Social login flow (Google, GitHub, etc.)
      const existingUser = await User.findOne({
        email: user.email ?? undefined,
      });

      const providerId =
        account?.providerAccountId ??
        (profile as (Profile & { id?: string }) | undefined)?.id ??
        profile?.sub;

      if (!existingUser) {
        const newUser = new User({
          email: user.email,
          name: user.name ?? "User",
          profilePicture: {
            url: profile?.image ?? user.image ?? null,
          },
          authProviders: [
            {
              provider: account?.provider ?? "oauth",
              providerId: providerId ?? "unknown",
            },
          ],
        });

        await newUser.save();
        user.id = newUser._id.toString();
      } else {
        user.id = existingUser._id.toString();

        // Refresh the avatar from the social provider when available
        const socialImage = profile?.image ?? user.image;
        const profileChanged =
          socialImage != null &&
          existingUser.profilePicture?.url !== socialImage;

        if (profileChanged) {
          existingUser.profilePicture = {
            ...(existingUser.profilePicture ?? {}),
            url: socialImage,
          };
        }

        const alreadyLinked = (existingUser.authProviders ?? []).some(
          (p: { provider: string; providerId: string }) =>
            p.provider === account?.provider,
        );

        if (!alreadyLinked && account?.provider) {
          existingUser.authProviders.push({
            provider: account.provider,
            providerId: providerId ?? "unknown",
          });
        }

        if (profileChanged || !alreadyLinked) {
          await existingUser.save();
        }
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        // Initial sign-in: fetch the full user from the DB so the session
        // contains roles/subscription/authProviders (not just provider data).
        await dbConnect();
        const dbUser = await User.findById(user.id).lean();

        if (dbUser) {
          const fullUser: SessionUser = {
            id: String(dbUser._id),
            name: dbUser.name,
            email: dbUser.email,
            roles: dbUser.roles ?? [],
            profilePicture: dbUser.profilePicture,
            subscription: toSubscription(dbUser.subscription),
            authProviders: dbUser.authProviders ?? [],
          };
          token.user = fullUser;
        } else {
          token.user = {
            id: user.id,
            name: user.name ?? undefined,
            email: user.email ?? undefined,
            image: user.image ?? undefined,
            roles: user.roles ?? [],
            profilePicture: user.profilePicture,
            subscription: toSubscription(user.subscription),
            authProviders: user.authProviders,
          };
        }
      }
      // On subsequent calls `user` is undefined; keep the existing token.user.
      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/app/dashboard`;
    },
  },
};