import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import 'dotenv/config'
import fastify from 'fastify'
import bcrypt from 'fastify-bcrypt'
import { authRoutes } from '../src/routes/auth'
import { todosRoute } from '../src/routes/todos'

const app = fastify()

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

export default async (req: any, res: any) => {
  await app.ready()
  app.server.emit('request', req, res)
}
