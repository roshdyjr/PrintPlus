"use client"; // Ensure this is a client component

import { useSession } from "next-auth/react";
import Hero from "@/components/Home/Hero";
import Marketing_Card from "@/components/Home/Marketing_Card";
import Bannar_marketing from "@/components/Home/Bannar_marketing";
import TOP_Selling_products from "@/components/Home/TOP_Selling_products";
import Printing_services from "@/components/Home/Printing_services";

import Services from "@/components/HomeComponents/Services";
import RecommendedProducts from "@/components/Products/RecommendedProducts";

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
        <Printing_services />
        <Marketing_Card />
        <div className="py-10 md:px-20 3xl:px-40 px-[16px]">
          <RecommendedProducts />
        </div>
        <Bannar_marketing />
        <TOP_Selling_products />
        <Services />
        <div className="py-10 md:px-20 3xl:px-40 px-[16px]">
          <RecommendedProducts />
        </div>
      </div>
    </>
  );
}
