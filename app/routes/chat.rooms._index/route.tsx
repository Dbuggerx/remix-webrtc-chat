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
import type { usePeerjs } from "../chat.rooms/use-peerjs";
import React from "react";
import { setPeerId } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [{ title: "Remix WebRTC Chat - Rooms" }];
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
  const form = await request.formData();
  const peerId = form.get("peerId");
  const redirectTo = form.get("redirectTo");
  if (typeof peerId !== "string" || typeof redirectTo !== "string") return;

  context.peerClientsById.get(peerId)?.send({ type: "welcome!!!" });
  return setPeerId(peerId, redirectTo);
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
  const peer = useOutletContext<ReturnType<typeof usePeerjs>>();
  const fetcher = useFetcher<typeof action>();
  const navigate = useNavigate();

  React.useEffect(
    function redirectOnFetcherData() {
      if (!fetcher.data?.redirectTo) return;
      navigate(fetcher.data.redirectTo);
    },
    [fetcher.data?.redirectTo, navigate],
  );

  return (
    <>
      <h1>fetcher: {fetcher.state}</h1>
      <h1>{JSON.stringify(fetcher.data)}</h1>
      <ScrollArea className="max-h-fit rounded-lg border shadow-sm lg:mx-16">
        <Table>
          <TableHeader className="sticky top-0 bg-secondary">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-1/6 text-center md:w-1/4">
                Users
              </TableHead>
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
                    <input
                      type="hidden"
                      name="redirectTo"
                      value={encodeURI(`/chat/rooms/${room.name}`)}
                    />
                    <input
                      type="hidden"
                      name="peerId"
                      value={peer.peerId ?? ""}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      // onClick={() => {
                      //   try {
                      //     fetcher.submit(
                      //       {
                      //         peerId: peer.peerId ?? "",
                      //         redirectTo: encodeURI(`/chat/rooms/${room.name}`),
                      //       },
                      //       {
                      //         method: "POST",
                      //       },
                      //     );
                      //   } catch (error) {
                      //     alert("error");
                      //   }
                      // }}
                    >
                      Join
                    </Button>
                  </fetcher.Form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
}
