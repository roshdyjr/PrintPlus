import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";

export default function ExpressDelivery() {
  // State to manage whether express delivery is selected
  const [selected, setSelected] = useState(true);

  return (
    // Main container for the express delivery option
    <div
      className={`flex items-center gap-3 rounded-lg ${
        selected ? " " : "bg-transparent"
      } cursor-pointer transition-all`}
      onClick={() => setSelected(!selected)} // Toggle selection on click
    >
      {/* Checkbox container */}
      <div
        className={`w-[31px] h-[31px] flex items-center justify-center rounded-[5px] ${
          selected ? "bg-[#6366F1] text-white" : "border border-gray-400"
        }`}
      >
        {/* Display checkmark icon if selected */}
        {selected && <FaCheck className="w-4 h-4" />}
      </div>

      {/* Delivery icon */}
      <TbTruckDelivery className="text-shadeBlack w-[35px] h-[35px]" />

      {/* Delivery option text */}
      <span className="text-[20px] font-medium text-shadeBlack">
        Express Delivery (2 days)
      </span>
    </div>
  );
}