import LogoutIcon from "@/assets/icons/LogoutIcon";

export default function ButtonLogout({ ...props }) {
  return (
    <button
      {...props}
      className="text-xs font-light transition-all duration-500 text-custom_text_six hover:text-red-500"
    >
      <div className="flex flex-col items-center gap-2 text-center capitalize py-4">
        <LogoutIcon className="w-4" />

        <p>log out</p>
      </div>
    </button>
  );
}
