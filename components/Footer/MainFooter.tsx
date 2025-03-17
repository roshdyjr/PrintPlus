import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const MainFooter = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  return (
    <footer className="flex flex-col justify-start items-center px-12 pt-12 pb-6 bg-[#F8FAFC] gap-1 w-full text-shadeBlack xlg:px-[72px] xlg:pt-[72px] xlg:pb-9">
      <hr />
      {/* Main footer Content */}
      <div className="w-full flex justify-start items-start 2xl:justify-center xlg:justify-start xlg:max-w-[1920px]">
        {/* Footer Grid */}
        <div className="flex flex-col justify-start items-start gap-10 w-full lg:flex-row lg:gap-[132px] lg:max-w-[960px] xl:max-w-[1061px] 2xl:max-w-[1440px] xlg:max-w-[1592px] xlg:gap-[198px]">
          {/* Logo Section Content */}
          <div className="flex flex-col gap-[11px] xlg:gap-[16.5px]">
            {/* Logo div */}
            <Link href={"/"}>
              <Image
                src={"/logo.svg"}
                alt="logo"
                width={84}
                height={50}
                className="xlg:w-[127px] xlg:h-[75.5px]"
              />
            </Link>
            {/* Footer logo section card */}
            <p className="text-[15px] max-w-[280px] xlg:max-w-[420px] xlg:text-[20px]">
              {t("address")}
            </p>
            <div className="flex flex-col gap-1 font-medium text-black text-[13px] xlg:gap-[6px] xlg:font-medium xlg:text-[20px]">
              <p>{t("phone")}</p>
              <p>{t("email")}</p>
            </div>
          </div>
          {/* Links and Sponsers Section */}
          <div className="flex flex-col justify-between items-start flex-1 lg:flex-row">
            {/* Help Section Content large screen */}
            <div className="hidden lg:flex flex-col gap-4">
              <p className="font-semibold xlg:text-[20px]">{t("help")}</p>
              <div className="flex flex-col gap-1 xlg:gap-[6px] xlg:text-[20px]">
                <Link href={"/"}>{t("trackOrder")}</Link>
                <Link href={"/"}>{t("shipping")}</Link>
                <Link href={"/"}>{t("returns")}</Link>
              </div>
            </div>
            {/* About us Section Content large screen */}
            <div className="hidden lg:flex flex-col gap-4">
              <p className="font-semibold xlg:text-[20px]">{t("about")}</p>
              <div className="flex flex-col gap-1 xlg:gap-[6px] xlg:text-[20px]">
                <Link href={"/"}>{t("aboutUs")}</Link>
                <Link href={"/"}>{t("faq")}</Link>
                <Link href={"/"}>{t("contact")}</Link>
              </div>
            </div>
            {/* Help and About us Small screen */}
            <div className="flex lg:hidden items-start gap-[84px] mb-6">
              <div className="flex flex-col gap-4 text-nowrap">
                <p className="font-semibold">Help</p>
                <div className="flex flex-col gap-1">
                  <Link href={"/"}>Track order</Link>
                  <Link href={"/"}>Shipping</Link>
                  <Link href={"/"}>Returns</Link>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-nowrap">
                <p className="font-semibold">{t("aboutUs")}</p>
                <div className="flex flex-col gap-1">
                  <Link href={"/"}>{t("aboutUs")}</Link>
                  <Link href={"/"}>{t("faq")}</Link>
                  <Link href={"/"}>{t("contact")}</Link>
                </div>
              </div>
            </div>
            {/* Sponsers and Social Links Section */}
            <div className="flex flex-col gap-6 xlg:gap-9">
              <Image
                src={"/Footer6.svg"}
                alt="vat"
                width={42}
                height={50}
                className="xlg:w-[62.5px] xlg:h-[75.23px]"
              />
              <div className="flex items-center gap-2 xlg:gap-3">
                <Image
                  src={"/Footer3.svg"}
                  alt="mastercard"
                  width={35}
                  height={27.23}
                  className="xlg:w-[52.5px] xlg:h-[40.85px]"
                />
                <Image
                  src={"/Footer2.svg"}
                  alt="visa"
                  width={41.61}
                  height={13.44}
                  className="xlg:w-[62.42px] xlg:h-[20.16px]"
                />
                <Image
                  src={"/Footer1.svg"}
                  alt="mada"
                  width={43.3}
                  height={14.44}
                  className="xlg:w-[65px] xlg:h-[21.66px]"
                />
                <Image
                  src={"/Footer5.svg"}
                  alt="aramex"
                  width={69.3}
                  height={11.26}
                  className="xlg:w-[103.95px] xlg:h-[16.89px]"
                />
                <Image
                  src={"/Footer4.svg"}
                  alt="icon"
                  width={27.25}
                  height={27.25}
                  className="xlg:w-[40.87px] xlg:h-[40.91px]"
                />
              </div>
              <div className="flex items-center gap-[14.28px] xlg:gap-[21.43px]">
                <button className="rounded-[35.71px] size-[39.28px] p-[8.93px] flex justify-center items-center border-[0.89px] border-[#CBD5E1] bg-[#F8FAFC] xlg:size-[58.92px] xlg:p-[13.39px] xlg:border-[1.34px] xlg:rounded-[53.56px]">
                  <FaFacebookF className="w-[9.4px] h-[15.04px] xlg:w-[14.1px] xlg:h-[22.55px]" />
                </button>
                <button className="rounded-[35.71px] size-[39.28px] p-[8.93px] flex justify-center items-center border-[0.89px] border-[#CBD5E1] bg-[#F8FAFC] xlg:size-[58.92px] xlg:p-[13.39px] xlg:border-[1.34px] xlg:rounded-[53.56px]">
                  <FaXTwitter className="w-[18.3px] h-[18.29px] xlg:w-[27.45px] xlg:h-[27.43px]" />
                </button>
                <button className="rounded-[35.71px] size-[39.28px] p-[8.93px] flex justify-center items-center border-[0.89px] border-[#CBD5E1] bg-[#F8FAFC] xlg:size-[58.92px] xlg:p-[13.39px] xlg:border-[1.34px] xlg:rounded-[53.56px]">
                  <FaInstagram className="w-[16.07px] h-[16.07px] xlg:w-[24.1px] xlg:h-[24.1px]" />
                </button>
                <button className="rounded-[35.71px] size-[39.28px] p-[8.93px] flex justify-center items-center border-[0.89px] border-[#CBD5E1] bg-[#F8FAFC] xlg:size-[58.92px] xlg:p-[13.39px] xlg:border-[1.34px] xlg:rounded-[53.56px]">
                  <FaYoutube className="w-[17.58px] h-[17.58px] xlg:w-[26.38px] xlg:h-[26.38px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Tail */}
      <div className="flex flex-col w-full pt-3 gap-8 2xl:max-w-[1440px] text-nowrap xlg:max-w-[1920px] xlg:pt-[18px] xlg:gap-12 xlg:justify-start">
        <hr className="w-full" />
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <p className="text-sm order-2 lg:order-1 xlg:text-[21px]">
            {t("copyRight")}
          </p>
          <div className="flex items-center gap-4 mb-8 order-1 lg:order-2 lg:mb-0 xlg:gap-6">
            <button className="underline text-sm xlg:text-[21px]">
              {t("privacyPolicy")}
            </button>
            <button className="underline text-sm xlg:text-[21px]">
              {t("terms")}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
