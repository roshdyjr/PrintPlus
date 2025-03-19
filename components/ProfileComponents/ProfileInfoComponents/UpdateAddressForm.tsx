"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import SelectField from "@/components/SharedComponents/SelectField";
import PhoneInput from "@/components/SharedComponents/IntlTelInputField";
import { useTranslations } from "next-intl";

// Interface for the form data structure
interface UpdateAddressFormData {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  cityId: number;
  zipCode: string;
  mobileNo: string;
  mobileCode: string;
  mobileIso: string;
}

// Interface for city options in the dropdown
interface City {
  value: number;
  text: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const UpdateAddressForm = () => {
  const { data: session, status } = useSession();
  const [cities, setCities] = useState<City[]>([]);
  const t = useTranslations("ProfileNewAddress");
  const v = useTranslations("AuthValidationMessages")

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdateAddressFormData>({
    mode: "onChange",
    defaultValues: {
      mobileNo: "",
      mobileCode: "",
      mobileIso: "",
    },
  });

  // Fetch cities when the component mounts or session changes
  useEffect(() => {
    if (status === "authenticated" && session?.user?.token) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/cities/1`, {
            headers: {
              "Accept-Language": "ar-SA",
              Authorization: `Bearer ${session.user.token}`,
            },
          });

          if (response.data.success) {
            setCities(response.data.data);
            reset((prev) => ({
              ...prev,
              cityId: response.data.data[0]?.value,
            }));
          }
        } catch (error) {
          console.error("Failed to fetch cities:", error);
          toast.error("Failed to load the list of cities. Please try again.");
        }
      };

      fetchCities();
    }
  }, [session?.user?.token, status, reset]);

  // Handle form submission
  const onSubmit = async (data: UpdateAddressFormData) => {
    try {
      if (!session?.user?.token) {
        throw new Error("User token is missing. Please log in again.");
      }

      const response = await axios.post(`${API_BASE_URL}/addresses`, data, {
        headers: {
          "Accept-Language": "ar-SA",
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      console.log("Success:", response.data);
      toast.success("Address updated successfully!");
      reset();
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response) {
        toast.error(
          error.response.data?.message || "An error occurred, please try again."
        );
      } else if (error.request) {
        toast.error(
          "No response received from the server. Please check your internet connection."
        );
      } else {
        toast.error(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-6 xlg:gap-9"
      onSubmit={handleSubmit(onSubmit)}
    >
      <p className="text-lg font-semibold xlg:text-[24px]">{t("addressLg")}</p>

      {/* Full Name Field */}
      <InputField
        id="fullName"
        label={t("fullName")}
        {...register("fullName", { required: v("fullNameRequired") })}
        error={errors.fullName?.message}
      />

      {/* Address Line 1 Field */}
      <InputField
        id="addressLine1"
        label={t("address")}
        {...register("addressLine1", { required: v("fieldRequired") })}
        error={errors.addressLine1?.message}
      />

      {/* Phone Number Field */}
      <PhoneInput<UpdateAddressFormData>
        control={control}
        setValue={setValue}
        name="mobileNo"
        label={t("mobileNumber")}
      />

      {/* Address Line 2 Field (Optional) */}
      <InputField
        id="addressLine2"
        label={t("additionalInfo")}
        {...register("addressLine2")}
      />

      {/* Zip Code and City Fields */}
      <div className="flex items-center gap-2">
        <InputField
          id="zipCode"
          label={t("postCode")}
          {...register("zipCode", { required: v("fieldRequired") })}
          error={errors.zipCode?.message}
        />
        <SelectField
          id="cityId"
          label={t("city")}
          options={cities}
          {...register("cityId", { required: v("cityRequired") })}
          error={errors.cityId?.message}
        />
      </div>

      {/* Submit Button */}
      <CustomButton
        label={t("save")}
        className="md:!h-[32px] md:!w-[113px] xlg:!w-[169.5px] xlg:!h-[48px]"
        type="submit"
        disabled={!isValid}
      />
    </form>
  );
};

export default UpdateAddressForm;
