import { Link } from "@remix-run/react";
import { Home, MessageCircleMore, Users } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import DeveloperCard from "./developer-card";

type Props = {
  roomCount: number;
};

export default function SidePanel({ roomCount }: Props) {
  return (
    <div className="w-64 border-r bg-white dark:bg-gray-800">
      <div className="flex h-[60px] items-center border-b px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <MessageCircleMore className="h-6 w-6" />
          <span className="text-sm">Remix WebRTC Chat</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
          <Link
            to="/chat/rooms"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          >
            <Users className="h-4 w-4" />
            Chat Rooms
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              {roomCount}
            </Badge>
          </Link>
        </nav>
      </div>
      <aside className="p-4">
        <DeveloperCard />
      </aside>
    </div>
  );
}
