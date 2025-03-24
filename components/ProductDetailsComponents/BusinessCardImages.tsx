"use client";
import Image from "next/image";
import { useState } from "react";
import business_1 from "/public/business_1.svg";
import business_2 from "/public/business_2.svg";
import business_3 from "/public/business_3.svg";

export default function BusinessCardImages() {
  // State to manage the currently displayed main image
  const [mainImage, setMainImage] = useState(business_1);

  // Array of thumbnail images
  const images = [business_3, business_2, business_3];

  return (
    // Main container for the sticky images and product details section
    <div className="sticky top-0 flex flex-col gap-[25.34px] w-full xlg:min-w-[735px]">
      {/* Container for the main image and thumbnails */}
      <div className="flex flex-col gap-[26.3px]">
        {/* Main Image */}
        <Image
          src={mainImage}
          alt="Business Cards"
          width={735}
          height={490}
          className="rounded-[6.58px]" // Optional: Add rounded corners to the main image
        />

        {/* Thumbnails Container */}
        <div className="flex items-center gap-[23.85px]">
          {images.map((image, index) => (
            // Individual Thumbnail Wrapper
            <div
              key={index}
              className="xlg:rounded-[6.58px] xlg:w-[139px] xlg:h-[109px]"
            >
              {/* Thumbnail Image */}
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="h-full cursor-pointer w-full object-cover rounded-[6.58px] hover:border-black"
                onClick={() => setMainImage(image)} // Update the main image on click
              />
            </div>
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="text-sm text-gray-700 flex flex-col gap-3 xlg:gap-[23.85px]">
        {/* Product Details Heading */}
        <h3 className="text-[15px] text-[#2E2E2E] font-medium xlg:text-[21px]">
          Product details
        </h3>

        {/* Product Details List */}
        <ul className="list-disc pl-5 text-[12px] font-[300] text-black xlg:text-[18px]">
          <li className="leading-[164%]">
            Lorim Epsum Dolore Set Amet, Concrete Edbesching Elite.
          </li>
          <li className="leading-[164%]">
            Mr. Akomsan XA O Orna Comodo Rartrum., Festolum Volbetat Henererett
            Lacos, in Voga Nessi Veninsneh Nick.
          </li>
          <li className="leading-[164%]">
            Coe Di Set Amet Sim Penilisky Empiret., Vivamos Tizitics Set Borus
            Set Indiredom.
          </li>
          <li className="leading-[164%]">
            Morty Inn Lorim in the Dolore Tinysident Mobility A Sayed Nula.
          </li>
          <li>
            Bruyne Libre Nonk, Maleswada Ak Tortor in, Porta Gravida Dawi.,
            Society Putnte.
          </li>
          <li className="leading-[164%]">
            Vivamos Portter, Metos Vital Empiret, Bhaicula, Neb Nunk
            Condemmintom Coam, Nick Feverira Epsum Essom in Magna.
          </li>
        </ul>
      </div>
    </div>
  );
}