import "@remix-run/node";
import type { IClient } from "peer";

type CustomContext = { peerClientsById: Map<string, IClient> };

// Idea from: https://sergiodxa.com/articles/dependency-injection-in-remix-loaders-and-actions
declare module "@remix-run/node" {
  interface AppLoadContext extends CustomContext {}
}
