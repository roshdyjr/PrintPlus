import Link from "next/link";
import React from "react";

const PasswordDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <p className="text-lg font-semibold xlg:text-[24px]">Password</p>
        <Link href={"/profile/info/password"} className="text-sm text-[#475569] font-semibold xlg:text-[20px]">
          Change password
        </Link>
      </div>
      <div className="text-base font-semibold xlg:text-[20px]">• • • • • • • •</div>
    </div>
  );
};

export default PasswordDetails;
