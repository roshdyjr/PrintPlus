import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CustomButton from "@/components/SharedComponents/CustomButton";
import AddressCard from "@/components/ProfileComponents/AddressCard";
import { useLocale, useTranslations } from "next-intl";

// Metadata Page Title
export const metadata = {
  title: "Print Plus - Personal Details",
};

const page = () => {
  const t = useTranslations("ProfileAddressBook");
  const locale = useLocale();
  const addresses = [
    {
      name: "Fahad Al-Salem",
      address: "Al-Masjid Al-Haram, Makkah, 12345",
      city: "Makkah",
      country: "Saudi Arabia",
      phone: "+966 5 1234 5678",
    },
    {
      name: "Zara Al-Farooq",
      address: "Al-Masjid Road, Jeddah, 12345",
      city: "Jeddah",
      country: "Saudi Arabia",
      phone: "+966 5 456 5678",
    },
    {
      name: "Omar Al-Nasser",
      address: "King Abdulaziz Road, Riyadh, 67890",
      city: "Riyadh",
      country: "Saudi Arabia",
      phone: "+966 5 9876 5432",
    },
    {
      name: "Layla Al-Mansoori",
      address: "Al-Nour Street, Riyadh, 67890",
      city: "Riyadh",
      country: "Saudi Arabia",
      phone: "+966 5 3421 7890",
    },
  ];

  return (
    <div className="flex flex-col text-shadeBlack max-w-[784px] gap-6 xlg:max-w-[1176px] xlg:gap-9">
      {/* Navigation Title */}
      <div className="hidden md:flex items-center gap-2 xlg:gap-3">
        <p className="text-sm xlg:text-[20px]">{t("profile")}</p>
        {locale === "ar" ? (
          <FaChevronLeft className="size-[10px] xlg:size-[16px]" />
        ) : (
          <FaChevronRight className="size-[10px] xlg:size-[16px]" />
        )}
        <p className="text-[#475569] text-sm xlg:text-[20px]">
          {t("addressBook")}
        </p>
      </div>

      <p className="text-3xl font-semibold xl:text-[25px] px-2 md:px-0">
        <span className="md:hidden">{t("profile")}</span>
        <span className="hidden md:inline">{t("addressBook")}</span>
      </p>

      {/* Add Address Button */}
      <div className="flex flex-col-reverse md:flex-col gap-6 px-2 md:px-0 xlg:gap-9">
        <CustomButton
          label={t("addAddress")}
          className="md:!h-[32px] md:!w-[113px] xl:!w-[170px] xl:!h-[38px] !xl:text-[17px] font-medium  xlg:!w-[216px] xlg:!h-[48px] xlg:!px-9 text-nowrap"
          type="button"
        />

        {/* Grid of Addresses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((item, index) => (
            <AddressCard
              key={index}
              name={item.name}
              address={item.address}
              city={item.city}
              country={item.country}
              phone={item.phone}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
