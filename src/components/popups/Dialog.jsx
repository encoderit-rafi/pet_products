import cn from "@/lib/utils/cn";

const Dialog = ({ title, isOpen, children, className }) => {
  return (
    <div
      className={`fixed !m-0 inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
        isOpen ? "visible bg-black/10 backdrop-blur-sm" : "invisible"
      }`}
    >
      <div
        className={cn(
          "w-full h-fit m-3 text-custom_text_two  shadow-sm bg-custom_bg_nine rounded-2xl py-6 px-8",
          {
            "animate-jump": isOpen,
            "animate-jump-out": !isOpen,
          },
          className
        )}
      >
        <h2 className="text-base font-semibold text-center capitalize ">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
