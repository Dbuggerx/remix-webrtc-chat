import { Outlet } from "@remix-run/react";

export const handle = {
  label: "Rooms",
  targetPath: "/chat/rooms",
};

export default function ChatRoomsIndexRoute() {
  return <Outlet />;
}
