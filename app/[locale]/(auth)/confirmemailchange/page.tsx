"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";

const ConfirmEmailChange = () => {
  const { data: session } = useSession(); // Get the user session
  const searchParams = useSearchParams(); // Access query parameters
  const token = searchParams.get("token"); // Extract token from URL
  const newEmail = decodeURIComponent(searchParams.get("newEmail") || ""); // Extract and decode newEmail from URL
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isConfirmed, setIsConfirmed] = useState(false); // Track confirmation status
  const locale = useLocale(); // Get current locale
  const t = useTranslations("ConfirmEmailChange"); // Translation function

  useEffect(() => {
    if (token && newEmail) {
      confirmEmailChange(); // Trigger confirmation if token and newEmail are available
    } else {
      toast.error("Invalid confirmation link. Please try again.");
      setIsLoading(false);
    }
  }, [token, newEmail]);

  const confirmEmailChange = async () => {
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/confirm-email-change`;

      // Make the API request to confirm the email change
      const response = await axios.get(apiUrl, {
        params: {
          token, // Pass token as a query parameter
          newEmail, // Pass newEmail as a query parameter
        },
        headers: {
          "Accept-Language": locale === "ar" ? "ar-SA" : "en-US", // Set language header
          Authorization: `Bearer ${session?.user?.token}`, // Include the user token in the header
        },
      });

      if (response.status === 200) {
        setIsConfirmed(true); // Mark email change as confirmed
        toast.success(
          locale === "ar"
            ? "تم تغيير البريد الالكتروني بنجاح!"
            : "Email change confirmed successfully!"
        ); // Show success toast
        setTimeout(() => {
          window.location.href = "/profile"; // Redirect to profile page after 3 seconds
        }, 3000);
      } else {
        throw new Error("Failed to confirm email change"); // Handle non-200 responses
      }
    } catch (error: any) {
      console.error("Confirmation error:", error); // Log error
      if (error.response?.status === 401) {
        toast.error("The confirmation link has expired. Please request a new one.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "An error occurred while confirming the email change."
        ); // Show error toast
      }
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        {isLoading ? ( // Show loading message
          <p className="text-lg font-semibold">{t("confirm")}</p>
        ) : isConfirmed ? ( // Show success message
          <p className="text-lg font-semibold text-green-600">{t("confirmed")}</p>
        ) : (
          // Show error message
          <p className="text-lg font-semibold text-red-600">{t("notConfirmed")}</p>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmailChange;