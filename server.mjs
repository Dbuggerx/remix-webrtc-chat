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

const peerClientsById = new Map();

peerServer.on(
  "connection",
  /**
   * @param {import("peer/dist/peer.js").IClient} client
   */
  (client) => {
    peerClientsById.set(client.getId(), client);
    console.log("CLIENT CONNECTED!", client.getId());
    client.send({ type: "TEST", payload: "mock" });
    // console.log(server, peerServer);
  },
);

// peerServer.on(
//   "message",
//   /**
//    * @param {import("peer/dist/peer.js").IClient} client
//    * @param {import("peer/dist/peer.js").IMessage} message
//    */
//   (client, message) => {
//     console.log("CLIENT MESSAGE!", client.getId(), { message });
//   },
// );

app.use("/peerjs", peerServer);

// and your app is "just a request handler"
app.all(
  "*",
  createRequestHandler({
    build,
    getLoadContext: () => ({ peerClientsById }),
  }),
);
