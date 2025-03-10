"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Balance {
  balance: number;
}

const links = [
  { href: "/profile/orders", label: "Orders" },
  { href: "/profile/info", label: "Profile" },
  { href: "/profile/addressbook", label: "Address Book" },
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProfileSideBar = () => {
  const { data: session, status } = useSession(); // Get the session and its status
  const pathname = usePathname(); // Get current route
  const [balance, setBalance] = useState<Balance | null>(null); // Initialize as null
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    // Only fetch data if the user is authenticated, the token is available, and balance is not already set
    if (status === "authenticated" && session?.user?.token && !balance) {
      const getBalance = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${API_BASE_URL}/users/get`, {
            headers: {
              "Accept-Language": "ar-SA",
              Authorization: `Bearer ${session.user.token}`,
            },
          });
          if (response.data.success) {
            setBalance(response.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch balance data", error);
          toast.error("حدث خطأ في جلب الرصيد");
        } finally {
          setIsLoading(false);
        }
      };
      getBalance();
    }
  }, [session?.user?.token, status]);

  return (
    <div className="hidden lg:flex lg:w-[217px] h-[350px] max-w-[217px] xlg:w-[276px] xlg:max-w-[276px]">
      <div className="w-full h-[222px] flex flex-col">
        <div className="flex flex-col gap-1 xlg:gap-[6px]">
          {/* NavLinks map */}
          {links.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`h-[36px] font-semibold text-shadeBlack py-[9px] ps-4 pe-5 rounded-[26px] flex flex-col justify-center gap-1 xlg:gap-[6px] xlg:h-[54px] xlg:py-[13.5px] xlg:ps-[24px] xlg:pe-[30px] ${
                  isActive ? "bg-[#E0E7FF] text-[#4F46E5]" : ""
                }`}
              >
                <p className={`text-sm ${isActive ? "text-[#4F46E5]" : ""} xlg:text-[20px]`}>
                  {label}
                </p>
              </Link>
            );
          })}
          <hr />
          {/* Balance Amount */}
          {balance?.balance !== undefined && balance.balance > 0 && (
            <div className="h-[36px] flex items-center gap-2 rounded-lg py-[9px] lg:ps-4 pe-5 xlg:h-[54px]">
              <Image
                src={"/dollar.svg"}
                alt="dollar"
                width={24}
                height={24}
                className="xlg:w-9 xlg:h-9"
              />
              <p className="font-semibold text-shadeBlack text-nowrap text-xs lg:text-base xlg:text-xl">
                Balance: {isLoading ? "Loading..." : `${balance.balance} SAR`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSideBar;