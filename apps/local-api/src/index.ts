import { resolveTxt } from 'node:dns/promises';
import { db } from 'db'
import { Hono } from 'hono'
import { z } from 'zod'

const app = new Hono()

// get Bimi Image for 
async function getBimiRecord(domain: string) {
  try {
    const records = await resolveTxt(`default._bimi.${domain}`);
    for (const record of records) {
      const txt = record.join('');
      if (txt.startsWith("v=BIMI1;")) {
        const match = txt.match(/l=([^;]+);?/);
        return match ? match[1] : null;
      }
    }
    return null;
  } catch (err: any) {
    console.error("Error while trying to get Bimi Record:", err.message);
    return null;
  }
}

app.post("/api/receive", async (c) => {
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


  const address = await db.address.findUnique({
    where: {
      email: parse.data.to
    }
  })

  if (!address) {
    return c.json({ error: "Address not found" }, 400)
  }

  const domain = parse.data.from.split("@")[0]

  const img = await getBimiRecord(domain)

  const email = await db.email.create({
    data: {
      addressId: address.id,
      image: img,
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
