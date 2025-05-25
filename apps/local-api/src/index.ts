import { db } from 'db'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()

app.post("/api/receive", async (c) => {
	const body = await c.req.json()

  const parse = await z.object({
    from: z.string(),
    to: z.string(),
    subject: z.string(),
    body: z.string(),
  }).safeParseAsync(body)

  if (!parse.success) {
    return c.json(parse.error.issues, 400)
  }

  const address = await db.address.findUnique({
    where: {
      email: parse.data.to
    }
  })

  if (!address) {
    return c.json({ error: "Address not found" }, 400)
  }

  const email = await db.email.create({
    data: {
      addressId: address.id,
      userId: address.userId,
      from: parse.data.from,
      subject: parse.data.subject,
      body: parse.data.body,
    }
  })

  if (!email) {
    return c.json({ error: "Error while creating email" }, 500)
  }

	return c.json({ success: true })
})

export default {
	port: 4001,
	fetch: app.fetch,
};
