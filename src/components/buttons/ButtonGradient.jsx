import cn from "@/lib/utils/cn";

export default function ButtonGradient({ children, className }) {
  return (
    <button
      className={cn(
        "w-full  py-3 font-normal rounded-xl whitespace-nowrap bg-gradient-to-r from-[#00B451]  to-[#74B222] text-sm capitalize",
        className
      )}
    >
      {children}
    </button>
  );
}
