import UserMenu from "./user-menu";
import { ThemeModeToggle } from "~/components/theme-mode-toggle";

export default function Header({
  currentUsername,
}: {
  currentUsername?: string;
}) {
  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <ThemeModeToggle />
          </div>
        </form>
      </div>
      {currentUsername ? <UserMenu username={currentUsername} /> : "???"}
    </header>
  );
}
