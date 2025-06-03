import type { BunRequest } from "bun";
import type { JSX } from "react";

export function page<Path extends string>(
  path: Path,
  handler: (req: BunRequest<Path>) => Response | JSX.Element | Promise<Response | JSX.Element>
) {
  return {
    path,
    handler,
  }
}