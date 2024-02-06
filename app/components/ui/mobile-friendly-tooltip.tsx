import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export default function MobileFriendlyTooltip({
  trigger,
  content,
}: {
  trigger: React.ReactNode;
  content: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen} delayDuration={0}>
      <TooltipTrigger
        className="cursor-default"
        onTouchStart={() => {
          setOpen(true);
        }}
        onTouchEnd={() => {
          setOpen(false);
        }}
        onBlur={() => {
          setOpen(false);
        }}
      >
        {trigger}
      </TooltipTrigger>
      <TooltipContent className="select-none">{content}</TooltipContent>
    </Tooltip>
  );
}
