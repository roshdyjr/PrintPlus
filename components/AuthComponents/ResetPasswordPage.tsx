"use client";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocale, useTranslations } from "next-intl";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const t = useTranslations("ResetPassword");
  const v = useTranslations("AuthValidationMessages");
  const locale = useLocale();

  // Extract token and email from the URL
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  // Disable the button if any field is empty
  const isDisabled = password.trim() === "" || confirmPassword.trim() === "";

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate password and confirm password
    if (password !== confirmPassword) {
      {
        locale === "ar"
          ? setMessage("كلمة المرور وتأكيد كلمة المرور غير متطابقين.")
          : setMessage("Password and confirm password do not match.");
      }
      return;
    }

    try {
      // Call the reset password API
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`,
        {
          email: email,
          token: token,
          newPassword: password,
        },
        {
          headers: {
            "Accept-Language": locale === "ar" ? "ar-SA" : "en-US",
          },
        }
      );

      if (response.data.success) {
        {
          locale === "ar"
            ? setMessage("تم اعادة تعيين كلمة المرور بنجاح.")
            : setMessage("Password reset successfully.");
        }
        setIsSuccessful(true);
        {
          locale === "ar"
            ? toast.success("تم اعادة تعيين كلمة المرور بنجاح.")
            : toast.success("Password reset successfully.");
        }
      } else {
        setMessage(response.data.message || "Failed to reset password.");
        toast.error(response.data.message || "Failed to reset password.");
      }
    } catch (error: any) {
      console.error("Error:", error);

      if (error.response) {
        setMessage(error.response.data.message || "An error occurred.");
        toast.error(error.response.data.message || "An error occurred.");
      } else if (error.request) {
        setMessage("No response received from the server.");
        toast.error("No response received from the server.");
      } else {
        setMessage("An unexpected error occurred.");
        toast.error("An unexpected error occurred.");
      }
    }
  };

  // Function to navigate to the login page
  const handleNavigate = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center my-8 md:my-12">
      {!isSuccessful && (
        <div className="flex flex-col justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center gap-6 md:min-w-[480px]">
            <h2 className="text-3xl text-shadeBlack font-bold">
              {t("chooseNewPassword")}
            </h2>
            <p className="text-shadeBlack">{t("createNewPassword")}</p>
            <form
              className="w-full flex flex-col items-center gap-6"
              onSubmit={handleSubmit}
            >
              {/* Password Input */}
              <InputField
                id="password"
                label={t("password")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Confirm Password Input */}
              <InputField
                id="confirmPassword"
                label={t("confirmPassword")}
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* Reset Password Button */}
              <CustomButton
                label={t("changePassword")}
                type="submit"
                disabled={isDisabled}
                className="w-[315px]"
              />

              {/* Link to Login Page */}
              <Link href={`/${locale}/login`} className="font-bold text-shadeBlack mt-2">
                {t("login")}
              </Link>

              {/* Display Message */}
              {message && (
                <div className="mt-4 text-[#4B5563] font-medium">{message}</div>
              )}
            </form>
          </div>
        </div>
      )}

      {isSuccessful && (
        <div className="gap-6 flex justify-center items-center flex-col">
          <div className="flex justify-center items-center">
            <p className="font-bold text-2xl text-shadeBlack">
              {t("passwordUpdated")}
            </p>
          </div>
          <p className="text-shadeBlack">{t("successfulUpdate")}</p>
          <CustomButton label={t("login")} onClick={handleNavigate} />
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
