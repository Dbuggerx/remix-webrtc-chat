import type { useLocation } from "@remix-run/react";
import { Link, useParams } from "@remix-run/react";
import { createHandleValidator } from "~/utils/handles";

export const getBreadcrumbForPath = (
  args:
    | { label: string; targetPath: string }
    | { dynamicParam: string; targetPath: string },
) => ({
  Breadcrumb: ({
    currentPathName,
  }: {
    currentPathName: ReturnType<typeof useLocation>["pathname"];
  }) => {
    return "label" in args ? (
      <StaticBreadcrumb
        currentPathName={currentPathName}
        label={args.label}
        targetPath={args.targetPath}
      />
    ) : (
      <DynamicBreadcrumb
        dynamicParam={args.dynamicParam}
        currentPathName={currentPathName}
        targetPath={args.targetPath}
      />
    );
  },
});

function StaticBreadcrumb({
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
}

function DynamicBreadcrumb({
  dynamicParam,
  currentPathName,
  targetPath,
}: {
  currentPathName: ReturnType<typeof useLocation>["pathname"];
  dynamicParam: string;
  targetPath: string;
}) {
  const params = useParams();
  const dynamicValue = params[dynamicParam];
  const dynamicTargetPath = targetPath.replace(
    dynamicParam,
    dynamicValue ?? "",
  );
  return currentPathName === encodeURI(dynamicTargetPath) ? (
    <span className="select-none font-bold">{dynamicValue}</span>
  ) : (
    <Link to={dynamicTargetPath}>{dynamicValue}</Link>
  );
}

export const hasBreadcrumbHandle =
  createHandleValidator<ReturnType<typeof getBreadcrumbForPath>>("Breadcrumb");
