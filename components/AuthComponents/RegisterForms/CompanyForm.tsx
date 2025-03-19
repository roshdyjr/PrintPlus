"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import { useRouter } from "next/navigation";
import SelectField from "@/components/SharedComponents/SelectField";
import PhoneInput from "@/components/SharedComponents/IntlTelInputField";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

// Interface defining the structure of the form data for company registration
interface CompanyRegisterFormData {
  fullName: string;
  email: string;
  mobileNo: string;
  mobileCode: string;
  mobileIso: string;
  cityId: number;
  password: string;
  accountType: number;
  confirmPassword?: string;
  companyName: string;
  vatNumber: string;
  vatName: string;
  vatAddress: string;
}

// Interface defining the structure of city options
interface City {
  value: number;
  text: string;
}

// Base URL for API requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Default values for the form fields
const defaultValues: CompanyRegisterFormData = {
  fullName: "",
  email: "",
  mobileNo: "",
  mobileCode: "",
  mobileIso: "",
  password: "",
  cityId: 2,
  accountType: 2,
  companyName: "",
  vatNumber: "",
  vatName: "",
  vatAddress: "",
};

const CompanyForm = () => {
  // State for loading indicator and city options
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Register");
  const v = useTranslations("AuthValidationMessages");

  // React Hook Form methods for form management
  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<CompanyRegisterFormData>({ defaultValues, mode: "onChange" });

  // Watch the companyName field to sync it with the fullName field
  const companyName = watch("companyName");

  // Effect to sync the fullName field with the companyName field
  useEffect(() => {
    setValue("fullName", companyName);
  }, [companyName, setValue]);

  // Effect to fetch cities from the API on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cities/1`, {
          headers: { "Accept-Language": "ar-SA" },
        });
        if (response.data.success) {
          setCities(response.data.data);
          reset({ cityId: response.data.data[0]?.value });
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast.error("Failed to load cities. Please try again.");
      }
    };
    fetchCities();
  }, [setValue, reset]);

  // Form submission handler
  const onSubmit = async (data: CompanyRegisterFormData) => {
    try {
      setLoading(true);
      // Remove confirmPassword from the data before sending the request
      const { confirmPassword, ...requestData } = {
        ...data,
        accountType: 2,
      };

      // Send registration request to the API
      await axios.post(`${API_BASE_URL}/auth/register`, requestData);
      locale === "ar"
        ? toast.success("تم الاشتراك بنجاح! برجاء تفقد بريدك الالكتروني.")
        : toast.success("Registration successful! Please check your email.");
      reset();
      router.push("/login");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 mx-4 lg:mx-[79px] w-full justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-[50px] lg:gap-[132px] w-full">
        {/* Left Column */}
        <div className="flex flex-col gap-6 w-full">
          {/* Company Name Input */}
          <InputField
            id="companyName"
            label={t("fullName")}
            {...register("companyName", {
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
            error={errors.companyName?.message}
          />

          {/* Email Input */}
          <InputField
            id="email"
            label={t("email")}
            {...register("email", {
              required: v("requiredEmail"),
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: v("invalidEmailFormat"),
              },
            })}
            error={errors.email?.message}
          />

          {/* Phone Number Input */}
          <PhoneInput<CompanyRegisterFormData>
            control={control}
            setValue={setValue}
            name="mobileNo"
            label={t("mobileNumber")}
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
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) || v("passwordUpperCase"),
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) || v("passwordLowerCase"),
                hasDigit: (value) => /\d/.test(value) || v("passwordDigit"),
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  v("passwordSpecialChar"),
                noWhiteSpace: (value) =>
                  !/\s/.test(value) || v("passwordSpace"),
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
            id="confirmPassword"
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

        {/* Right Column */}
        <div className="flex flex-col gap-6 w-full">
          {/* City Select Field */}
          <SelectField
            id="cityId"
            label={t("city")}
            options={cities}
            register={register("cityId", { required: v("cityRequired") })}
            error={errors.cityId?.message}
          />

          {/* Tax Number Input */}
          <InputField
            id="vatNumber"
            label={t("taxNumber")}
            {...register("vatNumber", { required: v("vatNumberRequired") })}
            error={errors.vatNumber?.message}
          />

          {/* Tax Name Input */}
          <InputField
            id="vatName"
            label={t("taxName")}
            {...register("vatName", { required: v("vatNameRequired") })}
            error={errors.vatName?.message}
          />

          {/* Tax Address Input */}
          <InputField
            id="vatAddress"
            label={t("taxAddress")}
            {...register("vatAddress", { required: v("vatAddressRequired") })}
            error={errors.vatAddress?.message}
          />
        </div>
      </div>

      {/* Hidden fields for mobile code and ISO */}
      <input
        type="hidden"
        {...register("mobileCode", { required: "Country code is required" })}
      />
      <input
        type="hidden"
        {...register("mobileIso", {
          required: "Country ISO code is required",
          validate: (value) =>
            value.length === 2 || "ISO code must be exactly 2 characters",
        })}
      />

      {/* Submit Button */}
      <div className="w-full">
        <CustomButton
          label={loading ? t("submitting") : t("signup")}
          type="submit"
          className="mt-6"
          disabled={!isValid || loading}
        />
      </div>
    </form>
  );
};

export default CompanyForm;
