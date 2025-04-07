import { useState } from "react";

type Props = {
  quantity: number;
  onChange: (quantity: number) => void;
};

export default function QuantityDropdown({ quantity, onChange }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const quantities = [50, 100, 150, 200];

  return (
    <div className="relative inline-block text-left">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer px-3 border rounded-[20px] bg-white text-sm shadow-sm flex items-center justify-between w-[86px] h-[32px]"
      >
        {quantity}
        <svg
          className="w-4 h-4 ml-2 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-[80px] bg-white border rounded-lg shadow-md">
          {quantities.map((q) => (
            <li
              key={q}
              onClick={() => {
                onChange(q);
                setIsOpen(false);
              }}
              className={`px-3 py-1 text-sm hover:bg-gray-100 cursor-pointer ${
                q === quantity ? "font-semibold text-black" : "text-gray-700"
              }`}
            >
              {q}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
