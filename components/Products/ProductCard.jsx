import Image from "next/image";

const ProductCard = ({ product }) => {
  return (
    <div className="">
      <div className="relative">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={150}
          className="w-full h-auto rounded-md"
        />
        {product.isNew && (
          <span className="absolute bottom-2 left-2 bg-[#0F172A] text-white text-xs px-2 py-1 rounded-[20px]">
            New
          </span>
        )}
        {product.discount && (
          <span className="absolute  bottom-2 left-2 bg-[#BE123C] text-white text-xs px-2 py-1 rounded-[20px]">
            -{product.discount}
          </span>
        )}
      </div>
      <h3 className="text-[14px] font-bold mt-2 text-[#000000]">
        {product.title}
      </h3>
      <p className="text-gray-500">
        starts from <span className="text-[#6366F1]">{product.price}</span>SAR
      </p>
    </div>
  );
};

export default ProductCard;
