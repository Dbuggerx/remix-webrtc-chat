import { Outlet, useBeforeUnload, useNavigate } from "@remix-run/react";
import type { ErrorType } from "./use-peerjs";
import { usePeerServerConnection } from "./use-peerjs";
import ErrorComponent from "./error-boundary";
import React from "react";
import ErrorDialog from "./error-dialog";
import { Loader } from "lucide-react";

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
  const onPeerError = React.useCallback((error: ErrorType) => {
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
  }, []);
  const peer = usePeerServerConnection(onPeerError);

  useBeforeUnload(
    React.useCallback(() => {
      peer.peerRegistration.current?.destroy();
    }, [peer.peerRegistration]),
  );

  if ((peer.peerId ?? "") === "")
    return <Loader className="m-auto animate-spin" />;

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
      <Outlet context={peer} />
    </>
  );
}
