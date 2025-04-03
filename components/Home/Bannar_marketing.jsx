import Image from "next/image";
import bannar_marketing from "../../public/Home/bannar_marketing.svg";

export default function Bannar_marketing() {
  return (
    <div className="py-5 md:px-20 3xl:px-40 px-[16px]">
      <div className="flex flex-col md:flex-row items-center justify-between rounded-lg bg-[#F1F5F9] h-auto md:h-[260px]">
         <div className="p-6 text-center md:pl-20 md:pr-10 md:text-left">
          <h2 className="font-[600] text-[#0F172A] text-[24px] sm:text-[28px] md:text-[30px]">
            Another marketing message
          </h2>
          <p className="mt-2 text-[14px] sm:text-[16px] font-[400] text-[#0F172A]">
            Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod. Lorem ipsum dolor sit amet consectetur.
          </p>
          <button className="px-5 py-2 mt-4 text-white bg-black w-[131px] h-[47px] rounded-[32px]">
            Shop Now
          </button>
        </div>

         <div className="w-full ">
          <Image
            src={bannar_marketing}
            alt="Marketing"
            className="object-cover   h-auto md:h-[260px]  "
          />
        </div>
      </div>
    </div>
  );
}