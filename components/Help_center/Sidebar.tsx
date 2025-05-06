"use client";
import React from "react";

export default function Sidebar({ activeSection, setActiveSection }) {
  const menuSections = [
    {
      title: "PrintPlus Products",
      items: [
        { id: "business-cards", name: "Business Cards" },
        { id: "printed-products", name: "Printed Products" },
        { id: "accessories", name: "Accessories" },
        { id: "custom-merchandise", name: "Custom Merchandise" },
      ],
    },
    {
      title: "Order and Shipping",
      items: [
        { id: "shipping-info", name: "Shipping Information" },
        { id: "delivery-times", name: "Delivery Times" },
        { id: "tracking", name: "Order Tracking" },
      ],
    },
    {
      title: "Returns",
      items: [
        { id: "return-policy", name: "Return Policy" },
        { id: "refund-process", name: "Refund Process" },
        { id: "contact-support", name: "Contact Support" },
      ],
    },
  ];

  return (
    <aside className="w-full sm:w-64 bg-[#6366F10F] p-4 space-y-6 rounded-lg">
      {menuSections.map((section) => (
        <div key={section.title}>
          <h2 className="font-semibold text-gray-800 mb-2">{section.title}</h2>
          <ul className="space-y-1 text-sm text-gray-600">
            {section.items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left hover:text-black ${
                    activeSection === item.id
                      ? "text-indigo-600 font-medium"
                      : ""
                  }`}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
