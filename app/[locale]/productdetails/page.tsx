import BusinessCard from "@/components/ProductDetailsComponents/BusinessCard";
import FAQ from "@/components/ProductDetailsComponents/Faqs";
import ProductsSection from "@/components/ProductDetailsComponents/ProductsSection";
import Reviews from "@/components/ProductDetailsComponents/Reviews";
import React from "react";

const page = () => {
  return (
    <div>
      <BusinessCard />
      <Reviews />
      <FAQ />
      <ProductsSection />
    </div>
  );
};

export default page;
