import React from "react";

interface AddressCardProps {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
}

const AddressCard: React.FC<AddressCardProps> = ({ name, address, city, country, phone }) => {
  return (
    <div className="border border-[#E2E8F0] bg-[#FAFDFF] rounded-[12px] p-4 shadow-sm flex flex-col gap-2">
      <h2 className="font-semibold text-lg">{name}</h2>
      <p>{address}</p>
      <p>{city}</p>
      <p>{country}</p>
      <p>Phone: {phone}</p>

      <hr className="border-0 h-[1px] bg-[#E2E8F0]" />

      <div className="flex items-center gap-4">
        <button className="font-medium hover:underline">Edit</button>
        <span className="inline-block w-[2px] h-4 bg-[#E2E8F0]" />
        <button className="text-red-600 font-medium hover:underline">Remove</button>
      </div>
    </div>
  );
};

export default AddressCard;
