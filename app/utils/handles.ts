import type { UIMatch } from "@remix-run/react";

export const createHandleValidator =
  <T>(prop: keyof NoInfer<T>) =>
  (match: UIMatch): match is UIMatch<unknown, T> =>
    hasHandleWithProp<T>(match, prop);

function hasHandleWithProp<T>(
  match: UIMatch,
  keyProp: keyof NoInfer<T>,
): match is UIMatch<unknown, T> {
  return (
    !!match.handle &&
    typeof match.handle === "object" &&
    (keyProp satisfies typeof keyProp) in match.handle
  );
}
