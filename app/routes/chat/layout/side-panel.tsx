import { Link, NavLink } from "@remix-run/react";
import { Home, MessageCircleMore, Users } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import DeveloperCard from "./developer-card";
import TopBar from "./top-bar";

type Props = {
  roomCount: number;
};

export default function SidePanel({ roomCount }: Props) {
  return (
    <aside className="@container overflow-auto min-w-[65px] sm:w-1/2 lg:max-xl:w-1/3 xl:w-1/4 border-r bg-white dark:bg-gray-800 px-2 sm:px-6 pb-4 flex flex-col h-full">
      <TopBar content="centered">
        <Link
          to="/"
          aria-labelledby="remix-chat-label"
          className="flex items-center gap-2 font-semibold"
        >
          <MessageCircleMore className="size-10 sm:size-6" />
          <span id="remix-chat-label" className="hidden text-sm sm:block">
            Remix WebRTC Chat
          </span>
        </Link>
      </TopBar>
      <div className="flex-1 shrink-0 py-2">
        <nav className="my-6 flex flex-col items-stretch justify-center gap-6 text-sm font-medium sm:my-2 sm:gap-4">
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
      className="flex items-center justify-center gap-3 rounded-lg p-2 text-foreground transition-all hover:text-muted-foreground sm:justify-start"
    >
      {renderIcon("size-10 min-w-10 sm:size-6")}
      <span className="hidden sm:inline">{label}</span>
      {extraSlot}
    </NavLink>
  );
}
