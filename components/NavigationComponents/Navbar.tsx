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

  useEffect(() => {
    const getCategories = async () => {
      const categories = await fetchCategories();
      setCategories(categories);
    };

    getCategories();
  }, []);

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

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="hidden lg:flex flex-col gap-4">
      {/* Navbar */}
      <nav className="flex flex-col gap-[10px]">
        {/* Navbar shipping header */}
        <div className="bg-[#F1F5F9] flex justify-center items-center h-[32px]">
          <div className="flex items-center gap-2">
            <Image src={"/truck.svg"} alt="delivery" width={16} height={16} />
            <p className="text-xs text-[#334155]">
              Free shipping for orders over 50SAR
            </p>
          </div>
        </div>
        {/* Main Navbar Items */}
        <div className="px-12 flex items-center gap-14 w-full 2xl:max-w-[1927px] 2xl:self-center">
          {/* Logo */}
          <Link href={"/"} className="flex items-center justify-center">
            <Image src={"/logo.svg"} alt="logo" width={78} height={47} />
          </Link>
          {/* Searchbar, account, language and cart */}
          <div className="flex items-center gap-[31px] flex-1">
            <SearchBar />
            <div className="flex items-center gap-1 text-shadeBlack">
              {/* Profile Button */}
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="px-3 py-[10px] rounded-lg flex items-center justify-center gap-2"
                >
                  <Image src={"/user.svg"} alt="user" width={20} height={20} />
                  <p className="font-medium text-sm text-nowrap">
                    {session ? userData?.fullName || "Profile" : "Log in"}
                  </p>
                </button>
                {/* Dropdown Menu */}
                {isDropdownOpen && session && (
                  <NavbarDropDown
                    userData={userData}
                    handleLogout={handleLogout}
                  />
                )}
              </div>
              {/* Language Button */}
              <button className="px-3 py-[10px] rounded-lg flex justify-center items-center">
                <p className="font-semibold text-base">ع</p>
              </button>
              {/* Cart Button */}
              <Link
                href={"/"}
                className="rounded-lg flex justify-center items-center"
              >
                <Image
                  src={"/cart.svg"}
                  alt="cart"
                  width={28}
                  height={28}
                  className="w-full min-w-[24px]"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Nav Links */}
      <div className="px-12 h-[44px] border-b border-[#E2E8F0] flex justify-center items-center">
        <div className="flex items-center gap-4">
          {categories.map((category) => (
            <Link
              href={`/category/${category.categoryId}`} // Link to the category page
              key={category.categoryId}
              className="text-sm text-shadeBlack text-nowrap lg:py-[10px] xl:px-2 xl:text-base"
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
