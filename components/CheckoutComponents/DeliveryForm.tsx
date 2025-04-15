"use client";

import Link from "next/link";
import React, { useState } from "react";
import InputField from "../SharedComponents/InputField";
import { useTranslations } from "next-intl";

export default function DeliveryForm() {
  const t = useTranslations("DeliveryForm");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    postcode: "",
    city: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="md:p-6 rounded-lg">
      <h2 className="text-[27px] font-[700] mb-6">{t("Delivery")}</h2>
      <h2 className="text-[20px] font-[600] mb-6">{t("Shippingaddress")}</h2>

      <div className="space-y-4 border-t border-b border-[#E2E8F0] py-4">
        {/* Full name */}
        <InputField
          id="fullName"
          label={t("FullName")}
          name="fullName"
          type="text"
          placeholder={t("FullNamePlaceholder")}
          value={formData.fullName}
          onChange={handleInputChange}
        />

        {/* Address */}
        <InputField
          id="address"
          label={t("Address")}
          name="address"
          type="text"
          placeholder={t("AddressPlaceholder")}
          value={formData.address}
          onChange={handleInputChange}
        />

        {/* Phone Number */}
        <InputField
          id="phone"
          label={t("PhoneNumber")}
          isPhoneInput={true}
          value={phoneNumber}
          onPhoneChange={(phone) => setPhoneNumber(phone)}
        />

        {/* Postcode & City */}
        <div className="flex gap-4">
          <div className="flex-1">
            <InputField
              id="postcode"
              label={t("Postcode")}
              name="postcode"
              type="text"
              placeholder={t("PostcodePlaceholder")}
              value={formData.postcode}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex-1">
            <InputField
              id="city"
              label={t("City")}
              name="city"
              type="text"
              placeholder={t("CityPlaceholder")}
              value={formData.city}
              onChange={handleInputChange}
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
      <Link
        href="/checkout/payment"
        className="inline-block mt-6 px-20 bg-[#0F172A] text-white py-3 rounded-[48px] font-medium text-center"
      >
        {t("ContinueToPayment")}
      </Link>

      {/* Footer Logos */}
      <div className="mt-4 flex md:justify-start gap-4 border-b border-[#E2E8F0] pb-6 justify-center">
        <img src="/Footer3.svg" className="w-10" alt="Mastercard" />
        <img src="/Footer2.svg" className="w-10" alt="Visa" />
        <img src="/Footer1.svg" className="w-10" alt="Mada" />
      </div>
    </div>
  );
}
