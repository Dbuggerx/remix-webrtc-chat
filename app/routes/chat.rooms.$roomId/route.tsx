import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Input } from "~/components/ui/input";
import { SendIcon } from "lucide-react";
import Message from "./message";
import { TooltipProvider } from "~/components/ui/tooltip";

export const meta: MetaFunction = () => {
  return [{ title: "Remix WebRTC Chat" }];
};

export const handle = {
  label: "$roomId",
  targetPath: "/chat/rooms/$roomId",
};

export const loader = async () => {
  return json({
    msgs: Array.from({ length: 20 }, (_, i) => ({
      id: i,
      receivedAt: new Date(),
      msg: `msg #${i + 1}`,
      fromUser: Boolean(Math.ceil(Math.random() * 2) - 1),
      sender: ["aaa", "bbb", "user"][Math.ceil(Math.random() * 3) - 1],
    })),
  });
};

export default function ChatRoomRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="flex h-full flex-col gap-4 lg:mx-16">
      <TooltipProvider>
        <ScrollArea className="flex flex-1 px-4">
          {data.msgs.map((m) => (
            <Message
              key={m.id}
              msg={m.msg}
              sender={m.sender}
              fromUser={m.fromUser}
              receivedAt={new Date(m.receivedAt)}
            />
          ))}
        </ScrollArea>
      </TooltipProvider>
      <div className="flex items-center gap-2 border-t p-4 pb-0">
        <Input className="flex-grow" placeholder="Type a message" />
        <Button size="icon" variant="outline">
          <SendIcon className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}