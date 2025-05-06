"use client";

import React from "react";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("Contact");

  return (
    <section className="px-6 py-12 md:px-40   flex flex-col md:flex-row gap-28">
      {/* Left Side */}
      <div className="flex-1 hidden md:block">
        <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full">
          {t("contact")}
        </span>
        <h2 className="mt-6 text-3xl font-bold">{t("weLoveToHear")}</h2>
        <p className="mt-4 text-gray-500">{t("needSomethingCleared")}</p>

        {/* Email */}
        <div className="mt-10    ">
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

        <div className="flex   gap-10">
          {/* Office */}
          <div className="mt-8    ">
            <div className="bg-[#E6F7F2] p-2 rounded-[12px] w-[50px] h-[50px] flex items-center justify-center">
              <FiMapPin className="w-7 h-7 text-green-500" />
            </div>
            <div>
              <h4 className="font-[700] pt-4 text-[24px]">{t("office")}</h4>
              <p className="text-gray-500 py-4">{t("comeSayHello")}</p>
              <p className="text-[#6366F1]  ">
                100 Smith Street
                <br />
                Collingwood VIC 3066 AU
              </p>
            </div>
          </div>

          {/* Phone */}
          <div className="mt-8   gap-4">
            <div className="bg-[#F6F2FF] p-2 rounded-[12px] w-[50px] h-[50px] flex items-center justify-center">
              <FiPhone className="w-7 h-7 text-purple-500" />
            </div>
            <div>
              <h4 className="font-[700] pt-4 text-[24px]">{t("phone")}</h4>
              <p className="text-gray-500 py-4">{t("monFriHours")}</p>
              <p className="text-[#6366F1]  ">+1 (555) 000-0000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side (Form) */}
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">{t("getInTouch")}</h2>
        <p className="text-gray-500 mb-8">{t("weLoveToHearForm")}</p>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("firstName")}
              </label>
              <input
                id="firstName"
                type="text"
                placeholder={t("firstNamePlaceholder")}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t("lastName")}
              </label>
              <input
                id="lastName"
                type="text"
                placeholder={t("lastNamePlaceholder")}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@company.com"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("phone")}
            </label>
            <div className="flex items-center gap-2">
              <select className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>US</option>
                <option>UK</option>
                <option>AU</option>
              </select>
              <input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {t("message")}
            </label>
            <textarea
              id="message"
              placeholder={t("leaveMessage")}
              className="w-full border border-gray-300 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="bg-gray-900 text-white   py-3 hover:bg-gray-800 transition font-semibold rounded-full"
          >
            {t("sendMessage")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
