import { db } from 'db'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()

app.post("/api/receive", async (c) => {
  console.log("Received Request!")
	const body = await c.req.json()

  const parse = await z.object({
    from: z.string(),
    to: z.string(),
    subject: z.string(),
    body: z.string(),
  }).safeParseAsync(body)

  if (!parse.success) {
    console.error("Parse not successfull!" + parse.error)
    return c.json(parse.error.issues, 400)
  }

  console.log("Got new Email")

  const address = await db.address.findUnique({
    where: {
      email: parse.data.to
    }
  })

  if (!address) {
    return c.json({ error: "Address not found" }, 400)
  }

  console.log("Checked the address")

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

  console.log("Created Email")

	return c.json({ success: true })
})

app.post("/api/check-address", async (c) => {
	const body = await c.req.json()

	const parse = await z.object({
		email: z.string().email().endsWith("@trash.company")
	}).safeParseAsync(body)

	if (!parse.success) {
		return c.json(parse.error.issues, 400)
	}

  const address = await db.address.findUnique({
    where: {
      email: parse.data.email
    }
  })

  if (!address) {
    return c.json({ error: "Address not found" }, 400)
  }

  return c.json({ success: true })
})

app.get("/", (c) =>  {
  return c.text("Working!")
})

export default {
	port: 4001,
	fetch: app.fetch,
};
