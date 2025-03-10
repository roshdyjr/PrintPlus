"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

// Main ConfirmEmailChange Component
const ConfirmEmailChange = () => {
  const { data: session } = useSession(); // Get the user session
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Extract token from URL
  const newEmail = decodeURIComponent(searchParams.get("newEmail") || "").replace("$", ""); // Extract and clean newEmail from URL
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isConfirmed, setIsConfirmed] = useState(false); // Track confirmation status

  useEffect(() => {
    if (token && newEmail && session?.user?.token) {
      confirmEmailChange(); // Trigger confirmation if token, newEmail, and session token are available
    }
  }, [token, newEmail, session]);

  const confirmEmailChange = async () => {
    try {
      if (!token || !session?.user?.token) {
        throw new Error("Token is missing. Please try again.");
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/confirm-email-change`;

      const response = await axios.get(apiUrl, {
        params: {
          token, // Pass token as a query parameter
          newEmail, // Pass newEmail as a query parameter
        },
        headers: {
          "Accept-Language": "en-US", // Set language header to en-US
          Authorization: `Bearer ${session.user.token}`, // Include the user token in the header
        },
      });

      if (response.status === 200) {
        setIsConfirmed(true); // Mark email change as confirmed
        toast.success("Email change confirmed successfully!"); // Show success toast
      } else {
        throw new Error("Failed to confirm email change"); // Handle non-200 responses
      }
    } catch (error: any) {
      console.error("Confirmation error:", error); // Log error
      toast.error(
        error.response?.data?.message ||
          "An error occurred while confirming the email change." // Show error toast
      );
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        {isLoading ? ( // Show loading message
          <p className="text-lg font-semibold">Confirming email change...</p>
        ) : isConfirmed ? ( // Show success message
          <p className="text-lg font-semibold text-green-600">
            Your email change has been confirmed successfully!
          </p>
        ) : ( // Show error message
          <p className="text-lg font-semibold text-red-600">
            Failed to confirm email change. Please try again.
          </p>
        )}
      </div>
    </div>
  );
};

// Wrapper Component with Suspense Boundary
const ConfirmEmailChangePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmEmailChange />
    </Suspense>
  );
};

export default ConfirmEmailChangePage;