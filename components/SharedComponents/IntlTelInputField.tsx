"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Controller,
  Control,
  UseFormSetValue,
  Path,
  useWatch,
} from "react-hook-form";
import dynamic from "next/dynamic";
import "intl-tel-input/styles";
import { PhoneFields } from "@/constants/Interfaces/UpdatePersonalDetails";
import { useLocale } from "next-intl";

// Dynamically import IntlTelInput with SSR disabled
const IntlTelInput = dynamic(() => import("intl-tel-input/reactWithUtils"), {
  ssr: false,
});

interface PhoneInputProps<T extends PhoneFields> {
  control: Control<T>;
  name?: keyof T;
  setValue: UseFormSetValue<T>;
  rules?: any;
  label?: string;
}

const errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

const initialCountry = "sa";

const PhoneInput = <T extends PhoneFields>({
  control,
  name = "mobileNo" as keyof T,
  setValue,
  rules,
  label = "Phone number",
}: PhoneInputProps<T>) => {
  const telInputRef = useRef<any>(null);
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const watchedMobileCode = useWatch({
    control,
    name: "mobileCode" as Path<T>,
  });

  const locale = useLocale();

  return (
    <Controller
      name={name as unknown as Path<T>}
      control={control}
      rules={{
        required: "Phone number is required",
        validate: () => {
          // Validation logic: Checks if the phone number is valid, otherwise returns an appropriate error message
          if (!isValidPhone) {
            return errorCode !== null
              ? errorMap[errorCode]
              : "Invalid phone number format";
          }
          return true;
        },
        ...rules,
      }}
      render={({ field, fieldState, formState: { touchedFields } }) => {
        useEffect(() => {
          // Ensures that when the field value changes, the intl-tel-input instance updates accordingly
          if (telInputRef.current && field.value) {
            const instance = telInputRef.current.getInstance();
            if (instance) {
              const dialCode = watchedMobileCode || "";
              const fullNumber = dialCode
                ? `${dialCode}${field.value}`
                : field.value;
              instance.setNumber(fullNumber);
            }
          }
        }, [field.value, watchedMobileCode]);

        const showError =
          touchedFields[name as unknown as Path<T>] && fieldState.error;

        return (
          <div className="flex flex-col justify-start items-start w-full gap-1 xlg:gap-[6px]">
            <label
              htmlFor="phone-input"
              className="font-bold text-shadeGray text-sm xlg:text-[20px]"
            >
              {label}
            </label>
            <div className="relative w-full">
              <div
                className={`flex items-center border xlg:text-[20px] xlg:rounded-[12px] xlg:border-[1.5px] xlg:h-[54px] xlg:ps-[15px] xlg:py-[9px] xlg:placeholder:text-[20px] ${
                  showError ? "border-[#FB7185]" : "border-borderColor"
                } rounded-lg h-[40px] ${
                  locale === "ar" ? "flex-row" : "flex-row"
                }`}
              >
                {typeof window !== "undefined" && (
                  <IntlTelInput
                    ref={telInputRef}
                    initialValue={field.value}
                    onChangeNumber={() => {
                      // Handles phone number change: extracts country code and national number separately
                      if (telInputRef.current) {
                        const instance = telInputRef.current.getInstance();
                        if (instance) {
                          const countryData = instance.getSelectedCountryData();
                          setValue(
                            "mobileCode" as unknown as Path<T>,
                            `+${countryData.dialCode}` as any
                          );
                          setValue(
                            "mobileIso" as unknown as Path<T>,
                            countryData.iso2
                              ? (countryData.iso2.toUpperCase() as any)
                              : ""
                          );
                          const fullNumber = instance
                            .getNumber()
                            ?.replace(/\s+/g, "");
                          const dialCode = `+${countryData.dialCode}`;
                          let nationalNumber = fullNumber || "";
                          if (fullNumber && fullNumber.startsWith(dialCode)) {
                            nationalNumber = fullNumber.substring(
                              dialCode.length
                            );
                          }
                          field.onChange(nationalNumber);
                        }
                      }
                    }}
                    onChangeValidity={(valid: boolean) =>
                      setIsValidPhone(valid)
                    } // Updates phone validation state
                    onChangeErrorCode={(code: number | null) =>
                      setErrorCode(code)
                    } // Captures error code if validation fails
                    initOptions={
                      {
                        initialCountry: initialCountry,
                        separateDialCode: true,
                        nationalMode: false,
                        autoHideDialCode: false,
                        autoInsertDialCode: true,
                        formatOnDisplay: true,
                        validationNumberType: [
                          "MOBILE",
                          "FIXED_LINE_OR_MOBILE",
                        ], // Ensures only valid phone types are accepted
                        utilsScript:
                          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                      } as any
                    }
                    inputProps={{
                      id: "phone-input",
                      onBlur: field.onBlur,
                      className: `border-none h-[40px] self-center ms-2 w-full focus:outline-none placeholder:text-[#525252] bg-transparent ${
                        locale === "ar" ? "text-right" : "text-left"
                      }`,
                    }}
                  />
                )}
              </div>
              {showError && (
                <p className="error-message text-red-500 text-sm">
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          </div>
        );
      }}
    />
  );
};

export default PhoneInput;
