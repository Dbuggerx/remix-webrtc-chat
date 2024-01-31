import { Link, NavLink } from "@remix-run/react";
import { Home, MessageCircleMore, Users } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import DeveloperCard from "./developer-card";

type Props = {
  roomCount: number;
};

export default function SidePanel({ roomCount }: Props) {
  return (
    <aside className="@container min-w-[65px] max-w-[12em] h-full flex-1 border-r bg-white dark:bg-gray-800 dark:text-white">
      <div className="@xxs:px-6 flex h-20 items-center border-b justify-center @xxs:justify-start">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <MessageCircleMore className="size-10 @xxs:size-6" />
          <span className="hidden text-sm @xxs:block">Remix WebRTC Chat</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-center text-sm font-medium @xxs:h-auto gap-6 h-36 @xxs:gap-1 my-6 @xxs:my-2 justify-center @xxs:justify-start">
          <NavLink
            to="/chat"
            end
            className="flex items-center gap-3 rounded-lg  @xxs:px-6 p-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Home className="@xxs:size-6 size-10" />
            <span className="hidden @xxs:inline">Home</span>
          </NavLink>
          <NavLink
            to="/chat/rooms"
            end
            className="flex items-center gap-3 rounded-lg  @xxs:px-6 p-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Users className="@xxs:size-6 size-10" />
            <span className="hidden @xxs:inline">Chat Rooms</span>
            <Badge className="hidden @xxs:flex ml-auto size-6 shrink-0 items-center justify-center rounded-full">
              {roomCount}
            </Badge>
          </NavLink>
        </nav>
      </div>
      <DeveloperCard />
    </aside>
  );
}
