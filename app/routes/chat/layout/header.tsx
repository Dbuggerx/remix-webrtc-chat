import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import UserMenu from "./user-menu";

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
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              placeholder="Search contacts..."
              type="search"
            />
          </div>
        </form>
      </div>
      {currentUsername ? <UserMenu username={currentUsername} /> : "???"}
    </header>
  );
}
