"use client";

import React from "react";
import { products } from "./data";
import ProductCard from "./ProductCard";
import Link from "next/link";

const RecommendedProducts = () => {
  const recommendedProducts = products.filter(
    (p) => p.category === "recommendation"
  );

  return (
    <div className="py-10">
      <h2 className="text-[20px] font-bold mb-4">Our Recommendations</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {recommendedProducts.map((product) => (
            <Link href="/pages/Product_Details" key={product.id}>
                <ProductCard  product={product} />

            </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;