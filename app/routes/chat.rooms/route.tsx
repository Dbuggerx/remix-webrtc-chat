import { json, type MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
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

export const handle = {
  label: "Rooms",
  targetPath: "/chat/rooms",
};

export const loader = async () => {
  return json({
    rooms: Array.from({ length: 20 }, (_, i) => ({
      id: i,
      name: `Room ${i + 1}`,
      userCount: Math.ceil(Math.random() * 10),
    })),
  });
};

export default function ChatRoomsRoute() {
  const data = useLoaderData<typeof loader>();
  return (
    <ScrollArea className="max-h-fit rounded-lg border shadow-sm">
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
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/chat/${room.name}`}>Join</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
