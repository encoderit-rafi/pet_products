import { useTheme } from "@/context/ThemeProvider";
import FullLogo from "@/assets/icons/logo/FullLogo";
import FullLogoLight from "@/assets/icons/logo/FullLogoLight";

export default function ToggleLogo() {
  const { theme } = useTheme();

  return (
    <>
      {theme == "dark" ? (
        <FullLogo className="h-[2.375rem] w-[10.5rem]" />
      ) : (
        <FullLogoLight className="h-[2.375rem] w-[10.5rem]" />
      )}
    </>
  );
}
