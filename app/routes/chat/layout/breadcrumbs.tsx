import type { useLocation, useMatches } from "@remix-run/react";
import { hasBreadcrumbHandle } from "~/routes/chat/utils/breadcrumb-handle";

type Props = {
  matches: ReturnType<typeof useMatches>;
  currentLocation: ReturnType<typeof useLocation>;
};

export default function Breadcrumbs({ currentLocation, matches }: Props) {
  return (
    <nav className="flex flex-row">
      {matches.filter(hasBreadcrumbHandle).map((match, index) => (
        <span key={match.pathname}>
          {index > 0 ? <span className="mx-2">/</span> : null}
          <match.handle.Breadcrumb currentPathName={currentLocation.pathname} />
        </span>
      ))}
    </nav>
  );
}
