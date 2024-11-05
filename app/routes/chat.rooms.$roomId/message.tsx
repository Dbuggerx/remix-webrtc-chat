import clsx from "clsx";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import MobileFriendlyTooltip from "~/components/ui/mobile-friendly-tooltip";

type Props = {
  msg: string;
  sender: string;
  date: Date;
  fromUser?: boolean;
};

export default function Message({ msg, sender, fromUser, date }: Props) {
  return (
    <div
      className={clsx("flex gap-2 pb-3 max-w-full", {
        "flex-row-reverse justify-end": fromUser,
      })}
      role="log"
    >
      <MsgAvatar name={sender} />
      <div
        className={clsx(
          "flex flex-grow flex-col justify-between gap-2 rounded-lg p-2 overflow-hidden sm:flex-row",
          {
            "bg-blue-500 text-white": !fromUser,
            "bg-gray-200 p-2 dark:bg-gray-800": fromUser,
          },
        )}
      >
        <div className="overflow-auto">{msg}</div>
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
        minute: "numeric"
      })}
    </p>
  );
}

function MsgAvatar({ name }: { name: string }) {
  return (
    <MobileFriendlyTooltip
      trigger={
        <Avatar>
          <AvatarFallback className="select-none bg-slate-200 dark:bg-muted">
            {name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      }
      content={<p>{name}</p>}
    />
  );
}
