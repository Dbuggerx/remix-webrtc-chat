import type { UIMatch } from "@remix-run/react";
import { Link } from "@remix-run/react";

export const getBreadcrumbForPath = (targetPath: string, label: string) => ({
  breadcrumb: (currentPathName: string) =>
    currentPathName === targetPath ? (
      <span className="select-none font-bold">{label}</span>
    ) : (
      <Link to={targetPath}>{label}</Link>
    ),
});

export function hasBreadcrumbHandle(
  match: UIMatch,
): match is UIMatch<unknown, ReturnType<typeof getBreadcrumbForPath>> {
  return (
    !!match.handle &&
    typeof match.handle === "object" &&
    "breadcrumb" in match.handle
  );
}
