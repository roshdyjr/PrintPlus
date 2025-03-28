import Image from "next/image";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean; // New prop for loading state
  icon?: string;
}

const CustomButton: React.FC<ButtonProps> = ({
  type = "button",
  label,
  onClick,
  disabled = false,
  className = "",
  isLoading = false,
  icon
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`w-full md:min-w-[96px] h-[56px] md:h-[36px] md:w-fit flex items-center justify-center gap-2 rounded-[32px] md:rounded-[20px] p-4 md:px-3 md:py-[6px] xlg:py-[9px] xlg:px-[18px] xlg:text-[20px] xlg:rounded-[30px] font-bold text-white text-sm transition-all 
          ${
            disabled || isLoading ? "bg-[#E0E0E0] text-[#C9C9C9]" : "bg-shadeBlack"
          } 
          ${className}`}
    >
      {icon && <Image src={icon} alt="icon" width={10} height={10} className="w-[20px] h-[20px] xlg:w-[30px] xlg:h-[30px]"/> }
      {label}
      {isLoading && (
        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
      )}
    </button>
  );
};

export default CustomButton;
