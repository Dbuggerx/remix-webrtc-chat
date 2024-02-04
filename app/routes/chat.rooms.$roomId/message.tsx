import clsx from "clsx";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";

type Props = {
  msg: string;
  sender: string;
  date: Date;
  fromUser?: boolean;
};

export default function Message({ msg, sender, fromUser, date }: Props) {
  return (
    <div
      className={clsx("flex gap-2 pb-3", {
        "flex-row-reverse justify-end": fromUser,
      })}
    >
      <MsgAvatar name={sender} />
      <div
        className={clsx(
          "flex flex-grow flex-col justify-between gap-2 rounded-lg p-2  sm:flex-row",
          {
            "bg-blue-500 text-white": !fromUser,
            "bg-gray-200 p-2 dark:bg-gray-800": fromUser,
          },
        )}
      >
        {msg}
        <MsgDate date={date} onAccentBg={!fromUser} />
      </div>
    </div>
  );
}

function MsgDate({ date, onAccentBg }: { date: Date; onAccentBg?: boolean }) {
  return (
    <p
      className={clsx("mt-2 self-end text-xs text-gray-300", {
        "text-gray-300": onAccentBg,
        "text-gray-600": !onAccentBg,
      })}
    >
      {date.toLocaleDateString(undefined, {
        hour: "numeric",
      })}
    </p>
  );
}

function MsgAvatar({ name }: { name: string }) {
  return (
    <Tooltip>
      <TooltipTrigger className="cursor-default">
        <Avatar>
          <AvatarFallback className="select-none bg-slate-200 dark:bg-muted">
            {name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent className="select-none">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}
