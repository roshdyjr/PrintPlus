"use client";
import Breadcrumbs from "@/components/Help_center/Breadcrumbs";
import SearchBar from "@/components/Help_center/SearchBar";
import BusinessCards from "@/components/Help_center/sections/BusinessCards";
import Custom_Merchandise from "@/components/Help_center/sections/CustomMerchandise";
import PrintedProducts from "@/components/Help_center/sections/PrintedProducts";
import Sidebar from "@/components/Help_center/Sidebar";
import { useState } from "react";
 
// ... استورد باقي الأقسام

export default function Home() {
  const [activeSection, setActiveSection] = useState("printed-products");

  const sectionMap = {
    "business-cards": { component: <BusinessCards />, name: "Business Cards" },
    "printed-products": {
      component: <PrintedProducts />,
      name: "Printed Products",
    },
     "custom-merchandise": {
      component: <Custom_Merchandise />,
      name: "Custom Merchandise",
    },
    // اضف باقي الأقسام هنا
  };

  const current = sectionMap[activeSection] || sectionMap["printed-products"];

  return (
    <div className="min-h-screen  ">
      <SearchBar/>
      <div className="flex flex-col sm:flex-row max-w-7xl mx-auto mt-6 px-4 gap-6">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="flex-1">
          <Breadcrumbs sectionName={current.name} />
          {current.component}
        </div>
      </div>
    </div>
  );
}
