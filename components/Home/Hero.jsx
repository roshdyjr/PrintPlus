import Image from "next/image";
import hero_img from "../../public/Home/Hero_img.svg";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-between text-white bg-black lg:flex-row lg:pl-20">
       <div className="w-full text-center lg:w-1/3 lg:text-left">
        <h2 className="text-[24px] lg:text-[30px] font-[600]">Business cards</h2>
        <p className="mt-4 text-[14px] lg:text-[16px] font-[400]">
          Distinctive business cards featuring unique designs, luxurious details, and unforgettable impressions.
        </p>
        <button className="mt-6 font-semibold text-black transition bg-white rounded-[32px] hover:bg-gray-200 w-[131px] h-[47px]">
          Shop Now
        </button>
      </div>

       <div className="relative w-full mt-8 lg:mt-0 lg:w-2/3">
         <div className="absolute inset-0 bg-gradient-to-b lg:bg-gradient-to-r from-black via-transparent to-transparent"></div>
        <Image
          src={hero_img}
          alt="Business Card"
          className="object-cover w-full h-auto"
        />
      </div>
    </div>
  );
}