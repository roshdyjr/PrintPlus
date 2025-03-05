"use client"; 

import React, { useState, useRef } from "react"; 
import { Controller, Control } from "react-hook-form"; // Importing react-hook-form components
import IntlTelInput from "intl-tel-input/reactWithUtils"; // Importing the phone input library
import "intl-tel-input/styles"; // Importing styles for phone input
import { UseFormSetValue } from "react-hook-form"; // Importing a type from react-hook-form

// Error messages mapped to specific validation errors

const errorMap = [
    "Invalid number",
    "Invalid country code",
    "Too short",
    "Too long",
    "Invalid number",
  ];

interface PhoneInputProps {
  control: Control<UpdatePersonalDetails>; // React Hook Form's control prop
  name?: keyof UpdatePersonalDetails; // Field name (default is mobileNo)
  setValue: UseFormSetValue<UpdatePersonalDetails>; // Function to update field values
  rules?: any; // Validation rules for the input field
  label?: string; // Label for the input field
}

const initialCountry = "sa"; // Default country code (Saudi Arabia)

const PhoneInput: React.FC<PhoneInputProps> = ({
  control,
  name = "mobileNo", // Default field name
  setValue,
  rules,
  label = "Phon number ", // Default label
}) => {
  const telInputRef = useRef<any>(null); // Ref for accessing the phone input instance
  const [isValidPhone, setIsValidPhone] = useState(false); // State for phone number validity
  const [errorCode, setErrorCode] = useState<number | null>(null); // State for storing validation error codes

  return (
    <Controller
      name={name} // Field name
      control={control} // Form control prop
      rules={{
        required: " Phon number is required ", // Required field validation message
        validate: () => {
          if (!isValidPhone) {
            return errorCode !== null
              ? errorMap[errorCode] // Display appropriate error message
              : "Invalid phone number format"; // Default error message
          }
          return true; // Valid input
        },
        ...rules, // Additional validation rules
      }}
      render={({ field, fieldState, formState: { touchedFields } }) => {
        const showError = touchedFields[name] && fieldState.error; // Determine if an error should be shown

        return (
          <div className="flex flex-col justify-start items-start w-full gap-1">
            {/* Input label */}
            <label htmlFor="phone-input" className="font-bold text-shadeGray text-sm">
              {label}
            </label>
            <div className="relative w-full">
              <div
                className={`flex flex-row border ${
                  showError ? "border-[#FB7185]" : "border-borderColor"
                } rounded-lg h-[40px]`}
              >
                <IntlTelInput
                  ref={telInputRef} // Assigning ref to access component functions
                  initialValue={field.value} // Initial input value
                  onChangeNumber={(num: string) => {
                    field.onChange(num); // Update field value in form
                    if (telInputRef.current) {
                      const instance = telInputRef.current.getInstance();
                      if (instance) {
                        const countryData = instance.getSelectedCountryData();
                        // Set country dial code and ISO code
                        setValue("mobileCode", `+${countryData.dialCode}`);
                        setValue(
                          "mobileIso",
                          countryData.iso2 ? countryData.iso2.toUpperCase() : ""
                        );
                      }
                    }
                  }}
                  onChangeValidity={(valid: boolean) => setIsValidPhone(valid)} // Update validity state
                  onChangeErrorCode={(code: number | null) => setErrorCode(code)} // Update error code state
                  initOptions={{
                    initialCountry: initialCountry, // Default country
                    autoInsertDialCode: true, // Automatically insert country dial code
                    separateDialCode: false, // Keep the country code in the input field
                    nationalMode: false, // Use full international number format
                    autoHideDialCode: false, // Always show country code
                    formatOnDisplay: true, // Format number as user types
                    validationNumberType: ["MOBILE", "FIXED_LINE_OR_MOBILE"], // Validate for mobile or fixed-line numbers
                    utilsScript:
                      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Utility script for additional formatting
                  } as any}
                  inputProps={{
                    id: "phone-input",
                    onBlur: field.onBlur, // Handle input blur event
                    className:
                      "border-none h-[40px] text-left self-center ml-2 w-full focus:outline-none placeholder:text-[#525252] bg-transparent",
                  }}
                />
              </div>
              {/* Display error message if validation fails */}
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