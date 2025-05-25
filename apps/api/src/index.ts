import consola from "consola"
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { auth } from "../lib/auth.js";
import { db } from "../lib/db.js";

const app = new Hono();

app.on(["POST", "GET"], "/api/auth/*", (c) => {
	return auth.handler(c.req.raw);
});

app.get("/api/addresses", async (c) => {
	const body = await c.req.json();

	const parse = await z.object({
		userId: z.string()
	}).safeParseAsync(body)

	if (!parse.success) {
		return c.json(parse.error.issues, 400);
	}

	const addresses = await db.address.findMany({
		where: {
			userId: parse.data.userId
		}
	});

	consola.log(`Found ${addresses.length} addresses for user ${parse.data.userId}`)

	return c.json(addresses);
});

app.get("/api/emails", async (c) => {
	const body = await c.req.json();

	const parse = await z.object({
		userId: z.string(),
		addressId: z.string()
	}).safeParseAsync(body)

	if (!parse.success) {
		return c.json(parse.error.issues, 400);
	}

	const emails = await db.email.findMany({
		where: {
			userId: parse.data.userId,
			addressId: parse.data.addressId
		}
	});

	return c.json(emails);
});

app.post("/api/addresses/create", async (c) => {
	const body = await c.req.json();

	const parse = await z.object({
		userId: z.string(),
		email: z.string(),
	}).safeParseAsync(body)


	if (!parse.success) {
		return c.json(parse.error.issues, 400);
	}

	const email = parse.data.email.toLowerCase()

	const address = await db.address.create({
		data: {
			userId: parse.data.userId,
			email: email
		}
	});

	if (!address) {
		return c.json({ error: "Error while creating address: it's probably already taken" }, 500);
	}

	consola.log(`New address created: ${email}`)

	return c.json(address);
});

export default {
	port: 4000,
	fetch: app.fetch,
};
