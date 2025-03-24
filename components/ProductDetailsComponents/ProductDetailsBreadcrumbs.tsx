import { FaChevronRight } from "react-icons/fa";

const ProductDetailsBreadcrumbs = () => {
  // Breadcrumb data (name and optional href removed since links are not needed)
  const breadcrumbs = [
    { name: "Products" },
    { name: "Stationery" },
    { name: "Business Card" },
  ];

  return (
    // Breadcrumb container with flex layout
    <div className="flex items-center w-full sm:w-[551px] h-[30px] gap-2 px-4 md:px-10 xlg:gap-[11.93px] xlg:px-[71.55px]">
      {/* Map through breadcrumb items */}
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={index} className="flex items-center">
          {/* Breadcrumb text */}
          <span
            className={
              index < 2
                ? "text-[14px] text-shadeBlack xlg:text-[20px]" // Style for non-last items
                : "text-[14px] text-shadeGray xlg:text-[20px]" // Style for the last item
            }
          >
            {breadcrumb.name}
          </span>

          {/* Add chevron icon between breadcrumb items (except after the last item) */}
          {index < breadcrumbs.length - 1 && (
            <FaChevronRight className="mx-2 text-shadeBlack" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductDetailsBreadcrumbs;