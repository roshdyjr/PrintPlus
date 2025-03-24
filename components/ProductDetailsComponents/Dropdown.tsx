"use client";
import { useState } from "react";

// Define the type for the Dropdown component props
type DropdownProps = {
  label: string; // Label for the dropdown
  options: string[]; // Array of options to display in the dropdown
  selected: string; // Currently selected option
  onSelect: (option: string) => void; // Function to handle option selection
};

const Dropdown = ({ label, options, selected, onSelect }: DropdownProps) => {
  // State to manage the dropdown's open/close state
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between w-full">
      {/* Dropdown Label */}
      <label className="block text-[16px] font-semibold text-shadeBlack xlg:text-[20px]">
        {label}
      </label>

      {/* Dropdown Button and Options */}
      <div className="relative">
        {/* Dropdown Button */}
        <button
          onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
          className="relative border border-[#94A3B8] text-[#1E293B] w-[248px] h-[36px] rounded-[20px] px-4 flex items-center justify-between font-semibold xlg:w-[369px] xlg:h-[53.85px] xlg:rounded-[29.81px] xlg:text-[20px]"
        >
          {/* Display the currently selected option */}
          {selected}

          {/* Dropdown Icon (Arrow) */}
          <svg
            className={`absolute right-4 w-4 h-4 transition-transform ${
              isOpen ? "transform rotate-180" : "" // Rotate arrow when dropdown is open
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute z-10 w-[248px] mt-2 bg-white border border-[#94A3B8] rounded-[20px] shadow-lg">
            {options.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 cursor-pointer hover:bg-[#F8FAFC] rounded-[20px] text-center"
                onClick={() => {
                  onSelect(option); // Handle option selection
                  setIsOpen(false); // Close the dropdown after selection
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
