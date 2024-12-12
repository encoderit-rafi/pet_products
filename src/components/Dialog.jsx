import cn from "@/lib/utils/cn";

const Dialog = ({ title, isOpen, children, className }) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
        isOpen ? "visible bg-black/10 backdrop-blur-sm" : "invisible"
      }`}
    >
      <div
        className={cn(
          "w-96 h-20 capitalize shadow-sm bg-custom_bg_nine rounded-2xl p-7",
          {
            "animate-jump-in": isOpen,
            "animate-jump-out": !isOpen,
          },
          className
        )}
      >
        <h2 className="text-base font-medium text-center text-custom_text_two">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
