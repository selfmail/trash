import { serve } from "bun";
import consola from "consola";
import { createPages } from "./utils/get-pages";
import { createRoutes } from "./utils/get-routes";

const pages = await createPages();
const routes = await createRoutes();

const server = serve({
	routes: {
		"/": (req) => {
			return new Response("hey!");
		},
		...Object.fromEntries(routes.map((r) => [r.path, r.handler])),

		...Object.fromEntries(pages.map((r) => [r.path, r.handler])),
		
		"/static/client-login.js": () =>
			new Response(Bun.file("static/client-login.js"), {
				headers: { "Content-Type": "application/javascript" },
			}),
	},
	development: true,
	hostname: "0.0.0.0",
});

consola.info(`Server running at http://localhost:${server.port}`);
