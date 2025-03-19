"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSession, signIn } from "next-auth/react";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import { useTranslations } from "next-intl";
import axios from "axios";
import { useRouter } from "next/navigation";

interface UpdatePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const UpdatePasswordForm = () => {
  const { data: session, update } = useSession();
  const router = useRouter(); // Use the router for redirection
  const t = useTranslations("ProfileChangePassword");
  const v = useTranslations("AuthValidationMessages");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdatePasswordFormData>();

  const onSubmit = async (data: UpdatePasswordFormData) => {
    try {
      if (!session?.user?.token) {
        throw new Error("User token is missing. Please log in again.");
      }

      // Ensure new password and confirm new password match
      if (data.newPassword !== data.confirmNewPassword) {
        throw new Error("New password and confirm password do not match.");
      }

      // Change the password
      const changePasswordResponse = await axios.post(
        `${API_BASE_URL}/auth/change-password`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            "Accept-Language": "ar-SA",
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );

      console.log("Change Password API Response:", changePasswordResponse.data);

      if (changePasswordResponse.data.success) {
        // Log the user in again with the new tokens
        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
          email: session.user.email, // Use the user's email from the session
          password: data.newPassword, // Use the new password
        });

        console.log("Login API Response:", loginResponse.data);

        if (loginResponse.data.success) {
          // Update the session with the new tokens
          await signIn("credentials", {
            email: session.user.email,
            password: data.newPassword,
            redirect: false, // Prevent automatic redirect
          });

          // Redirect the user to the same page
          router.refresh(); // Refresh the page to ensure the session is updated
        }
      }

      toast.success("تم تغيير كلمة المرور بنجاح!");
      reset();
    } catch (error: any) {
      console.error("Error:", error);

      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Status Code:", error.response.status);
        console.error("Error Headers:", error.response.headers);
        toast.error(error.response.data?.message || "حدث خطأ، حاول مرة أخرى");
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.error(
          "لم يتم استلام استجابة من السيرفر، تحقق من اتصالك بالإنترنت."
        );
      } else {
        console.error("Error Message:", error.message);
        toast.error(error.message || "حدث خطأ غير متوقع، حاول مرة أخرى.");
      }
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-lg font-semibold xlg:text-[24px]">{t("passwordLg")}</p>

      {/* Old Password Field */}
      <InputField
        id="currentPassword"
        label={t("oldPassword")}
        type="password"
        {...register("currentPassword", { required: v("requiredPassword") })}
        error={errors.currentPassword?.message}
      />

      {/* New Password Field */}
      <InputField
        id="newPassword"
        label={t("newPassword")}
        type="password"
        {...register("newPassword", {
          required: v("requiredPassword"),
          minLength: {
            value: 8,
            message: v("minLengthPassword"),
          },
        })}
        error={errors.newPassword?.message}
      />
      {/* Confirm New Password Field */}
      <InputField
        id="confirmNewPassword"
        label={t("confirmNewPassword")}
        type="password"
        {...register("confirmNewPassword", {
          required: v("confirmPasswordRequired"),
          validate: (value) =>
            value === watch("newPassword") || v("confirmPasswordMatch"),
        })}
        error={errors.confirmNewPassword?.message}
      />

      {/* Save Button */}
      <CustomButton
        label={t("save")}
        className="md:!h-[32px] md:!w-[113px] xlg:!w-[169.5px] xlg:!h-[48px]"
        type="submit"
        disabled={!isValid}
      />
    </form>
  );
};

export default UpdatePasswordForm;
