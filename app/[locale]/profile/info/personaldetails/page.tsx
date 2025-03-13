import PersonalDetailsForm from "@/components/ProfileComponents/ProfileInfoComponents/PersonalDetailsForm";
import UpdateEmailForm from "@/components/ProfileComponents/ProfileInfoComponents/UpdateEmailForm";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

// Metadata Page Title
export const metadata = {
  title: "Print Plus - Personal Details",
};

const page = () => {
  return (
    <div className="flex flex-col gap-[39px] text-shadeBlack max-w-[784px] xlg:gap-6 xlg:max-w-[1176px]">
      {/* Navigation Title */}
      <div className="flex items-center gap-2 xlg:gap-3">
        <p className="text-sm xlg:text-[20px]">profile</p>
        <FaChevronRight className="size-[10px] xlg:size-[16px]" />
        <p className="text-[#475569] text-sm xlg:text-[20px]">personal details</p>
      </div>
      {/* Page Header */}
      <p className="text-3xl font-semibold xlg:text-[32px]">Profile</p>

      {/* Personal Details Form */}
      <div className="flex flex-col gap-6 xlg:gap-9">
        <hr />
        {/* Personal Details Form */}
        <PersonalDetailsForm />
        <hr />
        {/* Update Email Form */}
        <UpdateEmailForm />
        <hr />
      </div>
    </div>
  );
};

export default page;
