"use client";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import { useTranslations } from "next-intl";

interface UpdateEmailFormData {
  currentEmail: string;
  newEmail: string;
  password: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const UpdateEmailForm = () => {
  const { data: session } = useSession(); // Get the user session
  const t = useTranslations("ProfilePersonalDetails");
  const v = useTranslations("AuthValidationMessages");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdateEmailFormData>();

  // Replace this with the actual current user email (e.g., from session)
  const currentUserEmail = session?.user?.email || "user@example.com"; // Use email from session

  const onSubmit = async (data: UpdateEmailFormData) => {
    try {
      if (!session?.user?.token) {
        throw new Error("User token is missing. Please log in again.");
      }

      const response = await axios.post(
        `${API_BASE_URL}/auth/change-email-request`,
        {
          newEmail: data.newEmail,
          password: data.password,
        },
        {
          headers: {
            "Accept-Language": "en-US",
            Authorization: `Bearer ${session.user.token}`, // Include the token in the header
          },
        }
      );

      console.log("Success:", response.data);
      toast.success("تم إرسال طلب تغيير البريد الإلكتروني بنجاح!");
      reset();
    } catch (error: any) {
      console.error("Error:", error);

      if (error.response) {
        toast.error(error.response.data?.message || "حدث خطأ، حاول مرة أخرى");
      } else if (error.request) {
        toast.error(
          "لم يتم استلام استجابة من السيرفر، تحقق من اتصالك بالإنترنت."
        );
      } else {
        toast.error(error.message || "حدث خطأ غير متوقع، حاول مرة أخرى.");
      }
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-lg font-semibold">{t("mail")}</p>

      {/* Current Mail Field (Disabled) */}
      <InputField
        id="currentEmail"
        label={t("currentMail")}
        value={currentUserEmail} // Set the current user's email
        disabled // Make the field disabled
      />

      {/* New Mail Field */}
      <InputField
        id="newEmail"
        label={t("newMail")}
        {...register("newEmail", {
          required: v("requiredEmail"),
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: v("invalidEmailFormat"),
          },
        })}
        error={errors.newEmail?.message}
      />

      {/* Password Field */}
      <InputField
        id="password"
        label={t("password")}
        type="password"
        {...register("password", { required: v("requiredPassword") })}
        error={errors.password?.message}
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

export default UpdateEmailForm;
