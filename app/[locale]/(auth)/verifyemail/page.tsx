"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Extract token from URL query
  const email = searchParams.get("email"); // Extract email from URL query

  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isVerified, setIsVerified] = useState(false); // Track verification status
  const locale = useLocale();
  const t = useTranslations("VerifyEmail");

  useEffect(() => {
    if (token && email) {
      verifyEmail(); // Trigger email verification when token and email are available
    }
  }, [token, email]);

  const verifyEmail = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email`; // API endpoint

      const response = await axios.get(apiUrl, {
        params: { token, email }, // Pass token and email as query parameters
        headers: { "Accept-Language": locale === "ar" ? "ar-SA" : "en-US" }, // Set language header
      });

      if (response.status === 200) {
        setIsVerified(true); // Mark email as verified
        {locale === "ar" ? toast.success("تم التحقق من البريد الالكتروني بنجاح") : toast.success("Email verified successfully")}
         // Show success toast
      } else {
        throw new Error("Failed to verify email"); // Handle non-200 responses
      }
    } catch (error: any) {
      console.error("Verification error:", error); // Log error
      toast.error(
        error.response?.data?.message ||
          "An error occurred during verification."
      ); // Show error toast
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        {isLoading ? ( // Show loading message
          <p className="text-lg font-semibold">{t("verifying")}</p>
        ) : isVerified ? ( // Show success message
          <p className="text-lg font-semibold text-green-600">
            {t("verified")}
          </p>
        ) : (
          // Show error message
          <p className="text-lg font-semibold text-red-600">
            {t("notVerified")}
          </p>
        )}
      </div>
    </div>
  );
};

// Wrap VerifyEmail in Suspense to handle async query parameters
const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default VerifyEmailPage;
