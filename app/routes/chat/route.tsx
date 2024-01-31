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
import { getBreadcrumbForPath } from "~/utils/breadcrumbs";

export const meta: MetaFunction = () => {
  return [{ title: "Chat" }];
};

export const handle = getBreadcrumbForPath("/chat", "Chat");

export const loader = async () => {
  return json({ roomCount: 10, usename: "User" });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const matches = useMatches();
  const currentLocation = useLocation();

  return (
    <article className="flex h-dvh w-dvw bg-gray-100 dark:bg-gray-900">
      <SidePanel roomCount={data.roomCount} />
      <div className="flex flex-col flex-auto">
        <Header
          username={data.usename}
          currentLocation={currentLocation}
          matches={matches}
        />
        <main className="flex flex-1 flex-col gap-4 p-4 overflow-hidden ">
          <Outlet />
        </main>
      </div>
    </article>
  );
}