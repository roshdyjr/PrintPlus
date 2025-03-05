import AddressDetails from "@/components/ProfileComponents/ProfileInfoComponents/AddressDetails";
import PasswordDetails from "@/components/ProfileComponents/ProfileInfoComponents/PasswordDetails";
import PersonalDetails from "@/components/ProfileComponents/ProfileInfoComponents/PersonalDetails";
import React from "react";

// Metadata Page Title
export const metadata = {
  title: "Print Plus - Profile",
};

const Page = () => {
  return (
    <div className="flex flex-col gap-6 text-shadeBlack">
      {/* Information header */}
      <p className="text-2xl text-shadeBlack xlg:font-semibold xlg:text-[32px]">Profile</p>
      <div className="flex flex-col gap-6 max-w-[784px] xlg:gap-9 xlg:max-w-[1176px]">
        {/* Personal Details */}
        <PersonalDetails />
        <hr />
        {/* Password Details */}
        <PasswordDetails />
        <hr />
        {/* Address Details */}
        <AddressDetails />
        <hr />
      </div>
    </div>
  );
};

export default Page;
