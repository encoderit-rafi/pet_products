import ToggleLogo from "./ToggleLogo";
import ButtonToggleTheme from "../buttons/ButtonToggleTheme";
import NotificationButton from "../buttons/NotificationButton";
import ProfileCard from "../cards/ProfileCard";

export default function Header() {
  return (
    <header className="flex items-center justify-between pl-5 text-white">
      <ToggleLogo />
      <div className="flex items-center gap-5">
        <ButtonToggleTheme />
        <NotificationButton />
        <ProfileCard />
      </div>
    </header>
  );
}
