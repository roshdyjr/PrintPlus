import React from "react";

export default function PrintedProducts() {
  return (
    <main className="flex-1 bg-white rounded-lg p-6 text-sm">
      <h2 className="text-[32px] font-[400]  mb-6">Printed Products</h2>
      <ul className="space-y-6 text-[#6366F1] text-[20px] font-[400]">
        {Array(7)
          .fill(
            "Design custom t-shirts, hoodies, and polo shirts with your branding."
          )
          .map((text, idx) => (
            <li key={idx}>{text}</li>
          ))}
      </ul>
    </main>
  );
}
