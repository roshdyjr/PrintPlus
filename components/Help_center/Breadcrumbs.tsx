import React from "react";

export default function Breadcrumbs({ sectionName }) {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <span>Help center</span> &gt; <span>Get Started</span> &gt;{" "}
      <span className="text-indigo-600">{sectionName}</span>
    </nav>
  );
}
