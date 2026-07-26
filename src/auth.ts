import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credential) => {
        const { username, password } = credential as {
          username: string;
          password: string;
        };

        if (!username || !password) return null;

        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!user?.passwordHash) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: String(user.id),
          name: user.name,
          username: user.username,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user?.id) {
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
      }

      token

      return token;
    },

    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.role = token.role;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
