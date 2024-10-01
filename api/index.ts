import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/vercel'

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')

app.use('/*', cors())

app.get('/', (c) => {
  return c.json({ message: 'Hello Hono!' })
})

app.get('/items', (c) => {
  return c.json([
    { id: 1, tilte: 'Item 1' },
    { id: 2, tilte: 'Item 2' },
    { id: 3, tilte: 'Item 3' },
  ])
})

app.get('/items/:id', (c) => {
  const obj = [
    { id: 1, tilte: 'Item 1' },
    { id: 2, tilte: 'Item 2' },
    { id: 3, tilte: 'Item 3' },
  ].find(v => v.id == Number(c.req.param('id')))
  if (!obj) return c.text('Not Found', 404)
  return c.json(obj)
})

export default handle(app)
