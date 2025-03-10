"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface AccountOverlayProps {
  onClose: () => void; // Function to close both overlays
  onReturn: () => void; // Function to hide only the second overlay
  handleLogout: () => void; // Function to handle logout
}

const AccountOverlay: React.FC<AccountOverlayProps> = ({
  onClose,
  onReturn,
  handleLogout,
}) => {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-scroll">
      {/* Overlay Header */}
      <div className="flex justify-between items-center py-2 px-5 border-b-2 border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <button
            onClick={onReturn}
            className="size-12 flex items-center justify-center"
          >
            <Image src={"/backIcon.svg"} alt="return" width={24} height={24} />
          </button>
          <h2 className="font-semibold text-shadeBlack">Account</h2>
        </div>
        <button
          onClick={onClose}
          className="size-12 flex items-center justify-center"
        >
          <Image src={"/close.svg"} alt="close" width={24} height={24} />
        </button>
      </div>

      {/* Account Options */}
      <div className="pt-2">
        <ul className="flex flex-col">
          {/* Orders Link */}
          <li className="px-4 py-[14px]">
            <Link
              href="/profile/orders"
              className="font-semibold text-shadeBlack"
              onClick={onClose} // Close both overlays on link click
            >
              Orders
            </Link>
          </li>
          {/* Profile Link */}
          <li className="px-4 py-[14px]">
            <Link
              href="/profile/info"
              className="font-semibold text-shadeBlack"
              onClick={onClose} // Close both overlays on link click
            >
              Profile
            </Link>
          </li>
          <div className="px-4">
            <hr className="w-full self-center" />
          </div>
          {/* Logout Button */}
          <li className="px-4 py-[14px]">
            <button
              onClick={handleLogout}
              className="font-semibold text-shadeBlack"
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountOverlay;
