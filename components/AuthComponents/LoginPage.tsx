"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const t = useTranslations("Login"); //Login page translations object
  const v = useTranslations("AuthValidationMessages");
  const locale = useLocale();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setError(null); // Reset previous errors

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/", // Ensure correct callback URL
    });

    console.log("SignIn Result:", result); // Debugging

    if (result?.error) {
      toast.error(result.error);
      setError(result.error);
      return; // Exit early to avoid further execution
    }

    // ✅ Successful login
    console.log("Redirect URL:", result?.url); // Debugging
    locale === "ar"
      ? toast.success("تم تسجيل الدخول بنجاح!", { autoClose: 1000 })
      : toast.success("Successful Login!", { autoClose: 1000 });
    // 👈 Toast appears for 1 second

    setTimeout(() => {
      window.location.href = "/";
    }, 1000); // 👈 Redirect after 1 second
  };

  return (
    <div className="flex justify-center items-center my-8 px-4 md:px-10 md:my-12">
      <form
        className="flex flex-col justify-center items-center gap-6 w-full md:w-[480px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Title and subtitle */}
        <h2 className="text-3xl text-shadeBlack font-bold">{t("signin")}</h2>
        {/* Email Section */}
        <div className="w-full ">
          {/* Error Message */}
          {error && <p className="text-red-500 pb-2">{error}</p>}
          <InputField
            id="email"
            label={t("email")}
            type="email"
            {...register("email", {
              required: v("requiredEmail"),
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: v("invalidEmailFormat"),
              },
            })}
            error={errors.email?.message}
          />
        </div>

        {/* Password and forgot password Section */}
        <div className="w-full flex flex-col gap-2">
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
            })}
            error={errors.password?.message}
          />

          <Link
            href={`/${locale}/forgetpassword`}
            className="text-xs text-shadeBlack self-end"
          >
            {t("forgotpassword")}
          </Link>
        </div>

        {/* Submit Button*/}
        <CustomButton
          type="submit"
          label={isSubmitting ? t("submitting") : t("login")}
          disabled={isSubmitting}
        />

        {/* Register Redirect Section */}
        <div className="w-full flex justify-center items-center gap-2 mt-2">
          <p className="text-shadeBlack">{t("unregisterd")}</p>
          <Link
            href={`/${locale}/register`}
            className="font-bold text-shadeBlack"
          >
            {t("signup")}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
