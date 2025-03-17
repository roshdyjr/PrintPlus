"use client"; // Ensure this is a client component

import { useSession } from "next-auth/react";
import BussinessCards from "@/components/HomeComponents/BussinessCards";
import Hero from "@/components/HomeComponents/Hero";
import { MostSold } from "@/components/HomeComponents/MostSold";
import Popular from "@/components/HomeComponents/Popular";
import Services from "@/components/HomeComponents/Services";
import Tail from "@/components/HomeComponents/Tail";

export default function Home() {
  const { data: session } = useSession();

  // Log session details if the session exists
  if (session) {
    console.log("Session Details:", {
      user: session.user,
      accessToken: session.user.token, // Access token
      refreshToken: session.user.refreshToken, // Refresh token
      expires: session.expires, // Session expiry time
      error: session.error, // Any session-related errors
    });
  }

  return (
    <>
      <div className="overflow-x-hidden">
        <Hero />
        <Services />
        <Popular />
        <MostSold />
        <BussinessCards />
        <MostSold />
        <Tail />
      </div>
    </>
  );
}