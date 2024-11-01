import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import {
  Outlet,
  json,
  useLoaderData,
  useLocation,
  useMatches,
} from "@remix-run/react";
import Header from "./layout/header";
import SidePanel from "./layout/side-panel";
import { getUser } from "~/utils/session.server";

export const meta: MetaFunction = () => {
  return [{ title: "Chat" }];
};

export const handle = {
  label: "Chat",
  targetPath: "/chat",
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getUser(request);
  return json({ roomCount: 10, usename: user.username });
};

export default function ChatRoute() {
  const data = useLoaderData<typeof loader>();
  const matches = useMatches();
  const currentLocation = useLocation();

  return (
    <article className=" flex h-full w-full overflow-auto bg-gray-100 dark:bg-gray-900">
      <SidePanel roomCount={data.roomCount} />
      <section className="flex max-w-full w-full flex-col overflow-hidden px-2 sm:px-6">
        <Header
          username={data.usename}
          currentLocation={currentLocation}
          matches={matches}
        />
        <main className="flex flex-1 flex-col gap-4 overflow-hidden p-4 ">
          <Outlet />
        </main>
      </section>
    </article>
  );
}
