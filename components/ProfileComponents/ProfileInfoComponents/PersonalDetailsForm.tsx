"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import PhoneInput from "@/components/SharedComponents/IntlTelInputField";
interface UpdatePersonalDetails {
  fullName: string;
  mobileNo: string;
  mobileCode: string;
  mobileIso: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const PersonalDetailsForm = () => {
  const { data: session } = useSession();
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
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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
            reset({
              fullName: details.fullName,
              mobileNo: details.mobile,
              mobileCode: details.mobileCode,
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

  const onSubmit = async (data: UpdatePersonalDetails) => {
    try {
      setIsSubmitting(true);
      if (!session?.user?.token) {
        throw new Error("User token is missing. Please log in again.");
      }
      const requestData = { ...data };

      await axios.post(`${API_BASE_URL}/users/update-info`, requestData, {
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
            const words = value.trim().split(/\s+/);
            if (words.some((w) => w.length < 2)) {
              return "Each word must be at least two characters.";
            }
            return true;
          },
        })}
        error={errors.fullName?.message}
      />

      {/* Phone input */}
      <PhoneInput control={control} setValue={setValue} />

      {/* Hidden fields for mobileCode and mobileIso */}
      <input
        type="hidden"
        {...register("mobileCode", { required: "Country code is required" })}
      />
      <input
        type="hidden"
        {...register("mobileIso", {
          required: "ISO code is required",
          validate: {
            length: (value) =>
              value.length === 2 || "ISO code must be exactly two letters",
          },
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