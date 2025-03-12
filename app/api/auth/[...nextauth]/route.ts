import NextAuth, {
  NextAuthOptions,
  User,
  DefaultSession,
  Session,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { refreshAccessToken } from "@/utils/refreshToken";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      token: string;
      refreshToken: string;
    } & DefaultSession["user"];
    error?: string; // Add the `error` property
  }

  interface User {
    id: string;
    email: string;
    token: string;
    refreshToken: string;
  }

  interface JWT {
    id: string;
    email: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
    error?: string; // Add the `error` property
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { success, message, data } = response.data;

          if (!success) {
            throw new Error(message || "Login failed");
          }

          if (!data.token || !data.refreshToken) {
            throw new Error("Invalid login response: Missing token");
          }

          return {
            id: data.id || "",
            email: credentials?.email || "",
            token: data.token,
            refreshToken: data.refreshToken,
          };
        } catch (error: any) {
          console.error(
            "Login Error:",
            error.response?.data?.message || error.message
          );
          throw new Error(
            error.response?.data?.message || "حدث خطأ أثناء تسجيل الدخول"
          );
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign-in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.token;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 5 * 1000; // 5 seconds for testing
      }

      // Check if the access token has expired
      if (Date.now() < (token.accessTokenExpires as number)) {
        return token; // Token is still valid
      }

      // Token has expired, refresh it
      try {
        const refreshedTokens = await refreshAccessToken(
          token.accessToken as string, // Pass the access token
          token.refreshToken as string // Pass the refresh token
        );

        return {
          ...token,
          accessToken: refreshedTokens.accessToken,
          refreshToken: refreshedTokens.refreshToken,
          accessTokenExpires: Date.now() + 5 * 1000, // 5 seconds for testing
        };
      } catch (error) {
        console.error("Failed to refresh token:", error);
        return { ...token, error: "RefreshAccessTokenError" }; // Mark the token as invalid
      }
    },
    async session({ session, token }) {
      session.user = session.user || ({} as Session["user"]);

      if (token) {
        session.user.id = (token.id as string) ?? "unknown";
        session.user.email = (token.email as string) ?? "";
        session.user.token = (token.accessToken as string) ?? "";
        session.user.refreshToken = (token.refreshToken as string) ?? "";
      }

      if (token.error) {
        session.error = token.error as string; // Pass token refresh errors to the session
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };