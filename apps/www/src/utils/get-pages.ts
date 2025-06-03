import type { BunRequest } from "bun";
import { Fragment, type JSX } from "react";
import { z } from "zod";

function isResponse(value: unknown): value is Response {
	return value instanceof Response;
}

function isResponseLikeObject(
	value: unknown,
): value is { res: Response | Promise<Response>; component: JSX.Element } {
	return (
		typeof value === "object" &&
		value !== null &&
		"res" in value &&
		"component" in value
	);
}

export async function createPages(): Promise<
	{
		path: string;
		handler: (req: BunRequest<string>) => Response | Promise<Response>;
	}[]
> {
	const router = new Bun.FileSystemRouter({
		style: "nextjs",
		dir: "./src/pages",
	});

	const pages: {
		path: string;
		handler: (req: BunRequest<string>) => Response | Promise<Response>;
	}[] = [];

	for await (const [path, filePath] of Object.entries(router.routes)) {
		const importPath = `../../src/pages${path.replace(/\.ts$/, "")}.tsx`;

		console.log(path)

		const mod = await import(importPath);
		const handler = mod.default as {
			path: string;
			handler: (
				req: BunRequest<string>,
			) =>
				| Promise<{ res: Response | Promise<Response>; component: JSX.Element }>
				| Response
				| Promise<Response>;
		};



		const resultSchema = z.object({
			res: z.instanceof(Response).or(z.promise(z.instanceof(Response))),
			component: z.any(), // optional: mit `ReactElementSchema` validieren
		});

		if (resultSchema.safeParse(handler.handler).success) {
			// handler is an object, we need to hydrate the component
			const parsed = resultSchema.parse(handler.handler);
			
			pages.push({
				path: handler.path,
				handler: async () => await parsed.res,
			});

			const clientTsx = `
import { hydrateRoot } from "react-dom/client";
import page from "../pages${path}";

const Component = await page.component;

const props = (window as any).__INITIAL_PROPS__;
hydrateRoot(document.getElementById("root")!, <Component {...props} />);
`;

			await Bun.write(`./src/static/client-${path.replace("/", "")}.tsx`, clientTsx,)

			const resultBuild = await Bun.build({
				entrypoints: [`./src/static/client-${path.replace("/", "")}.tsx`],
				outdir: "./static",
				target: "browser",
			});
		} else {
			pages.push({
				path: handler.path,
				handler: handler.handler as (req: BunRequest<string>) => Response | Promise<Response>,
			});
		}

	}

	return pages;
}
