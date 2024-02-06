import {
  Link,
  useParams,
  type UIMatch,
  type useLocation,
  type useMatches,
} from "@remix-run/react";
import clsx from "clsx";
import React from "react";

type Props = {
  matches: ReturnType<typeof useMatches>;
  currentLocation: ReturnType<typeof useLocation>;
};

export default function Breadcrumbs({ currentLocation, matches }: Props) {
  return (
    <nav className="flex flex-shrink flex-row overflow-hidden whitespace-nowrap">
      {matches.filter(isCustomHandle).map((match, index, arr) => (
        <>
          {index > 0 ? <span className="mx-2 hidden sm:inline">/</span> : null}
          {match.handle.label.includes("$") ? (
            <DynamicBreadcrumbMemo
              key={match.pathname}
              currentPathName={currentLocation.pathname}
              dynamicParam={match.handle.label}
              targetPath={match.handle.targetPath}
              shrink={index < arr.length - 1}
            />
          ) : (
            <StaticBreadcrumbMemo
              key={match.pathname}
              currentPathName={currentLocation.pathname}
              label={match.handle.label}
              targetPath={match.handle.targetPath}
              shrink={index < arr.length - 1}
            />
          )}
        </>
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
  shrink,
}: {
  currentPathName: ReturnType<typeof useLocation>["pathname"];
  dynamicParam: string;
  targetPath: string;
  shrink: boolean;
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
      shrink={shrink}
    />
  );
});

const StaticBreadcrumbMemo = React.memo(function StaticBreadcrumb({
  currentPathName,
  label,
  targetPath,
  shrink,
}: {
  currentPathName: ReturnType<typeof useLocation>["pathname"];
  label: string;
  targetPath: string;
  shrink: boolean;
}) {
  const classes = clsx("overflow-hidden overflow-ellipsis", {
    "shrink hidden sm:inline": shrink,
  });
  return currentPathName === targetPath ? (
    <span className={clsx("select-none font-bold", classes)}>{label}</span>
  ) : (
    <Link className={classes} to={targetPath}>
      {label}
    </Link>
  );
});
