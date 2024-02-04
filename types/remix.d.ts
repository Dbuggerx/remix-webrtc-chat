import "@remix-run/node";
// import type { IClient } from "peer";
import type { peerClientsById } from "../server.mjs";

type CustomContext = {
  peerClientsById: typeof peerClientsById;
};

// Idea from: https://sergiodxa.com/articles/dependency-injection-in-remix-loaders-and-actions
declare module "@remix-run/node" {
  interface AppLoadContext extends CustomContext {}
}
