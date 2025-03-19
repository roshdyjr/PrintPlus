import { useTranslations } from "next-intl";
import React from "react";

interface AddressCardProps {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
}

const AddressCard: React.FC<AddressCardProps> = ({
  name,
  address,
  city,
  country,
  phone,
}) => {
  const t = useTranslations("ProfileAddressBook");
  return (
    <div className="border border-[#E2E8F0] bg-[#FAFDFF] rounded-[12px] p-4 shadow-sm flex flex-col gap-2 xlg:p-6 xlg:gap-[9px]">
      <h2 className="font-semibold text-lg xlg:text-[22px]">{name}</h2>
      <p className="xlg:text-[20px]">{address}</p>
      <p className="xlg:text-[20px]">{city}</p>
      <p className="xlg:text-[20px]">{country}</p>
      <p className="xlg:text-[20px]">Phone: {phone}</p>

      <hr className="border-0 h-[1px] bg-[#E2E8F0]" />

      <div className="flex items-center gap-4">
        <button className="font-medium hover:underline xlg:text-[20px] xlg:font-medium">
          {t("edit")}
        </button>
        <span className="inline-block w-[2px] h-4 bg-[#E2E8F0]" />
        <button className="text-[#BE123C] font-medium hover:underline xlg:text-[20px] xlg:font-medium">
          {t("remove")}
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
