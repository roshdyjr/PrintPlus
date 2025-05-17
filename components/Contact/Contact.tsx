"use client";

import React from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { useTranslations } from "next-intl";
import InputField from "../SharedComponents/InputField";
import { useForm } from "react-hook-form";

const Contact = () => {
  const t = useTranslations("Contact");
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <section className="px-6 py-12 md:px-40 flex flex-col md:flex-row gap-28">
      {/* Left Side */}
      <div className="flex-1 hidden md:block">
        <span className="bg-[#E4E5FF] text-[#6366F1] text-sm px-3 py-1 rounded-full">
          {t("contact")}
        </span>
        <h2 className="mt-6 text-3xl font-bold">{t("weLoveToHear")}</h2>
        <p className="mt-4 text-gray-500">{t("needSomethingCleared")}</p>

        {/* Email */}
        <div className="mt-10">
          <div className="bg-[#FFF4EC] p-2 rounded-[12px] w-[50px] h-[50px] flex items-center justify-center">
            <FiMail className="w-7 h-7 text-orange-500" />
          </div>
          <div>
            <h4 className="font-[700] pt-4 text-[24px]">{t("email")}</h4>
            <p className="text-gray-500 py-4">{t("ourFriendlyTeam")}</p>
            <a href="mailto:printplus.com" className="text-[#6366F1] mt-2 block">
              printplus.com
            </a>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Office */}
          <div className="mt-8">
            <div className="bg-[#E6F7F2] p-2 rounded-[12px] w-[50px] h-[50px] flex items-center justify-center">
              <FiMapPin className="w-7 h-7 text-green-500" />
            </div>
            <div>
              <h4 className="font-[700] pt-4 text-[24px]">{t("office")}</h4>
              <p className="text-gray-500 py-4">{t("comeSayHello")}</p>
              <p className="text-[#6366F1]">
                100 Smith Street
                <br />
                Collingwood VIC 3066 AU
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="mt-8 gap-4">
            <div className="bg-[#F6F2FF] p-2 rounded-[12px] w-[50px] h-[50px] flex items-center justify-center">
              <FiPhone className="w-7 h-7 text-[#9F70FC]" />
            </div>
            <div>
              <h4 className="font-[700] pt-4 text-[24px]">{t("phone")}</h4>
              <p className="text-gray-500 py-4">{t("monFriHours")}</p>
              <p className="text-[#6366F1]">+1 (555) 000-0000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4 md:text-start text-center">{t("getInTouch")}</h2>
        <p className="text-gray-500 mb-8 md:text-start text-center">{t("weLoveToHearForm")}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <InputField
                id="firstName"
                label={t("firstName")}
                placeholder={t("firstNamePlaceholder")}
                register={register("firstName", { required: "First name is required" })}
                error={errors.firstName?.message as string}
              />
            </div>
            <div className="flex-1">
              <InputField
                id="lastName"
                label={t("lastName")}
                placeholder={t("lastNamePlaceholder")}
                register={register("lastName", { required: "Last name is required" })}
                error={errors.lastName?.message as string}
              />
            </div>
          </div>

          <InputField
            id="email"
            label={t("email")}
            type="email"
            placeholder="you@company.com"
            register={register("email", { 
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            error={errors.email?.message as string}
          />

          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label className="font-bold text-shadeGray text-sm xlg:text-[20px]">
              {t("phone")}
            </label>
            <InputField
              id="phone"
              label=""
              isPhoneInput={true}
              onPhoneChange={(phone) => console.log(phone)}
            />
          </div>

          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label htmlFor="message" className="font-bold text-shadeGray text-sm xlg:text-[20px]">
              {t("message")}
            </label>
            <textarea
              id="message"
              placeholder={t("leaveMessage")}
              className="w-full border-2 border-[#94A3B8] rounded-[12px] p-3 h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("message", { required: "Message is required" })}
            />
            {errors.message && (
              <p className="text-red-500">{errors.message.message as string}</p>
            )}
          </div>

          {/* Privacy Policy Checkbox for small screens */}
          <div className="flex items-center gap-2 mb-2 md:hidden">
            <input type="checkbox" id="privacyPolicyMobile" className="w-4 h-4" required />
            <label htmlFor="privacyPolicyMobile" className="text-gray-700 text-sm">
              You agree to our{' '}
              <a href="/privacy-policy" className="underline text-[#344054]" target="_blank" rel="noopener noreferrer">
                privacy policy
              </a>.
            </label>
          </div>
          <button
            type="submit"
            className="bg-gray-900 text-white py-3 hover:bg-gray-800 transition font-semibold rounded-full"
          >
            {t("sendMessage")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;