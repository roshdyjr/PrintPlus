"use client";

import Link from "next/link";
import React from "react";
import InputField from "../SharedComponents/InputField";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import PhoneInput from "../SharedComponents/IntlTelInputField";

interface FormFields {
  fullName: string;
  address: string;
  postcode: string;
  city: string;
  mobileNo: string;
  mobileCode: string;
  mobileIso: string;
}

export default function DeliveryForm() {
  const t = useTranslations("DeliveryForm");

  const {
    control,
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      fullName: "",
      address: "",
      postcode: "",
      city: "",
      mobileNo: "",
      mobileCode: "",
      mobileIso: "",
    },
  });

  const onSubmit = (data: FormFields) => {
    console.log("Submitted data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="md:p-6 rounded-lg">
      <h2 className="text-[27px] font-[700] mb-6">{t("Delivery")}</h2>
      <h2 className="text-[20px] font-[600] mb-6">{t("Shippingaddress")}</h2>

      <div className="space-y-4 border-t border-b border-[#E2E8F0] py-4">
        {/* Full name */}
        <InputField
          id="fullName"
          label={t("FullName")}
          type="text"
          placeholder={t("FullNamePlaceholder")}
          {...register("fullName", { required: true })}
        />

        {/* Address */}
        <InputField
          id="address"
          label={t("Address")}
          type="text"
          placeholder={t("AddressPlaceholder")}
          {...register("address", { required: true })}
        />

        {/* Phone Number using PhoneInput */}
        <PhoneInput<FormFields>
          control={control}
          setValue={setValue}
          label={t("PhoneNumber")}
          name="mobileNo"
        />

        {/* Postcode & City */}
        <div className="flex gap-4">
          <div className="flex-1">
            <InputField
              id="postcode"
              label={t("Postcode")}
              type="text"
              placeholder={t("PostcodePlaceholder")}
              {...register("postcode", { required: true })}
            />
          </div>
          <div className="flex-1">
            <InputField
              id="city"
              label={t("City")}
              type="text"
              placeholder={t("CityPlaceholder")}
              {...register("city", { required: true })}
            />
          </div>
        </div>

        {/* Save Address */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="saveAddress"
            className="h-[18px] w-[18px] rounded-[4px] border border-gray-300 accent-[#6366F1] focus:ring-[#6366F1]"
          />
          <label htmlFor="saveAddress" className="text-sm">
            {t("SaveAddress")}
          </label>
        </div>
      </div>

      {/* Billing Address */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-3">{t("BillingAddress")}</h3>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="sameAsBilling"
            defaultChecked
            className="h-[18px] w-[18px] rounded-[4px] border border-gray-300 accent-[#6366F1] focus:ring-[#6366F1]"
          />
          <label htmlFor="sameAsBilling" className="text-sm text-gray-700">
            {t("SameAsBilling")}
          </label>
        </div>
      </div>

      {/* Continue Button */}
      <Link href="/checkout/payment">
        <button
          type="submit"
          className="inline-block mt-6 px-20 bg-[#0F172A] text-white py-3 rounded-[48px] font-medium text-center"
        >
          {t("ContinueToPayment")}
        </button>
      </Link>

      {/* Footer Logos */}
      <div className="mt-4 flex md:justify-start gap-4 border-b border-[#E2E8F0] pb-6 justify-center">
        <img src="/Footer3.svg" className="w-10" alt="Mastercard" />
        <img src="/Footer2.svg" className="w-10" alt="Visa" />
        <img src="/Footer1.svg" className="w-10" alt="Mada" />
      </div>
    </form>
  );
}
