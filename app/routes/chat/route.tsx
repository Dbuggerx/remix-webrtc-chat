import type { MetaFunction } from "@remix-run/node";
import {
  Outlet,
  json,
  useLoaderData,
  useLocation,
  useMatches,
} from "@remix-run/react";
import Header from "./layout/header";
import SidePanel from "./layout/side-panel";

export const meta: MetaFunction = () => {
  return [{ title: "Chat" }];
};

export const handle = {
  label: "Chat",
  targetPath: "/chat",
};

export const loader = async () => {
  return json({ roomCount: 10, usename: "User" });
};

export default function ChatRoute() {
  const data = useLoaderData<typeof loader>();
  const matches = useMatches();
  const currentLocation = useLocation();

  return (
    <article className="flex h-dvh w-dvw bg-gray-100 dark:bg-gray-900">
      <SidePanel roomCount={data.roomCount} />
      <div className="flex flex-auto flex-col">
        <Header
          username={data.usename}
          currentLocation={currentLocation}
          matches={matches}
        />
        <main className="flex flex-1 flex-col gap-4 overflow-hidden p-4 ">
          <Outlet />
        </main>
      </div>
    </article>
  );
}
