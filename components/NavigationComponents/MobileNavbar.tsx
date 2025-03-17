"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Category } from "@/types/Category";
import { fetchCategories } from "@/utils/fetchCategories";
import { useSession, signOut } from "next-auth/react";
import AccountOverlay from "./AccountOverlay";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAccountOverlayOpen, setIsAccountOverlayOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [userData, setUserData] = useState<{
    fullName: string;
    balance: number;
  } | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  // Get the current locale and translations
  const locale = useLocale();
  const t = useTranslations("Navbar");

  // Fetch categories on component mount
  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories(locale);
      setCategories(categories);
    };

    getCategories();
  }, [locale]);

  // Fetch user data when session changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/users/get`, {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
              "Accept-Language": locale === "en" ? "en-US" : "ar-SA",
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
  }, [session, locale]);

  const handleNavToggler = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsAccountOverlayOpen(false);
  };

  const handleAccountClick = () => {
    if (session) {
      setIsAccountOverlayOpen(true);
    } else {
      handleClose();
      router.push("/login");
    }
  };

  const handleReturn = () => {
    setIsAccountOverlayOpen(false);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
    handleClose();
  };

  // Language toggler function
  const handleLanguageSwitch = () => {
    const newLocale = locale === "en" ? "ar" : "en"; // Toggle between "en" and "ar"

    // Get the current path without the locale segment
    const currentPath = window.location.pathname; // e.g., "/en/category/1"
    const pathWithoutLocale = currentPath.split("/").slice(2).join("/"); // e.g., "category/1"

    // Construct the new URL with the updated locale
    const newPath = `/${newLocale}/${pathWithoutLocale}`; // e.g., "/ar/category/1"

    // Redirect to the new URL
    router.push(newPath);
  };

  return (
    <header className="flex flex-col lg:hidden">
      {/* Mobile Navbar */}
      <nav className="flex flex-col">
        {/* Mobile Navbar shipping header */}
        <div className="bg-[#F1F5F9] flex justify-center items-center h-[32px]">
          <div className="flex items-center gap-2">
            <Image src={"/truck.svg"} alt="delivery" width={16} height={16} />
            <p className="text-xs text-[#334155]">{t("freeShipping")}</p>
          </div>
        </div>
        {/* Mobile Navbar Items */}
        <div className="py-2 border-b-2 border-[#E2E8F0]">
          <div className="px-2 flex items-center justify-between">
            {/* Nav Toggler and Logo */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleNavToggler}
                className={`size-12 flex items-center justify-center`}
              >
                <Image
                  src={"/navToggler.svg"}
                  alt="toggler"
                  width={24}
                  height={24}
                />
              </button>
              <Link href={"/"} className="flex items-center justify-center">
                <Image src={"/logo.svg"} alt="logo" width={59} height={35} />
              </Link>
            </div>
            {/* Search and Cart Icons */}
            <div className="flex items-center gap-2">
              <button className="size-12 flex items-center justify-center">
                <Image
                  src={"/mobileSearch.svg"}
                  alt="search"
                  width={24}
                  height={24}
                />
              </button>
              <Link
                href={"/"}
                className="size-12 flex items-center justify-center"
              >
                <Image src={"/cart.svg"} alt="cart" width={24} height={24} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-white z-50 overflow-y-scroll transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Overlay Header */}
        <div className="flex justify-between items-center py-2 px-5 border-b-2 border-[#E2E8F0]">
          <Link href={"/"} className="flex items-center justify-center">
            <Image
              src={"/notextLogo.svg"}
              alt="logo"
              width={21.62}
              height={35}
            />
          </Link>
          <button
            onClick={handleClose}
            className="size-12 flex items-center justify-center"
          >
            <Image src={"/close.svg"} alt="close" width={24} height={24} />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="pt-2">
          <ul className="flex flex-col">
            {/* Map through categories */}
            {categories.map((category) => (
              <li key={category.categoryId} className="px-4 py-[14px]">
                <Link
                  href={`/${locale}/category/${category.categoryId}`}
                  className="font-semibold text-shadeBlack"
                  onClick={handleClose}
                >
                  {category.categoryName}
                </Link>
              </li>
            ))}
            {/* Divider */}
            <div className="px-4 py-3">
              <hr />
            </div>
            {/* Profile */}
            <button
              onClick={handleAccountClick}
              className="p-4 flex items-center gap-2 w-full"
            >
              <Image src={"/user.svg"} alt="user" width={24} height={24} />
              <p className="font-semibold text-shadeBlack">
                {session ? userData?.fullName || t("profile") : t("login")}
              </p>
            </button>
            {/* Divider */}
            <div className="px-4 py-3">
              <hr />
            </div>
            {/* Language Section */}
            <div className="px-4 pt-4 pb-1">
              <p className="text-sm text-[#64748B] font-semibold">
                {t("mobileLanguage")}
              </p>
            </div>
            <button
              onClick={handleLanguageSwitch}
              className="flex items-center justify-between py-[14px] px-4 w-full"
            >
              <p className="text-shadeBlack">
                {locale === "ar" ? "English" : "العربية"}
              </p>
              {locale === "ar" ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
            {/* Divider */}
            <div className="px-4 py-3">
              <hr />
            </div>
            {/* City Section */}
            <div className="px-4 pt-4 pb-1">
              <p className="text-sm text-[#64748B] font-semibold">
                {t("mobileCity")}
              </p>
            </div>
            <div className="flex items-center justify-between py-[14px] px-4">
              <p className="text-shadeBlack">{t("city")}</p>
              {locale === "ar" ? <FaChevronLeft /> : <FaChevronRight />}
            </div>
            {/* Divider */}
            <div className="px-4 py-3">
              <hr />
            </div>
            {/* Balance Section */}
            {userData?.balance !== undefined && userData.balance > 0 && (
              <>
                <div className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/dollar.svg"}
                      alt="dollar"
                      width={24}
                      height={24}
                    />
                    <p className="font-semibold text-shadeBlack">
                      Balance: {userData.balance} SAR
                    </p>
                  </div>
                </div>
                {/* Divider */}
                <div className="px-4 py-3">
                  <hr />
                </div>
              </>
            )}
            {/* Track order and help */}
            <div className="px-4 py-3">
              <Link
                href={"/"}
                className="text-shadeBlack"
                onClick={handleClose}
              >
                {t("trackOrder")}
              </Link>
            </div>
            <div className="px-4 py-3">
              <Link
                href={"/"}
                className="text-shadeBlack"
                onClick={handleClose}
              >
                {t("help")}
              </Link>
            </div>
          </ul>
        </div>
      </div>

      {/* Account Overlay */}
      {isAccountOverlayOpen && (
        <AccountOverlay
          onClose={handleClose}
          onReturn={handleReturn}
          handleLogout={handleLogout}
        />
      )}
    </header>
  );
};

export default MobileNavbar;
