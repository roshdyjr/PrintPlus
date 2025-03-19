import NextAuth, {
  NextAuthOptions,
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
    accessTokenExpires?: number;
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
          console.log("Attempting to authorize with credentials:", credentials);

          const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          const { success, message, data } = response.data;

          if (!success) {
            console.error("Login failed with message:", message);
            throw new Error(message || "Login failed");
          }

          if (!data.token || !data.refreshToken) {
            console.error("Invalid login response: Missing token");
            throw new Error("Invalid login response: Missing token");
          }

          console.log("Login Successful. Tokens Received:", {
            accessToken: data.token,
            refreshToken: data.refreshToken,
          });

          return {
            id: data.id || "",
            email: credentials?.email || "",
            token: data.token,
            refreshToken: data.refreshToken,
            accessTokenExpires: Date.now() + 1000 * 60 * 60, // Assuming token expires in 1 hour
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
      console.log("JWT Callback Triggered:", { token, user });
    
      // Initial sign-in
      if (user) {
        console.log("Initial Sign-In. Tokens Set:", {
          accessToken: user.token,
          refreshToken: user.refreshToken,
        });
    
        return {
          ...token,
          id: user.id,
          email: user.email,
          accessToken: user.token,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + 1000 * 60 * 60, // 1 hour expiry
        };
      }
    
      // If token is expired, try to refresh it
      if (Date.now() > (token.accessTokenExpires as number)) {
        console.log("Access token expired. Refreshing...");
    
        try {
          const refreshedTokens = await refreshAccessToken(
            token.accessToken as string,
            token.refreshToken as string
          );
    
          console.log("Tokens Refreshed Successfully:", refreshedTokens);
    
          return {
            ...token,
            accessToken: refreshedTokens.accessToken,
            refreshToken: refreshedTokens.refreshToken,
            accessTokenExpires: Date.now() + 1000 * 60 * 60, // 1 hour expiry
          };
        } catch (error) {
          console.error("Error refreshing token:", error);
    
          return {
            ...token,
            error: "RefreshAccessTokenError",
          };
        }
      }
    
      console.log("Token still valid. Returning existing token.");
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback Triggered:", { session, token });
    
      session.user = session.user || ({} as Session["user"]);
    
      if (token) {
        console.log("Session Updated. Tokens:", {
          accessToken: token.accessToken,
          refreshToken: token.refreshToken,
        });
    
        session.user.id = (token.id as string) ?? "unknown";
        session.user.email = (token.email as string) ?? "";
        session.user.token = (token.accessToken as string) ?? "";
        session.user.refreshToken = (token.refreshToken as string) ?? "";
      }
    
      if (token.error) {
        console.error("Session Error:", token.error);
        session.error = token.error as string;
      }
    
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };