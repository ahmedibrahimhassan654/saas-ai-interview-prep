import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/backend/config/dbConnect";
import User from "@/backend/models/user.model";

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
          authProviders: user.authProviders,
          subscription: user.subscription
            ? {
                id: user.subscription.id,
                customerId: user.subscription.customerId,
                status: user.subscription.status,
                created: user.subscription.created?.toISOString(),
                startDate: user.subscription.startDate?.toISOString(),
                currentPeriodEnd:
                  user.subscription.currentPeriodEnd?.toISOString(),
                nextPaymentAttempt:
                  user.subscription.nextPaymentAttempt?.toISOString(),
              }
            : undefined,
        };
      },
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.roles = user.roles;
        token.profilePicture = user.profilePicture;
        token.subscription = user.subscription;
        token.authProviders = user.authProviders;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id ?? "";
        session.user.roles = token.roles ?? [];
        session.user.profilePicture = token.profilePicture;
        session.user.subscription = token.subscription;
        session.user.authProviders = token.authProviders;
      }
      return session;
    },
  },
};
