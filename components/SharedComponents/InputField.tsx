"use client";
import { useLocale } from "next-intl";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  register?: any;
  isPhoneInput?: boolean;
  error?: string;
  onPhoneChange?: (phone: string, countryData: any) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  register,
  isPhoneInput = false,
  error,
  onPhoneChange,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const locale = useLocale();

  return (
    <div className="flex flex-col justify-start items-start w-full gap-1 xlg:gap-[6px]">
      <label
        htmlFor={id}
        className="font-bold text-shadeGray text-sm xlg:text-[20px]"
      >
        {label}
      </label>
      <div className="relative w-full">
        {isPhoneInput ? (
          <div className="flex flex-row-reverse border border-borderColor rounded-lg h-[48px] md:h-auto">
            <PhoneInput
              country={"sa"} // Default country (Saudi Arabia)
              enableSearch={true}
              enableAreaCodes={false}
              value={phoneNumber}
              onChange={(phone, country) => {
                setPhoneNumber(phone);
                onPhoneChange && onPhoneChange(phone, country);
              }}
              inputClass="!border-0 text-left self-center !ml-2 !w-full !focus:outline-none !placeholder:text-[#525252] !bg-transparent"
              containerClass="w-full flex"
              buttonClass="!bg-transparent !w-[79px] !ps-4"
              dropdownClass="!bg-white !border !border-[#E3E3E3] !rounded-md"
              dropdownStyle={{
                position: "absolute",
                top: "auto", // Adjust based on available space
                bottom: "100%", // Open upwards
                left: 0,
                zIndex: 9999,
              }}
            />
          </div>
        ) : (
          <>
            <input
              type={type === "password" && showPassword ? "text" : type}
              id={id}
              placeholder={placeholder}
              value={value}
              {...register}
              {...rest}
              className="border border-borderColor h-[48px] md:h-[36px] rounded-lg focus:outline-none placeholder:text-[#525252] w-full py-2 ps-2 xlg:text-[20px] xlg:rounded-[12px] xlg:border-[1.5px] xlg:h-[54px] xlg:ps-[15px] xlg:py-[9px] xlg:placeholder:text-[20px]"
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute flex items-center text-gray-500 ${
                  error ? "top-2" : "inset-y-0"
                } ${locale === "ar" ? "left-3" : "right-3"}`}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default InputField;
