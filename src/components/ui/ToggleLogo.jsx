import { useTheme } from "@/context/ThemeProvider";
import FullLogo from "@/assets/icons/logo/FullLogo";

export default function ToggleLogo() {
  const { theme } = useTheme();

  return (
    <>
      <FullLogo
        className="h-[2.375rem] w-[10.5rem]"
        fill={theme == "dark" ? "#ffffff" : "#000000"}
      />
      {/* {theme == "dark" ? (
      ) : (
        // <Logo className="size-24" />
        <FullLogoLight className="h-[2.375rem] w-[10.5rem]" />
      )} */}
    </>
  );
}
