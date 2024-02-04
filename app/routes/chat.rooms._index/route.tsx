import { json } from "@remix-run/node";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import React from "react";
import type { usePeerServerConnection } from "../chat.rooms/use-peerjs";

export const meta: MetaFunction = () => {
  return [{ title: "Remix WebRTC Chat - Rooms" }];
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const form = await request.formData();
  const peerId = form.get("peerId");
  const room = form.get("room");
  if (typeof peerId !== "string" || typeof room !== "string") {
    return json({ room: "" });
  }

  const currentPeer = context.peerClientsById.get(peerId);
  if (!currentPeer) {
    return json({ room: "" });
  }

  currentPeer.client.send({ type: "welcome!!!" });
  currentPeer.currentRoom = room;

  return json({
    room,
  });
};

export const loader = async () => {
  return json({
    rooms: Array.from({ length: 10 }, (_, i) => ({
      id: i,
      name: `Room ${i + 1}`,
      userCount: Math.ceil(Math.random() * 10),
    })),
  });
};

export default function ChatRoomsRoute() {
  const data = useLoaderData<typeof loader>();
  const { peerId } =
    useOutletContext<ReturnType<typeof usePeerServerConnection>>();
  const fetcher = useFetcher<typeof action>();
  const navigate = useNavigate();

  React.useEffect(
    function redirectOnFetcherData() {
      if (!fetcher.data?.room) return;
      navigate(`/chat/rooms/${fetcher.data.room}`);
    },
    [fetcher.data?.room, navigate],
  );

  return (
    <ScrollArea className="max-h-fit rounded-lg border shadow-sm lg:mx-16">
      <Table>
        <TableHeader className="sticky top-0 bg-secondary">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-1/6 text-center md:w-1/4">Users</TableHead>
            <TableHead className="w-1/6 text-center md:w-1/4"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-slate-50 dark:bg-slate-700">
          {data.rooms.map((room) => (
            <TableRow key={room.id}>
              <TableCell className="font-medium">{room.name}</TableCell>
              <TableCell className="text-center">{room.userCount}</TableCell>
              <TableCell className="text-center">
                <fetcher.Form method="post">
                  <input type="hidden" name="room" value={room.name} />
                  <input type="hidden" name="peerId" value={peerId ?? ""} />
                  <Button size="sm" variant="outline">
                    Join
                  </Button>
                </fetcher.Form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
