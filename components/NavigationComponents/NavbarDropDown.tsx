"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface NavbarDropDownProps {
  userData: {
    fullName: string;
    balance: number;
  } | null;
  handleLogout: () => void;
  closeDropdown: () => void; // Add this line
}

const NavbarDropDown: React.FC<NavbarDropDownProps> = ({
  userData,
  handleLogout,
  closeDropdown, // Add this line
}) => {
  const { data: session, status } = useSession(); // Get the session and its status
  const t = useTranslations("NavbarDropdown")

  const handleLogoutClick = async () => {
    try {
      // Call the logout API
      const response = await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            "Accept-Language": "en-US",
            Authorization: `Bearer ${session?.user.token}`, // Use the token from userData
          },
        }
      );

      if (response.data.success) {
        // Log success message
        console.log(response.data.message || "Logout Successful");
      } else {
        // Log error
        console.log(response.data.message || "Logout Failed");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      // Call the handleLogout function to clear the session
      handleLogout();
      closeDropdown(); // Close the dropdown after logout
    }
  };

  return (
    <div className="absolute left-0 w-[204px] rounded-lg border border-cardBorder z-50 bg-white">
      <div className="py-2 px-1 flex flex-col gap-[2px]">
        {/* Orders Link */}
        <Link
          href="/profile/orders"
          className="h-9 py-[9px] ps-[15px] pe-5 rounded-lg flex items-center text-shadeBlack font-normal text-sm hover:bg-gray-100 transition-colors duration-200"
          onClick={closeDropdown} // Add this line
        >
          {t("orders")}
        </Link>
        {/* Profile Link */}
        <Link
          href="/profile/info"
          className="h-9 py-[9px] ps-[15px] pe-5 rounded-lg flex items-center text-shadeBlack font-normal text-sm hover:bg-gray-100 transition-colors duration-200"
          onClick={closeDropdown} // Add this line
        >
          {t("profile")}
        </Link>
        {/* Balance Amount */}
        {userData?.balance !== undefined && userData.balance > 0 && (
          <>
            <hr className="w-[164px] self-center" />
            <div className="h-[36px] flex items-center gap-2 rounded-lg py-[9px] lg:ps-4 pe-5 xlg:h-[54px] hover:bg-gray-100 transition-colors duration-200">
              <Image src={"/dollar.svg"} alt="dollar" width={24} height={24} />
              <p className="font-semibold text-shadeBlack text-nowrap text-sm">
               {t("balance")}: {userData.balance} {t("currency")}
              </p>
            </div>
          </>
        )}
        <hr className="w-[164px] self-center" />
        {/* Logout Button */}
        <button
          onClick={handleLogoutClick}
          className="h-9 py-[9px] ps-[15px] pe-5 rounded-lg flex items-center text-shadeBlack font-normal text-sm hover:bg-gray-100 transition-colors duration-200"
        >
          {t("logout")}
        </button>
      </div>
    </div>
  );
};

export default NavbarDropDown;
