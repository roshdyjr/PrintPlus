"use client";

import Link from "next/link";
import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function DeliveryForm() {
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="md:p-6 rounded-lg">
      <h2 className="text-[27px] font-[700] mb-6">Delivery</h2>
      <h2 className="text-[20px] font-[600] mb-6">Shipping address</h2>

      <div className="space-y-4 border-t border-b border-[#E2E8F0] py-4">
        {/* Full name */}
        <div>
          <label className="block mb-1 font-medium">Full name</label>
          <input
            type="text"
            className="w-full border-2 border-[#94A3B8] rounded-[12px] px-3 py-2"
            placeholder="Enter your full name"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            className="w-full border-2 border-[#94A3B8] rounded-[12px] px-3 py-2"
            placeholder="Enter your address"
          />
        </div>

        {/* Phone Number */}
        <div className="relative">
          <PhoneInput
            international
            defaultCountry="SA"
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Enter phone number"
            className=" [&>input]:!w-full [&>input]:!border-[3px] [&>input]:!border-t [&>input]:!border-b [&>input]:!border-r [&>input]:!rounded-[8px] [&>input]:!rounded-l [&>input]:!px-2 [&>input]:!py-[6px] w-full border-2 border-[#94A3B8]  rounded-[10px]    pl-2"
            countrySelectProps={{
              className: "!pe-2 !me-2 !border-e !border-[#94A3B8]",
            }}
          />
        </div>

        {/* Postcode & City */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Postcode</label>
            <input
              type="text"
              className="w-full border-2 border-[#94A3B8] rounded-[12px] px-3 py-2"
              placeholder="Enter postcode"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              className="w-full border-2 border-[#94A3B8] rounded-[12px] px-3 py-2"
              placeholder="Enter city"
            />
          </div>
        </div>

        {/* Save Address */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="saveAddress"
            className="h-[18px] w-[18px] rounded-[4px] border border-gray-300 accent-[#6366F1]   focus:ring-[#6366F1]   "
          />
          <label htmlFor="saveAddress" className="text-sm">
            Save for Future orders
          </label>
        </div>
      </div>

      {/* Billing Address */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-3">Billing Address</h3>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="sameAsBilling"
            defaultChecked
            className="h-[18px] w-[18px] rounded-[4px] border border-gray-300 accent-[#6366F1]   focus:ring-[#6366F1]   "
          />
          <label htmlFor="sameAsBilling" className="text-sm text-gray-700">
            Same as billing address
          </label>
        </div>
      </div>

      {/* Continue Button */}
      <Link
        href="/checkout/payment"
        className="inline-block mt-6 px-20 bg-[#0F172A] text-white py-3 rounded-[48px] font-medium text-center"
      >
        Continue to payment
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
