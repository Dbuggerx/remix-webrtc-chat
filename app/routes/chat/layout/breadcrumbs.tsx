import type { useLocation, useMatches } from "@remix-run/react";

type Props = {
  matches: ReturnType<typeof useMatches>;
  currentLocation: ReturnType<typeof useLocation>;
};

export default function Breadcrumbs({ currentLocation, matches }: Props) {
  return (
    <nav className="flex flex-row">
      {matches
        .filter(
          (match) =>
            match.handle && (match.handle as HandleWithBreadcrumb).breadcrumb
        )
        .map((match, index) => (
          <span key={match.pathname}>
            {index > 0 ? <span className="mx-2">/</span> : null}
            {(match.handle as HandleWithBreadcrumb).breadcrumb(
              currentLocation.pathname
            )}
          </span>
        ))}
    </nav>
  );
}

type HandleWithBreadcrumb = {
  breadcrumb: (_: string) => React.ReactNode;
};
