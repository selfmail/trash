
import { z } from "zod";
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function createRoutes(): Promise<{
	path: string;
	handler: Record<HttpMethod, (req: Request) => Response | Promise<Response>>;
}[]> {
	const router = new Bun.FileSystemRouter({
		style: "nextjs",
		dir: "./src/api",
	});

	const routes: {
		path: string;
		handler: Record<HttpMethod, (req: Request) => Response | Promise<Response>>;
	}[] = [];

	for await (const [path, filePath] of Object.entries(router.routes)) {
		const importPath = `../../src/api${path.replace(/\.ts$/, "")}.ts`;

		const mod = await import(importPath);
		const handler = mod.default as {
			path: string;
			handler: Record<HttpMethod, (req: Request) => Response | Promise<Response>>;
		};
        const handlerSchema = z.object({
            GET: z.function().args(z.instanceof(Request)).returns(z.any()).optional(),
            POST: z.function().args(z.instanceof(Request)).returns(z.any()).optional(),
            PUT: z.function().args(z.instanceof(Request)).returns(z.any()).optional(),
            DELETE: z.function().args(z.instanceof(Request)).returns(z.any()).optional(),
        });
        
        const routeSchema = await z.object({
            path: z.string(),
            handler: handlerSchema,
        }).safeParseAsync(handler)

        if (!routeSchema.success) {
            console.log(routeSchema.error.issues)
            throw new Error("Failed to parse route")
        }



		routes.push({
			path: handler.path,
			handler: handler.handler,
		});
	}

	return routes
}
