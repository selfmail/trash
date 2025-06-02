import type { BunRequest } from "bun";

export function route<Path extends string>(
  path: Path,
  method: "GET" | "POST" | "PUT" | "DELETE",
  handler: (req: BunRequest<Path>) => Response 
) {
  console.log(JSON.stringify(path))
  return {
    path,
    handler: {
      [method]: handler,
    },
  }
}