import { useState } from "react";
import Paper_Type_1 from "/public/Paper_Type_1.svg";
import Paper_Type_2 from "/public/Paper_Type_2.svg";
import Image from "next/image";

const PaperTypeSelector = () => {
  const [paperType, setPaperType] = useState("");

  const paperOptions = [
    {
      type: "Glossy",
      description:
        "Features a shiny, reflective surface that enhances colors and contrast.",
    },
    {
      type: "Matte",
      description:
        "A smooth, non-reflective finish that provides a soft, elegant look.",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <label className="block text-[20px] font-semibold text-shadeBlack">
        Paper Type
      </label>

      <div className="flex flex-col gap-3 md:flex-row">
        {paperOptions.map(({ type, description }) => (
          <button
            key={type}
            className={`flex flex-col items-start p-4 border-2 rounded-[14px] text-left w-full md:w-[255px] h-auto md:h-[239px] ${
              paperType === type
                ? "border-[#6366F1] bg-white"
                : "border-gray-300"
            }`}
            onClick={() => setPaperType(type)}
          >
            <Image
              src={type === "Matte" ? Paper_Type_1 : Paper_Type_2}
              alt={type}
              className="h-[117px] w-[108px] self-center"
            />

            <span
              className={`mt-3 text-[16px] font-bold ${
                paperType === type ? "text-[#6366F1]" : "text-[#0F172A]"
              }`}
            >
              {type}
            </span>

            {/* Description */}
            <span className="text-[14px] text-[#94A3B8]">{description}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaperTypeSelector;
