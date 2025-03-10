// app/Providers/Providers.tsx
"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AppRouterCacheProvider>
        <SessionErrorHandler>{children}</SessionErrorHandler>
        <ToastContainer position="top-right" autoClose={3000} />
      </AppRouterCacheProvider>
    </SessionProvider>
  );
}

// Component to handle session errors (e.g., token refresh failures)
function SessionErrorHandler({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError" && pathname !== "/login") {
      // Notify the user
      toast.error("Your session has expired. Please log in again.");
    }
  }, [session, pathname, router]);

  return <>{children}</>;
}