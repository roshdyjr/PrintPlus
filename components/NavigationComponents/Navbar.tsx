"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "../SharedComponents/SearchBar";
import { Category } from "@/types/Category";
import { fetchCategories } from "@/utils/fetchCategories";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import NavbarDropDown from "./NavbarDropDown";
import { useLocale, useTranslations } from "next-intl";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const Navbar = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [userData, setUserData] = useState<{
    fullName: string;
    balance: number;
  } | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // Get the current locale and translations
  const locale = useLocale(); // Current locale
  const t = useTranslations("Navbar"); // Translations for the Navbar

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories(locale);
      setCategories(categories);
    };

    getCategories();
  }, [locale]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/users/get`, {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
              "Accept-Language": "en-US",
            },
          });

          if (response.data.success) {
            setUserData({
              fullName: response.data.data.fullName,
              balance: response.data.data.balance,
            });
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserData();
  }, [session]);

  const toggleDropdown = () => {
    if (!session) {
      router.push("/login"); // Redirect to login if not logged in
    } else {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleLanguageSwitch = () => {
    const newLocale = locale === "en" ? "ar" : "en"; // Toggle between "en" and "ar"

    // Get the current path without the locale segment
    const currentPath = window.location.pathname; // e.g., "/en/resetpassword"
    const pathWithoutLocale = currentPath.split("/").slice(2).join("/"); // e.g., "resetpassword"

    // Get the current search parameters (e.g., "?token=...&email=...")
    const searchParams = new URLSearchParams(window.location.search);

    // Construct the new URL with the updated locale and preserved search parameters
    const newPath = `/${newLocale}/${pathWithoutLocale}?${searchParams.toString()}`; // e.g., "/ar/resetpassword?token=...&email=..."

    // Redirect to the new URL
    router.push(newPath);
  };

  return (
    <header className="hidden lg:flex flex-col gap-4 xlg:gap-[18px]">
      {/* Navbar */}
      <nav className="flex flex-col gap-[10px] xlg:gap-[15px]">
        {/* Navbar shipping header */}
        <div className="bg-[#F1F5F9] flex justify-center items-center h-[32px] xlg:h-[48px]">
          <div
            className={`flex items-center gap-2 xlg:gap-3 ${
              locale === "ar" ? "flex-row-reverse" : ""
            }`}
          >
            <Image
              src={"/truck.svg"}
              alt="delivery"
              width={16}
              height={16}
              className="xlg:w-[24px] xlg:h-[24px]"
            />
            <p className="text-xs text-[#334155] xlg:text-lg">
              {t("freeShipping")} {/* Translated text */}
            </p>
          </div>
        </div>
        {/* Main Navbar Items */}
        <div className="px-12 flex items-center gap-14 w-full 2xl:max-w-[1927px] 2xl:self-center xlg:px-[72px] xlg:gap-[84px]">
          {/* Logo */}
          <Link href={"/"} className="flex items-center justify-center">
            <Image
              src={"/logo.svg"}
              alt="logo"
              width={78}
              height={47}
              className="xlg:w-[118px] xlg:h-[70px]"
            />
          </Link>
          {/* Searchbar, account, language and cart */}
          <div className="flex items-center gap-[31px] flex-1 xlg:gap-[46.5px]">
            <SearchBar />
            <div className="flex items-center gap-1 text-shadeBlack xlg:gap-[6px]">
              {/* Profile Button */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="px-3 py-[10px] rounded-lg flex items-center justify-center gap-2 xlg:gap-3 xlg:px-[18px] xlg:py-[15px]"
                >
                  <Image
                    src={"/user.svg"}
                    alt="user"
                    width={20}
                    height={20}
                    className="xlg:w-[30px] xlg:h-[30px]"
                  />
                  <p className="font-medium text-sm text-nowrap xlg:font-semibold xlg:text-[20px]">
                    {session ? userData?.fullName || t("profile") : t("login")}
                    {/* Translated text */}
                  </p>
                </button>
                {/* Dropdown Menu */}
                {isDropdownOpen && session && (
                  <NavbarDropDown
                    userData={userData}
                    handleLogout={handleLogout}
                    closeDropdown={closeDropdown} // Pass the closeDropdown function
                  />
                )}
              </div>
              {/* Language Button */}
              <button
                onClick={handleLanguageSwitch}
                className="px-3 py-[10px] flex justify-center items-center xlg:px-[18px] xlg:py-[15px]"
              >
                <div className="px-3 py-[10px] border-[1.5px] border-[#94A3B8] flex justify-center items-center gap-2 w-[60px] h-[42px] xlg:py-6 xlg:gap-3 rounded-[30px] xlg:w-[95px] xlg:h-[54px]">
                  <Image
                    src={"/globe.svg"}
                    alt="globe"
                    width={24}
                    height={24}
                    className="w- h-4 xlg:w-6 xlg:h-6"
                  />
                  <p className="font-semibold text-base xlg:text-[20px]">
                    {locale === "en" ? "ع" : "E"}{" "}
                    {/* Toggle between "ع" and "E" */}
                  </p>
                </div>
              </button>
              {/* City Selection Button */}
              <button className="w-[120px] h-[48px] xlg:w-[156px] xlg:h-[54px]">
                <div className="bg-white border border-[#94A3B8] rounded-[30px] px-3 py-[10px] flex justify-center items-center gap-2 xlg:border-[1.5px] xlg:gap-3 xlg:py-3 xlg:px-6">
                  <p className="font-semibold text-sm text-shadeBlack xlg:text-[20px]">
                    {t("city")}
                  </p>
                  <Image
                    src={"/cheveron-down.svg"}
                    alt="dropdown"
                    width={20}
                    height={20}
                    className="xlg:w-[30px] xlg:h-[30px]"
                  />
                </div>
              </button>
              {/* Cart Button */}
              <Link
                href={"/"}
                className="rounded-lg flex justify-center items-center px-3 py-[10px] xlg:px-[18px] xlg:py-[15px]"
              >
                <Image
                  src={"/cart.svg"}
                  alt="cart"
                  width={28}
                  height={28}
                  className="w-full min-w-[24px] xlg:w-[36px] xlg:h-[36px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Nav Links */}
      <div className="px-12 h-[44px] border-b border-[#E2E8F0] flex justify-center items-center xlg:px-[72px] xlg:border-b-[1.5px] xlg:h-[66px]">
        <div className="flex items-center gap-4 xlg:gap-6">
          {categories.map((category) => (
            <Link
              href={`/${locale}/category/${category.categoryId}`} // Include locale in the URL
              key={category.categoryId}
              className="text-sm text-shadeBlack text-nowrap lg:py-[10px] xl:px-2 xl:text-base xlg:px-3 xlg:py-[18px] xlg:text-[20px]"
            >
              {category.categoryName}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
