import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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

export const meta: MetaFunction = () => {
  return [{ title: "Remix WebRTC Chat - Rooms" }];
};

export const loader = async () => {
  return json({
    rooms: Array.from({ length: 20 }, (_, i) => ({
      id: i,
      name: `Room #${i + 1}`,
      userCount: Math.ceil(Math.random() * 10),
    })),
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <h1 className="font-semibold text-lg md:text-2xl">Chat Rooms</h1>
      <ScrollArea className="border shadow-sm rounded-lg max-h-fit mx-48">
        <Table>
          <TableHeader className="sticky top-0 bg-secondary">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="w-32 text-center">Users</TableHead>
              <TableHead className="w-32 text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-slate-50">
            {data.rooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell className="font-medium">{room.name}</TableCell>
                <TableCell className="text-center">{room.userCount}</TableCell>
                <TableCell className="text-center">
                  <Button size="sm" variant="outline">
                    Join
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </>
  );
}
