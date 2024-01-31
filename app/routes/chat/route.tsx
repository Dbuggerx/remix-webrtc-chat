import type { MetaFunction } from "@remix-run/node";
import { Outlet, json, useLoaderData } from "@remix-run/react";
import Header from "./layout/header";
import SidePanel from "./layout/side-panel";
import React from "react";

export const meta: MetaFunction = () => {
  return [{ title: "Chat Rooms" }];
};

export const loader = async () => {
  return json({ roomCount: 10, usename: "User" });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <SidePanel
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={() => setNotificationsEnabled((prev) => !prev)}
        roomCount={data.roomCount}
      />
      <div className="flex flex-col flex-1">
        <Header currentUsername={data.usename} />
        <main className="flex flex-1 flex-col overflow-hidden gap-4 p-4 md:gap-8 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
