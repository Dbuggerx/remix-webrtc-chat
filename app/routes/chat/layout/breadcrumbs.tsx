import {
  Link,
  useParams,
  type UIMatch,
  type useLocation,
  type useMatches,
} from "@remix-run/react";
import React from "react";

type Props = {
  matches: ReturnType<typeof useMatches>;
  currentLocation: ReturnType<typeof useLocation>;
};

export default function Breadcrumbs({ currentLocation, matches }: Props) {
  return (
    <nav className="flex flex-row">
      {matches.filter(isCustomHandle).map((match, index) => (
        <span key={match.pathname}>
          {index > 0 ? <span className="mx-2">/</span> : null}
          {match.handle.label.includes("$") ? (
            <DynamicBreadcrumbMemo
              currentPathName={currentLocation.pathname}
              dynamicParam={match.handle.label}
              targetPath={match.handle.targetPath}
            />
          ) : (
            <StaticBreadcrumbMemo
              currentPathName={currentLocation.pathname}
              label={match.handle.label}
              targetPath={match.handle.targetPath}
            />
          )}
        </span>
      ))}
    </nav>
  );
}

function isCustomHandle(
  match: UIMatch,
): match is UIMatch<unknown, { label: string; targetPath: string }> {
  return (
    !!match.handle &&
    typeof match.handle === "object" &&
    "label" in match.handle &&
    "targetPath" in match.handle
  );
}

const DynamicBreadcrumbMemo = React.memo(function DynamicBreadcrumb({
  dynamicParam,
  currentPathName,
  targetPath,
}: {
  currentPathName: ReturnType<typeof useLocation>["pathname"];
  dynamicParam: string;
  targetPath: string;
}) {
  const params = useParams();
  const dynamicValue = params[dynamicParam.replace("$", "")] ?? "";
  const dynamicTargetPath = encodeURI(
    targetPath.replace(dynamicParam, dynamicValue ?? ""),
  );
  return (
    <StaticBreadcrumbMemo
      currentPathName={currentPathName}
      label={dynamicValue}
      targetPath={dynamicTargetPath}
    />
  );
});

const StaticBreadcrumbMemo = React.memo(function StaticBreadcrumb({
  currentPathName,
  label,
  targetPath,
}: {
  currentPathName: ReturnType<typeof useLocation>["pathname"];
  label: string;
  targetPath: string;
}) {
  return currentPathName === targetPath ? (
    <span className="select-none font-bold">{label}</span>
  ) : (
    <Link to={targetPath}>{label}</Link>
  );
});
