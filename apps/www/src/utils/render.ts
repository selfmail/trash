import type { JSX } from "react";
import { renderToReadableStream } from "react-dom/server";

export async function render(component: JSX.Element) {
    const stream = await renderToReadableStream(component)
    return {
        res: new Response(stream, {
            headers: {
                "Content-Type": "text/html",
            },
        }),
        component
    }
}