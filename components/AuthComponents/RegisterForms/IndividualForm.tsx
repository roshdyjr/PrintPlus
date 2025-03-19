"use client";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import PhoneInput from "@/components/SharedComponents/IntlTelInputField";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PhoneFields } from "@/constants/Interfaces/UpdatePersonalDetails";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
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
  const locale = useLocale();
  const t = useTranslations("Register");
  const v = useTranslations("AuthValidationMessages");

  const onSubmit = async (data: IndividualRegisterFormData) => {
    try {
      setLoading(true);
      const { confirmPassword, ...requestData } = data;
      const response = await axios.post(
        `${API_BASE_URL}/auth/register`,
        requestData
      );
      locale === "ar"
        ? toast.success("تم الاشتراك بنجاح! برجاء تفقد بريدك الالكتروني.")
        : toast.success("Registration successful! Please check your email.");

      reset();
      router.push("login");
    } catch (error: any) {
      if (error.response) {
        toast.error(
          error.response.data?.message || "An error occurred, please try again."
        );
      } else if (error.request) {
        toast.error(
          "No response received from the server. Please check your internet connection."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 w-full md:w-[485px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-6 w-full">
        {/* Full Name Input */}
        <InputField
          id="fullName"
          label={t("fullName")}
          {...register("fullName", {
            required: v("fullNameRequired"),
            validate: (value) => {
              const words = value.trim().split(/\s+/);
              if (!(words.length === 2 || words.length === 3)) {
                return v("fullNameValid");
              }
              for (let word of words) {
                if (word.length < 2) return v("fullNameMinLength");
                if (!/^[A-Za-z\u0600-\u06FF]+$/.test(word)) {
                  return v("fullNameValid");
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
          label={t("email")}
          {...register("email", {
            required: v("requiredEmail"),
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: v("invalidEmailFormat"),
            },
          })}
          error={errors.email?.message}
        />

        <PhoneInput<IndividualRegisterFormData>
          control={control}
          setValue={setValue}
          name="mobileNo"
          label={t("mobileNumber")}
        />

        <input
          type="hidden"
          {...register("mobileCode", { required: "Country code is required" })}
        />
        <input
          type="hidden"
          {...register("mobileIso", {
            required: "Country ISO code is required",
            validate: (value) =>
              value.length === 2 || "ISO code must be exactly 2 letters",
          })}
        />

        {/* Password Input */}
        <InputField
          id="password"
          label={t("password")}
          type="password"
          {...register("password", {
            required: v("requiredPassword"),
            minLength: {
              value: 8,
              message: v("minLengthPassword"),
            },
            maxLength: {
              value: 64,
              message: v("maxLengthPassword"),
            },
            validate: {
              hasUppercase: (value) =>
                /[A-Z]/.test(value) || v("passwordUpperCase"),
              hasLowercase: (value) =>
                /[a-z]/.test(value) || v("PasswordLowerCase"),
              hasDigit: (value) => /\d/.test(value) || v("PasswordDigit"),
              hasSpecial: (value) =>
                /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                v("passwordSpecialChar"),
              noWhitespace: (value) => !/\s/.test(value) || v("passwordSpace"),
              notCommon: (value) =>
                ![
                  "password",
                  "123456",
                  "12345678",
                  "qwerty",
                  "abc123",
                ].includes(value.toLowerCase()) || v("passwordCommon"),
            },
          })}
          error={errors.password?.message}
        />

        {/* Confirm Password Input */}
        <InputField
          id="confirmpassword"
          label={t("confirmPassword")}
          type="password"
          {...register("confirmPassword", {
            required: v("confirmPasswordRequired"),
            validate: (value) =>
              value === watch("password") || v("confirmPasswordMatch"),
          })}
          error={errors.confirmPassword?.message}
        />
      </div>

      <CustomButton
        label={loading ? t("submitting") : t("signup")}
        type="submit"
        className="mt-6"
        disabled={!isValid || loading}
      />
    </form>
  );
};

export default IndividualForm;
