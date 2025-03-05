"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import PhoneInput from "@/components/SharedComponents/IntlTelInputField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PhoneFields } from "@/constants/Interfaces/UpdatePersonalDetails"; ; 

interface IndividualRegisterFormData extends PhoneFields {
  fullName: string;
  email: string;
  cityId: number;
  password: string;
  accountType: number;
  confirmPassword?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const defaultValues: IndividualRegisterFormData = {
  fullName: "",
  email: "",
  mobileNo: "",
  mobileCode: "",
  mobileIso: "",
  password: "",
  cityId: 2,
  accountType: 1,
};

const IndividualForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<IndividualRegisterFormData>({ defaultValues, mode: "onChange" });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: IndividualRegisterFormData) => {
    try {
      setLoading(true);
      const { confirmPassword, ...requestData } = data;
      const response = await axios.post(`${API_BASE_URL}/auth/register`, requestData);
      toast.success("Registration successful! Please check your email.");
      reset();
      router.push("login");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data?.message || "An error occurred, please try again.");
      } else if (error.request) {
        toast.error("No response received from the server. Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6 w-full md:w-[485px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6 w-full">
        {/* Full Name Input */}
        <InputField
          id="fullName"
          label="Full name*"
          {...register("fullName", {
            required: "Full name is required.",
            validate: (value) => {
              const words = value.trim().split(/\s+/);
              if (!(words.length === 2 || words.length === 3)) {
                return 'Full name must be in the format "First Last" or "First Middle Last" and contain valid characters.';
              }
              for (let word of words) {
                if (word.length < 2) return "Each word in the full name must be at least 2 characters long.";
                if (!/^[A-Za-z\u0600-\u06FF]+$/.test(word)) {
                  return 'Full name must be in the format "First Last" or "First Middle Last" and contain valid characters.';
                }
              }
              return true;
            },
          })}
          error={errors.fullName?.message}
        />

        {/* Email Input */}
        <InputField
          id="email"
          label="Email*"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
          error={errors.email?.message}
        />

        <PhoneInput<IndividualRegisterFormData>
          control={control}
          setValue={setValue}
          name="mobileNo"
          label="Mobile Number*"
        />

        <input type="hidden" {...register("mobileCode", { required: "Country code is required" })} />
        <input
          type="hidden"
          {...register("mobileIso", {
            required: "Country ISO code is required",
            validate: (value) => value.length === 2 || "ISO code must be exactly 2 letters",
          })}
        />

        {/* Password Input */}
        <InputField
          id="password"
          label="Password*"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters long" },
            maxLength: { value: 64, message: "Password must not exceed 64 characters" },
            validate: {
              hasUppercase: (value) =>
                /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
              hasLowercase: (value) =>
                /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
              hasDigit: (value) =>
                /\d/.test(value) || "Password must contain at least one digit",
              hasSpecial: (value) =>
                /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character",
              noWhitespace: (value) =>
                !/\s/.test(value) || "Password must not contain spaces",
              notCommon: (value) =>
                !["password", "123456", "12345678", "qwerty", "abc123"].includes(value.toLowerCase()) ||
                "Password is too common and easy to guess",
            },
          })}
          error={errors.password?.message}
        />

        {/* Confirm Password Input */}
        <InputField
          id="confirmpassword"
          label="Confirm Password*"
          type="password"
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message}
        />
      </div>

      <CustomButton
        label={loading ? "Signing up..." : "Sign up"}
        type="submit"
        className="mt-6"
        disabled={!isValid || loading}
      />
    </form>
  );
};

export default IndividualForm;
