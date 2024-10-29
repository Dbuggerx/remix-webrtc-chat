import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

import { useLoaderData, useNavigate, useOutletContext } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Input } from "~/components/ui/input";
import { SendIcon } from "lucide-react";
import Message from "./message";
import { TooltipProvider } from "~/components/ui/tooltip";
import type { usePeerServerConnection } from "../chat.rooms/use-peerjs";
import { usePeerjs } from "../chat.rooms/use-peerjs";
import React from "react";
import { getUser } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [{ title: "Remix WebRTC Chat" }];
};

export const handle = {
  label: "$roomId",
  targetPath: "/chat/rooms/$roomId",
};

export const loader = async ({ params, context, request }: LoaderFunctionArgs) => {
  return json({
    peersInTheRoom: Array.from(context.peerClientsById.values())
      .filter((peer) => peer.currentRoom === params.roomId)
      .map((peer) => peer.client.getId()),
    username: (await getUser(request)).username
  });
};

export default function ChatRoomRoute() {
  const navigate = useNavigate();
  const data = useLoaderData<typeof loader>();
  const { peerId, peerRegistration } =
    useOutletContext<ReturnType<typeof usePeerServerConnection>>();
  const { msgs, sendMsgToOtherPeers } = usePeerjs(
    data.peersInTheRoom,
    peerRegistration.current,
    data.username
  );

  React.useEffect(
    function leaveTheRoomWhenNoPeerIdAvailable() {
      if (!peerId) navigate("/");
    },
    [navigate, peerId],
  );

  const [msgToSend, setMsgToSend] = React.useState("");
  const canSendMsg = msgToSend.trim().length > 0;

  const broadcastMsg = React.useCallback(() => {
    if (!canSendMsg) return;
    sendMsgToOtherPeers(msgToSend);
    setMsgToSend("");
  }, [canSendMsg, msgToSend, sendMsgToOtherPeers]);

  if (!peerId) return null;

  return (
    <div className="flex h-full flex-col gap-4 lg:mx-16">
      <TooltipProvider>
        <ScrollArea className="flex flex-1 px-4">
          {msgs.map((m) => (
            <Message
              key={m.date.valueOf()}
              msg={m.payload.text}
              sender={m.payload.username}
              fromUser={m.peerId === peerId}
              date={m.date}
            />
          ))}
        </ScrollArea>
      </TooltipProvider>
      <div className="flex items-center gap-2 border-t p-4 pb-0">
        <Input
          className="flex-grow"
          placeholder="Type a message"
          value={msgToSend}
          onChange={(e) => {
            setMsgToSend(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") broadcastMsg();
          }}
        />
        <Button
          size="icon"
          variant="outline"
          onClick={broadcastMsg}
          disabled={!canSendMsg}
        >
          <SendIcon className="h-6 w-6 p-1 text-foreground" />
        </Button>
      </div>
    </div>
  );
}
