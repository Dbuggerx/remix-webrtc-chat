import type { DataConnection, PeerErrorType, Peer as PeerType } from "peerjs";
import React from "react";

export type ErrorType = `${(typeof PeerErrorType)[keyof typeof PeerErrorType]}`;
type Config = {
  onError: (error: ErrorType) => void;
};

export function usePeerjs(options: Config) {
  const peer = React.useRef<PeerType>();
  const initialized = React.useRef<boolean>();
  const [peerId, setPeerId] = React.useState<string>();
  const [outboundConnections, setOutboundConnections] = React.useState<
    DataConnection[]
  >([]);
  const [inboundConnections, setInboundConnections] = React.useState<
    DataConnection[]
  >([]);
  const [inboundMsgs, setInboundMsgs] = React.useState<
    { peerId: string; msg: string }[]
  >([]);

  const onInboundConnectionOpen = React.useCallback((conn: DataConnection) => {
    setInboundConnections((prev) => prev.concat(conn));
  }, []);

  const onInboundData = React.useCallback((c: DataConnection, d: string) => {
    setInboundMsgs((prev) =>
      prev.concat({
        peerId: c.connectionId,
        msg: d,
      }),
    );
  }, []);

  React.useEffect(() => {
    // Prevent double run due to StrictMode
    if (initialized.current) return;
    initialized.current = true;
    (async () => {
      console.log("RUN");
      const registration = await register(options.onError);
      peer.current = registration.peer;
      handleIncommingConnections(
        registration.peer,
        onInboundConnectionOpen,
        onInboundData,
      );
      setPeerId(registration.peerId);
    })();
  }, [onInboundConnectionOpen, onInboundData, options.onError]);

  const connectToPeer = React.useCallback(
    async (peerId: string) => {
      console.log({ outboundConnections });
      if (outboundConnections.some((c) => c.peer === peerId)) {
        console.error(`Peer ${peerId} is already connected!!!`);
        return;
      }

      if (!peer.current) throw new Error("`peer.current` not defined");

      const conn = await connect(peer.current, peerId, onInboundData);
      setOutboundConnections((prev) => prev.concat(conn));
    },
    [onInboundData, outboundConnections],
  );

  return {
    peerId,
    connectToPeer,
    outboundConnections,
    inboundConnections,
    inboundMsgs,
  };
}

async function register(setError: Config["onError"]) {
  const { Peer } = await import("peerjs");
  // Register with the peer server
  const peer = new Peer({
    host: "localhost",
    port: 3000,
    path: "/peerjs/myapp",
    debug: 0,
  });

  peer.socket.addListener("message", (msg) => {
    // TODO: handle custom messages from the server
    console.log("SERVER MESSAGE", msg);
  });

  const peerId: string = await new Promise((resolve) => {
    peer.on("open", (id: string) => {
      peer.socket.send({
        type: "seila",
        payload: "zzzz",
      });

      console.log("OPEN", id);
      resolve(id);
    });
  });

  peer.on("error", (error) => {
    console.error("Peerjs error:", error);
    setError(error.type);
  });

  return { peer, peerId };
}

function handleIncommingConnections(
  peer: PeerType,
  onConnectionOpen: (c: DataConnection) => void,
  onData: (c: DataConnection, d: string) => void,
) {
  peer.on("connection", (conn: DataConnection) => {
    console.log("incoming peer connection!");
    conn.on("data", (data) => {
      console.log(`received: ${data}`);
      onData(conn, data as string);
    });
    conn.on("open", () => {
      onConnectionOpen(conn);
      conn.send("hello!");
    });
  });
}

async function connect(
  peer: PeerType,
  peerId: string,
  onData: (c: DataConnection, d: string) => void,
) {
  console.log(`Connecting to ${peerId}...`);

  const conn = peer.connect(peerId, { reliable: true, serialization: "json" });

  conn.on("data", (data) => {
    console.log(`received: ${data}`);
    onData(conn, data as string);
  });

  await new Promise<void>((resolve) => {
    conn.on("open", () => {
      conn.send("hi!");
      resolve();
    });
  });

  return conn;

  // navigator.mediaDevices
  //   .getUserMedia({ video: true, audio: true })
  //   .then((stream) => {
  //     let call = peer.call(peerId, stream);
  //     call.on('stream', renderVideo);
  //   })
  //   .catch((err) => {
  //     console.log('Failed to get local stream', err);
  //   });
}
