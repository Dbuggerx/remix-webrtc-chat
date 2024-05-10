import type { DataConnection, PeerErrorType, Peer as PeerType } from "peerjs";
import React from "react";

export type ErrorType = `${(typeof PeerErrorType)[keyof typeof PeerErrorType]}`;

type ErrorHandler = (error: ErrorType) => void;
type Msg = { peerId: string; msg: string; date: Date };

export function usePeerServerConnection(onError: ErrorHandler) {
  const [peerId, setPeerId] = React.useState<string>();
  const peerRegistration = React.useRef<PeerType>();
  const abort = React.useRef<AbortController>(new AbortController());

  React.useEffect(() => {
    function destroyRegistration() {
      abort.current.abort();
      console.log(">>>>>DESTROY!");
      peerRegistration.current?.removeAllListeners();
      peerRegistration.current?.destroy();
    }

    async function register() {
      const { Peer } = await import("peerjs");

      if (abort.current.signal.aborted) {
        abort.current = new AbortController();
        return;
      }

      const registration = new Peer({
        host: "/",
        port: 3000,
        path: "/peerjs/myapp",
        debug: 0,
      });

      registration.on("open", (id) => {
        setPeerId(id);
        console.log(">>>>> Peer ID", id);
      });

      registration.on("error", (error) => {
        console.error("Peerjs error:", error);
        onError(error.type);
      });

      peerRegistration.current = registration;
      abort.current = new AbortController();
    }
    register();

    return destroyRegistration;
  }, [onError]);

  return React.useMemo(() => ({ peerId, peerRegistration }), [peerId]);
}

export function usePeerjs(allPeerIdsInTheRoom: string[], peer?: PeerType) {
  const connections = React.useRef(new Map<string, DataConnection>());
  const [msgs, setMsgs] = React.useState<Msg[]>([]);

  React.useEffect(
    function connectToOtherPeers() {
      if (!peer?.id) throw new Error("No peer id!");

      allPeerIdsInTheRoom
        .filter((peerId) => peerId !== peer.id)
        .forEach((peerId) => {
          if (connections.current.has(peerId)) return;

          console.log("connecting to", peerId);
          const conn = peer.connect(peerId);
          connections.current.set(peerId, conn);

          conn.on("open", () => {
            console.log("connected to", conn.peer);
            conn.send("Hello World!");
          });
          conn.on("data", (data) => {
            console.log("Received data", data);
            setMsgs((prev) =>
              prev.concat({
                date: new Date(),
                msg: data as string,
                peerId: conn.peer,
              }),
            );
          });
          conn.on("close", () => {
            console.log("connection closed with", conn.peer);
            connections.current.delete(peerId);
          });
        });

      return () => {
        for (const cn of connections.current.values()) {
          console.log("closing connection with", cn.peer);
          connections.current.delete(cn.peer);
          cn.removeAllListeners();
          cn.close();
        }
      };
    },
    [allPeerIdsInTheRoom, peer],
  );

  React.useEffect(
    function listenForConnections() {
      if (!peer?.id) throw new Error("No peer id!");

      const onConnection = (conn: DataConnection) => {
        connections.current.set(conn.peer, conn);

        conn.on("open", () => {
          conn.send("Hi!");
        });
        conn.on("data", (data) => {
          console.log("Received data", data);
          setMsgs((prev) =>
            prev.concat({
              date: new Date(),
              msg: data as string,
              peerId: conn.peer,
            }),
          );
        });
        conn.on("close", () => {
          console.log("connection closed with peer", conn.peer);
          connections.current.delete(conn.peer);
        });
      };
      peer.on("connection", onConnection);

      return () => {
        peer.off("connection", onConnection);
      };
    },
    [peer],
  );

  const sendMsgToOtherPeers = React.useCallback(
    (msg: string) => {
      setMsgs((prev) =>
        prev.concat({
          date: new Date(),
          msg: msg,
          peerId: peer?.id || "",
        }),
      );

      for (const cn of connections.current.values()) {
        if (cn.peer === peer?.id) return;

        console.log("Sending to", cn.peer);
        cn.send(msg);
      }
    },
    [peer?.id],
  );

  return React.useMemo(
    () => ({ msgs, sendMsgToOtherPeers }),
    [msgs, sendMsgToOtherPeers],
  );
}
