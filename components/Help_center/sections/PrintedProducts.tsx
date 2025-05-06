import React from "react";

export default function PrintedProducts() {
  return (
    <main className="flex-1 bg-white rounded-lg p-6 text-sm">
      <h2 className="text-xl font-semibold mb-4">Printed Products</h2>
      <ul className="space-y-2 text-blue-600 underline text-sm">
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
