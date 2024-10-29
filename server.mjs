import { createRequestHandler } from "@remix-run/express";
import { broadcastDevReady } from "@remix-run/node";
import express from "express";
import { ExpressPeerServer } from "peer";

// notice that the result of `remix build` is "just a module"
import * as build from "./build/index.js";

const app = express();
app.use(express.static("public"));

const server = app.listen(3000, () => {
  if (process.env.NODE_ENV === "development") {
    broadcastDevReady(build);
  }
  console.log("App listening on http://localhost:3000");
});

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/myapp",
});

/**
 * @typedef {import("peer").IClient} IClient
 *
 * @typedef {Object} ClientInfo
 * @property {IClient} client
 * @property {string} currentRoom
 */

/** @type {Map<string, ClientInfo>} */
export const peerClientsById = new Map();

peerServer.on(
  "connection",
  /**
   * @param {IClient} client
   */
  (client) => {
    peerClientsById.set(client.getId(), {
      client,
      currentRoom: undefined,
    });
    console.log("New peer connected", client.getId());
    // client.send({ type: "TEST", payload: "mock" });
  },
);
peerServer.on(
  "disconnect",
  /**
   * @param {IClient} client
   */
  (client) => {
    peerClientsById.delete(client.getId());
    console.log("Peer disconnected", client.getId());
  },
);

app.use("/peerjs", peerServer);

// the Remix app is "just a request handler"
app.all(
  "*",
  createRequestHandler({
    build,
    getLoadContext: () => ({ peerClientsById }),
  }),
);
