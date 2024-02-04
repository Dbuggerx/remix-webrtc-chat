import { Outlet, useNavigate } from "@remix-run/react";
import { usePeerjs } from "./use-peerjs";
import ErrorComponent from "./error-boundary";
import React from "react";
import ErrorDialog from "./error-dialog";

export const handle = {
  label: "Rooms",
  targetPath: "/chat/rooms",
};

export function ErrorBoundary() {
  return <ErrorComponent />;
}

export default function ChatRoomsIndexRoute() {
  const navigate = useNavigate();
  const [peerError, setPeerError] = React.useState<string>();
  const peer = usePeerjs({
    onError: (error) => {
      switch (error) {
        case "network":
          setPeerError("Network error!");
          break;
        case "disconnected":
          setPeerError("Disconnected error!");
          break;
        default:
          setPeerError("General error!");
      }
    },
  });

  return (
    <>
      {peerError ? (
        <ErrorDialog
          title="P2P Error"
          msg={peerError}
          onClose={() => {
            navigate("/");
          }}
        />
      ) : null}
      <h1>Peer id: {peer.peerId}</h1>
      <Outlet context={peer} />
    </>
  );
}
