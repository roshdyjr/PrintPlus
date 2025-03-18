"use client";
import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import CustomButton from "../SharedComponents/CustomButton";
import useFetchCategories from "@/hooks/useFetchCategories";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProdectSidebarProps {
  onClose: () => void;
}

export default function ProdectSidebar({ onClose }: ProdectSidebarProps) {
  const { categories, loading, error } = useFetchCategories();
  const [expanded, setExpanded] = useState<number | null>(0);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const pathname = usePathname();

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleExpand = (index: number) => {
    setExpanded((prev) => (prev === index ? null : index));
  };

  const handleSubCategoryClick = (categoryId: number, subCategoryId: number) => {
    setSelectedSubCategory(`${categoryId}-${subCategoryId}`);
  };
  const handleReset = () => {
    setSelectedSubCategory(null);
    window.location.href = "/category/2";
  };

  return (
    <div className="w-full py-5">
      <div className="flex justify-between items-center mb-4 px-6">
        <div className="flex items-center gap-4">
          <FaArrowLeft onClick={onClose} className="cursor-pointer text-lg" />
          <h2 className="font-semibold">Products</h2>
        </div>
        <button className="text-blue-500" onClick={handleReset}>
  Reset
</button>


      </div>

      <hr />

      <div className="flex flex-col gap-2 px-1 mt-5">
        {categories.map((cat, index) => (
          <div
            key={cat.categoryId}
            className={`border-b-[1px] py-3 ${expanded === index ? "rounded-[0px]" : "rounded-[15px]"}`}
          >
            <button
              onClick={() => handleExpand(index)}
              className="w-full flex justify-between items-center px-5"
            >
              <Link
                href={`/category/${cat.categoryId}`}
                className={`text-categoryLink font-semibold text-[15px] ${
                  pathname === `/category/${cat.categoryId}` ? "text-shadeBlack font-bold" : ""
                }`}
              >
                 <span>{cat.categoryName}</span>
              </Link>
             
              <span className="text-xl">
                {expanded === index ? <IoIosArrowDown /> : <IoIosArrowUp />}
              </span>
            </button>

            {cat.subCategories.length > 0 && expanded === index && (
              <div className="pl-4 flex flex-col gap-1 mt-2">
                {cat.subCategories.map((sub) => {
                  const isActive =
                    selectedSubCategory === `${cat.categoryId}-${sub.subCategoryId}` ||
                    pathname === `/category/${cat.categoryId}/${sub.subCategoryId}`;

                  return (
                    <Link
                      key={sub.subCategoryId}
                      href={`/category/${cat.categoryId}/${sub.subCategoryId}`}
                      className={`text-sm  block p-2 flex items-center gap-2 ${
                        isActive ? "font-bold text-blue-500" : ""
                      }`}
                      onClick={() => handleSubCategoryClick(cat.categoryId, sub.subCategoryId)}
                    >
                      {isActive && <span className="text-blue-500">•</span>}
                      {sub.subCategoryName}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-36 w-[314px] mx-auto">
        <CustomButton label="View results" className="" type="submit" onClick={onClose} />
      </div>
    </div>
  );
}
