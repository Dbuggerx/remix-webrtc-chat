import { Link, NavLink } from "@remix-run/react";
import { Home, MessageCircleMore, Users } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import DeveloperCard from "./developer-card";

type Props = {
  roomCount: number;
};

export default function SidePanel({ roomCount }: Props) {
  return (
    <aside className="h-full min-w-[65px] max-w-[12em] flex-1 border-r bg-white @container dark:bg-gray-800 dark:text-white">
      <div className="flex h-20 items-center justify-center border-b @xxs:justify-start @xxs:px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <MessageCircleMore className="size-10 @xxs:size-6" />
          <span className="hidden text-sm @xxs:block">Remix WebRTC Chat</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="my-6 grid h-36 items-center justify-center gap-6 text-sm font-medium @xxs:my-2 @xxs:h-auto @xxs:justify-start @xxs:gap-1">
          <NavLink
            to="/chat"
            end
            className="flex items-center gap-3 rounded-lg  p-2 text-gray-500 transition-all hover:text-gray-900 @xxs:px-6 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Home className="size-10 @xxs:size-6" />
            <span className="hidden @xxs:inline">Home</span>
          </NavLink>
          <NavLink
            to="/chat/rooms"
            end
            className="flex items-center gap-3 rounded-lg  p-2 text-gray-500 transition-all hover:text-gray-900 @xxs:px-6 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Users className="size-10 @xxs:size-6" />
            <span className="hidden @xxs:inline">Chat Rooms</span>
            <Badge className="ml-auto hidden size-6 shrink-0 items-center justify-center rounded-full @xxs:flex">
              {roomCount}
            </Badge>
          </NavLink>
        </nav>
      </div>
      <DeveloperCard />
    </aside>
  );
}
