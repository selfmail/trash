import type { BunRequest } from "bun";
import type { JSX } from "react";
import { z } from "zod";


export async function createPages(): Promise<{
	path: string;
	handler: (req: BunRequest<string>) => Response | JSX.Element | Promise<Response | JSX.Element>
}[]> {
	const router = new Bun.FileSystemRouter({
		style: "nextjs",
		dir: "./src/api",
	});

	const pages: {
		path: string;
		handler:(req: BunRequest<string>) => Response | JSX.Element | Promise<Response | JSX.Element>;
	}[] = [];

	for await (const [path, filePath] of Object.entries(router.routes)) {
		const importPath = `../../src/pages${path.replace(/\.ts$/, "")}.tsx`;

		const mod = await import(importPath);
		const handler = mod.default as {
			path: string;
			handler: (req: BunRequest<string>) => Response | JSX.Element | Promise<Response | JSX.Element>
		};


		pages.push({
			path: handler.path,
			handler: handler.handler,
		});
	}

	return pages
}
