"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import PhoneInput from "@/components/SharedComponents/IntlTelInputField";
import { PhoneFields } from "@/constants/Interfaces/UpdatePersonalDetails"; 

// Extend the PhoneFields interface to include fullName for the update details form.
interface UpdatePersonalDetails extends PhoneFields {
  fullName: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const PersonalDetailsForm = () => {
  const { data: session } = useSession();

  // Initialize react-hook-form with default values. Using mode: "onChange" 
  // to validate form fields as soon as they change.
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdatePersonalDetails>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      mobileNo: "",
      mobileCode: "",
      mobileIso: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect to fetch personal details from the API when the user is logged in.
  // After fetching, we reset the form with the retrieved details.
  useEffect(() => {
    if (session?.user?.token) {
      const fetchPersonalDetails = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/users/get`, {
            headers: {
              "Accept-Language": "ar-SA",
              Authorization: `Bearer ${session.user.token}`,
            },
          });
          if (response.data.success) {
            const details = response.data.data;
            // Reset the form with fetched details so that the fields are populated.
            reset({
              fullName: details.fullName,
              mobileNo: details.mobile,
              mobileCode: details.mobileCode,
              mobileIso: details.mobileIso,
            });
          }
        } catch (error) {
          console.error("Failed to fetch personal details:", error);
          toast.error("Failed to load personal details");
        }
      };
      fetchPersonalDetails();
    }
  }, [session?.user?.token, reset]);

  // onSubmit handler to update personal details.
  // This function sends the form data to the update-info endpoint.
  const onSubmit = async (data: UpdatePersonalDetails) => {
    try {
      setIsSubmitting(true);
      // Ensure user token exists, otherwise throw an error.
      if (!session?.user?.token) {
        throw new Error("User token is missing. Please log in again.");
      }
      // Send a POST request with the updated details.
      await axios.post(`${API_BASE_URL}/users/update-info`, data, {
        headers: {
          "Accept-Language": "ar-SA",
          Authorization: `Bearer ${session.user.token}`,
        },
      });
      toast.success("تم تحديث البيانات بنجاح!");
      reset();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ غير متوقع، حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-lg font-semibold">Personal Details</p>

      {/* Full Name Input Field */}
      <InputField
        id="fullName"
        label="Full Name"
        {...register("fullName", {
          required: "Full Name is required",
          pattern: {
            value:
              /^(([A-Za-z\u0621-\u064A]{2,})\s+([A-Za-z\u0621-\u064A]{2,})(\s+([A-Za-z\u0621-\u064A]{2,}))?)$/,
            message:
              "Full name must be in 'First Last' or 'First Middle Last' format and contain valid characters.",
          },
          validate: (value) => {
            // Validate that each word in the full name has at least 2 characters.
            const words = value.trim().split(/\s+/);
            if (words.some((w) => w.length < 2)) {
              return "Each word must be at least two characters.";
            }
            return true;
          },
        })}
        error={errors.fullName?.message}
      />

      {/* PhoneInput component handles phone number input and splits the number from its dial code */}
      <PhoneInput<UpdatePersonalDetails>
        control={control}
        setValue={setValue}
        name="mobileNo"
        label="Mobile Number*"
      />

      {/* Hidden fields to store mobileCode and mobileIso separately.
          These fields are needed so that the API receives the dial code and ISO code independently. */}
      <input type="hidden" {...register("mobileCode", { required: "Country code is required" })} />
      <input
        type="hidden"
        {...register("mobileIso", {
          required: "Country ISO code is required",
          validate: (value) => value.length === 2 || "ISO code must be exactly 2 letters",
        })}
      />

      <CustomButton
        label={isSubmitting ? "Saving..." : "Save"}
        className="md:!h-[32px] md:!w-[113px]"
        type="submit"
        disabled={!isValid || isSubmitting}
      />
    </form>
  );
};

export default PersonalDetailsForm;
