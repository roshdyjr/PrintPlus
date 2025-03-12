"use client";

import { SessionProvider } from "next-auth/react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SessionErrorHandler from "@/components/SessionErrorHandler";

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