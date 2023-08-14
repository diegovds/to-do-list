import fastfy from 'fastify'
import { prisma } from './libs/prisma'

const app = fastfy()
app.get('/users', () => {
  const users = prisma.user.findMany()

  return users
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
