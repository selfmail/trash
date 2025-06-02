export async function createPages(): Promise<{
    path: string;
    url: string;
}[] > {
	const router = new Bun.FileSystemRouter({
		style: "nextjs",
		dir: "./src/pages",
		fileExtensions: ["html", "tsx"],
	});

	const routes: {
		path: string;
		url: string;
	}[] = [];

	// Iterate over all routes
	for (const [path, route] of Object.entries(router.routes)) {
		// Hier können Sie mit jeder Route arbeiten
        routes.push({
            path,
            url: route,
        });
	}

    return routes
}
