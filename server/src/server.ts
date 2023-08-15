import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import 'dotenv/config'
import fastfy from 'fastify'
import bcrypt from 'fastify-bcrypt'
import { authRoutes } from './routes/auth'
import { todosRoute } from './routes/todos'

const app = fastfy()

app.register(cors, {
  origin: true,
  /** origin: ['http://localhost:3000'], */
})

app.register(bcrypt, {
  saltWorkFactor: 10,
})

app.register(jwt, {
  secret: process.env.JWT_SECRET_KEY as string,
})

app.get('/', async () => {
  return { API: 'Todo List' }
})

app.register(authRoutes)
app.register(todosRoute)

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })
