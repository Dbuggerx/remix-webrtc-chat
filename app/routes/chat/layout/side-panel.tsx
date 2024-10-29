import { Link, NavLink } from "@remix-run/react";
import { Home, MessageCircleMore, Users } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import DeveloperCard from "./developer-card";

type Props = {
  roomCount: number;
};

export default function SidePanel({ roomCount }: Props) {
  return (
    <aside className="@container pb-4 min-h-full min-w-[65px] border-r bg-white px-2 dark:bg-gray-800 dark:text-white sm:px-6 sm:w-1/2">
      <div className="flex h-20 items-center justify-center border-b sm:justify-center">
        <Link to="/" aria-labelledby="remix-chat-label" className="flex items-center gap-2 font-semibold">
          <MessageCircleMore className="size-10 sm:size-6" />
          <span id="remix-chat-label" className="hidden text-sm sm:block">Remix WebRTC Chat</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="my-6 flex flex-col items-stretch justify-center gap-6 text-sm font-medium sm:my-2 sm:h-auto sm:gap-4">
          <MenuItem
            to="/chat"
            end
            label="Home"
            renderIcon={(className) => <Home className={className} />}
          />
          <MenuItem
            to="/chat/rooms"
            end
            label="Chat Rooms"
            renderIcon={(className) => <Users className={className} />}
            extraSlot={
              <Badge className="ml-auto hidden size-6 shrink-0 items-center justify-center rounded-full sm:flex">
                {roomCount}
              </Badge>
            }
          />
        </nav>
      </div>
      <DeveloperCard />
    </aside>
  );
}

function MenuItem({
  to,
  end,
  label,
  renderIcon,
  extraSlot,
}: {
  label: string;
  renderIcon: (className: string) => React.ReactNode;
  extraSlot?: React.ReactNode;
} & Pick<React.ComponentProps<typeof NavLink>, "to" | "end">) {
  return (
    <NavLink
      to={to}
      end={end}
      aria-label={label}
      className="flex items-center justify-center gap-3 rounded-lg p-2 text-gray-500 transition-all hover:text-gray-900 sm:justify-start dark:text-gray-400 dark:hover:text-gray-50"
    >
      {renderIcon("size-10 min-w-10 sm:size-6")}
      <span className="hidden sm:inline">{label}</span>
      {extraSlot}
    </NavLink>
  );
}
