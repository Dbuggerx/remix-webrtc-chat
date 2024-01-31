import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Remix WebRTC Chat" }];
};

export default function Index() {
  return <article>Login</article>;
}
