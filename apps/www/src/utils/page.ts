import type { BunRequest } from "bun";
import type { JSX } from "react";

export function page<Path extends string>(
  path: Path,
  handler: (req: BunRequest<Path>) => Promise<{res: Response  | Promise<Response>, component: JSX.Element}> | Response | Promise<Response>
) {
  return {
    path,
    handler,
  }
}