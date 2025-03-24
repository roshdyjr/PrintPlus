import { useState } from "react";
import Image from "next/image";
import ServiceOptions_1 from "/public/ServiceOptions_1.svg";
import ServiceOptions_2 from "/public/ServiceOptions_2.svg";

export default function ServiceOptions() {
  // State to manage whether installation service is selected
  const [installation, setInstallation] = useState(false);

  // State to manage whether size adjustment service is selected
  const [sizeAdjustment, setSizeAdjustment] = useState(false);

  return (
    <div className="flex flex-col gap-[35.78px]">
      {/* Installation Service Section */}
      <div className="flex flex-col gap-[20.87px]">
        {/* Installation Service Checkbox and Details */}
        <label
          className={`flex items-start py-[17.98px] px-[26.83px] rounded-[6px] cursor-pointer gap-6 ${
            installation ? "bg-[#6366F129]" : "bg-[#0000000D]"
          }`}
        >
          {/* Hidden Checkbox Input */}
          <input
            type="checkbox"
            checked={installation}
            onChange={() => setInstallation(!installation)}
            className="hidden"
          />
          {/* Checkbox and Content Container */}
          <div className="flex items-start w-full gap-3">
            {/* Custom Checkbox */}
            <div
              className={`w-5 h-5 flex items-center justify-center border rounded-md my-auto xlg:w-[32px] xlg:h-[32px] ${
                installation
                  ? "bg-[#6366F1] border-[#6366F1]"
                  : "border-gray-400"
              }`}
            >
              {/* Checkmark (✔) when selected */}
              {installation && <span className="text-xs text-white">✔</span>}
            </div>

            {/* Service Details */}
            <div className="flex-1">
              {/* Service Title and Icon */}
              <p className="flex items-center gap-2 font-semibold xlg:text-[20px]">
                <Image
                  src={ServiceOptions_1}
                  alt="Installation Service"
                  className="w-[20px] h-[20px] xlg:w-[30px] xlg:h-[30px]"
                />
                Installation Service
              </p>

              {/* Service Description */}
              <p className="text-sm text-[#191919] xlg:text-base">
                We install what has been purchased accurately and
                professionally.
              </p>
            </div>

            {/* Service Price */}
            <span className="my-auto font-semibold text-[#191919] xlg:text-[20px]">
              45 SAR
            </span>
          </div>
        </label>

        {/* Delivery and Installation Note */}
        <div className="px-4 pb-4 text-gray-700 border-b border-gray-300">
          <p>
            • Delivery and installation are estimated for{" "}
            <span className="font-semibold">Riyadh</span>
          </p>
        </div>
      </div>

      {/* Size Adjustment Service Section */}
      <label
        className={`flex items-start py-[17.98px] px-[26.83px] rounded-[4px] cursor-pointer ${
          sizeAdjustment ? "bg-[#6366F129]" : "bg-[#0000000D]"
        }`}
      >
        {/* Hidden Checkbox Input */}
        <input
          type="checkbox"
          checked={sizeAdjustment}
          onChange={() => setSizeAdjustment(!sizeAdjustment)}
          className="hidden"
        />

        {/* Checkbox and Content Container */}
        <div className="flex items-start w-full gap-3">
          {/* Custom Checkbox */}
          <div
            className={`w-5 h-5 flex items-center justify-center border rounded-md my-auto xlg:w-[32px] xlg:h-[32px] ${
              sizeAdjustment
                ? "bg-[#6366F1] border-[#6366F1]"
                : "border-gray-400"
            }`}
          >
            {/* Checkmark (✔) when selected */}
            {sizeAdjustment && <span className="text-xs text-white">✔</span>}
          </div>

          {/* Service Details */}
          <div className="flex-1">
            {/* Service Title and Icon */}
            <p className="flex items-center gap-2 font-semibold xlg:text-[20px]">
              <Image
                src={ServiceOptions_2}
                alt="Size Adjustment Service"
                className="w-[20px] h-[20px] xlg:w-[30px] xlg:h-[30px]"
              />
              Size Adjustment Service
            </p>

            {/* Service Description */}
            <p className="text-sm text-[#191919] xlg:text-base">
              We review the dimensions of your design and make adjustments to
              ensure print quality and accuracy.
            </p>
          </div>

          {/* Service Price */}
          <span className="font-semibold text-[#191919] xlg:text-[20px] self-center">
            15 SAR
          </span>
        </div>
      </label>
    </div>
  );
}
