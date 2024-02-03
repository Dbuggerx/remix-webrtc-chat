import { Link } from "@remix-run/react";
import { createHandleValidator } from "~/utils/handles";

export const getBreadcrumbForPath = (targetPath: string, label: string) => ({
  breadcrumb: (currentPathName: string) =>
    currentPathName === targetPath ? (
      <span className="select-none font-bold">{label}</span>
    ) : (
      <Link to={targetPath}>{label}</Link>
    ),
});

export const hasBreadcrumbHandle =
  createHandleValidator<ReturnType<typeof getBreadcrumbForPath>>("breadcrumb");
