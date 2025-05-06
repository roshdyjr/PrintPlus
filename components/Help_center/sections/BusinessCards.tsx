// /sections/BusinessCards.jsx
import React from "react";

export default function BusinessCards() {
  return (
    <main className="flex-1 bg-white rounded-lg p-6 text-sm">
      <h2 className="text-xl font-semibold mb-4">Business Cards</h2>
      <ul className="list-disc list-inside space-y-1">
        <li><strong>Standard Cards</strong> – High quality matte or gloss finish</li>
        <li><strong>Premium Cards</strong> – Thicker stock with special finishes</li>
        <li><strong>Eco-Friendly</strong> – Recycled materials</li>
      </ul>
    </main>
  );
}
