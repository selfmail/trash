import { type BunRequest, serve } from "bun";
import { renderToReadableStream } from "react-dom/server";
import Login from "./pages/login";
import { createPages } from "./utils/create-pages";
import { createRoutes } from "./utils/get-routes";

const pages = await createPages();
const routes = await createRoutes()
serve({
	routes: {
        "/": (req) => {
            if (!req.cookies.get("trash-company-session")) {
                return Response.redirect(new URL("/auth/login", req.url))
            }
            return new Response("hey!")
        },
		...Object.fromEntries(
			routes.map((r) => [r.path, r.handler])
		),
	
		
	},
	hostname: "0.0.0.0",
});
