import { describe, expect, it } from 'bun:test'
import app from '../src/index.js'

describe('Fetch addresses of a specific user', () => {
  it('Should return 200 Response', async () => {
    const req = new Request('http://localhost:4000/api/addresses', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: 'v0MJQnv6nXWEopFy34UYKNOv7armiRFh'
      })
    })
    const res = await app.fetch(req)
    expect(res.status).toBe(200)
  })
})