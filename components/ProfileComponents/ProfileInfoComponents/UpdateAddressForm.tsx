"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import SelectField from "@/components/SharedComponents/SelectField";
import PhoneInput from "@/components/SharedComponents/IntlTelInputField"; 

interface UpdateAddressFormData {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  cityId: number;
  zipCode: string;
  mobileNo: string;
  mobileCode: string;
  mobileIso: string;
}

interface City {
  value: number;
  text: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const UpdateAddressForm = () => {
  const { data: session, status } = useSession();
  const [cities, setCities] = useState<City[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdateAddressFormData>({
    mode: "onChange",
    defaultValues: {
      mobileNo: "",
      mobileCode: "",
      mobileIso: "",
    },
  });

  useEffect(() => {
    if (status === "authenticated" && session?.user?.token) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/cities/1`, {
            headers: {
              "Accept-Language": "ar-SA",
              Authorization: `Bearer ${session.user.token}`,
            },
          });

          if (response.data.success) {
            setCities(response.data.data);
            reset((prev) => ({
              ...prev,
              cityId: response.data.data[0]?.value,
            }));
          }
        } catch (error) {
          console.error("Failed to fetch cities:", error);
          toast.error("فشل في تحميل قائمة المدن. يرجى المحاولة مرة أخرى.");
        }
      };

      fetchCities();
    }
  }, [session?.user?.token, status, reset]);

  const onSubmit = async (data: UpdateAddressFormData) => {
    try {
      if (!session?.user?.token) {
        throw new Error("User token is missing. Please log in again.");
      }

      const response = await axios.post(`${API_BASE_URL}/addresses`, data, {
        headers: {
          "Accept-Language": "ar-SA",
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      console.log("Success:", response.data);
      toast.success("تم تحديث العنوان بنجاح!");
      reset();
    } catch (error: any) {
      console.error("Error:", error);
      if (error.response) {
        toast.error(error.response.data?.message || "حدث خطأ، حاول مرة أخرى");
      } else if (error.request) {
        toast.error("لم يتم استلام استجابة من السيرفر، تحقق من اتصالك بالإنترنت.");
      } else {
        toast.error(error.message || "حدث خطأ غير متوقع، حاول مرة أخرى.");
      }
    }
  };

  return (
    <form className="flex flex-col gap-6 xlg:gap-9" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-lg font-semibold xlg:text-[24px]">Address</p>
      
      <InputField
        id="fullName"
        label="Full name"
        {...register("fullName", { required: "هذا الحقل مطلوب" })}
        error={errors.fullName?.message}
      />

      <InputField
        id="addressLine1"
        label="Address"
        {...register("addressLine1", { required: "هذا الحقل مطلوب" })}
        error={errors.addressLine1?.message}
      />

      <PhoneInput<UpdateAddressFormData>
        control={control}
        setValue={setValue}
        name="mobileNo"
        label="Mobile Number"
      />

      <InputField
        id="addressLine2"
        label="Additional information (optional)"
        {...register("addressLine2")}
      />

      <div className="flex items-center gap-2">
        <InputField
          id="zipCode"
          label="Postcode"
          {...register("zipCode", { required: "هذا الحقل مطلوب" })}
          error={errors.zipCode?.message}
        />
        <SelectField
          id="cityId"
          label="City"
          options={cities}
          {...register("cityId", { required: "هذا الحقل مطلوب" })}
          error={errors.cityId?.message}
        />
      </div>

      <CustomButton
        label="Save"
        className="md:!h-[32px] md:!w-[113px] xlg:!w-[169.5px] xlg:!h-[48px]"
        type="submit"
        disabled={!isValid}
      />
    </form>
  );
};

export default UpdateAddressForm;
