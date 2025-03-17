import { useLocale } from "next-intl";
import React, { useState, useRef, useEffect } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa";

interface SelectFieldProps {
  id: string;
  label: string;
  options: { value: number | string; text: string }[];
  register?: UseFormRegisterReturn;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  options,
  register,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    value: number | string;
    text: string;
  } | null>(options[0] || null); // Set the first option as the default selected option
  const dropdownRef = useRef<HTMLDivElement>(null);

  const locale = useLocale();

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle option selection
  const handleOptionClick = (option: {
    value: number | string;
    text: string;
  }) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (register?.onChange) {
      register.onChange({ target: { value: option.value } });
    }
  };

  return (
    <div className="flex flex-col justify-start items-start w-full gap-1 relative xlg:gap-[6px]">
      <label
        htmlFor={id}
        className="font-bold text-shadeGray text-sm xlg:text-[20px]"
      >
        {label}
      </label>
      <div className="relative w-full" ref={dropdownRef}>
        {/* Custom Select Trigger */}
        <div
          className="border border-borderColor h-[48px] md:h-[36px] rounded-lg text-sm focus:outline-none w-full py-2 ps-2 flex items-center justify-between cursor-pointer xlg:text-[20px] xlg:rounded-[12px] xlg:border-[1.5px] xlg:h-[54px] xlg:ps-[15px] xlg:py-[9px]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>
            {selectedOption ? selectedOption.text : locale === "ar" ? "اختر من القائمة": "Select an option"}
          </span>
          <FaChevronDown className={`absolute top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none ${locale === "ar" ? "left-4" : "right-4"}`} />
        </div>

        {/* Custom Dropdown Options */}
        {isOpen && (
          <div
            className="absolute z-10 w-full bg-white border border-borderColor rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto"
            style={{ width: dropdownRef.current?.clientWidth }} // Match the width of the select field
          >
            {options.map((option) => (
              <div
                key={option.value}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-lg xlg:text-[24px]"
                onClick={() => handleOptionClick(option)}
              >
                {option.text}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectField;
