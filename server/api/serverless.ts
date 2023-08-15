import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import fastify from 'fastify'
import bcrypt from 'fastify-bcrypt'

import { configDotenv } from 'dotenv'
import path from 'path'
import { authRoutes } from '../src/routes/auth'
import { todosRoute } from '../src/routes/todos'

const app = fastify({ logger: true })
const envFilePath = process.env.NODE_ENV === 'production' ? '.env.prod' : '.env'

configDotenv({
  path: path.resolve(__dirname, envFilePath),
})

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

app.register(authRoutes)
app.register(todosRoute)

export default async (req: any, res: any) => {
  await app.ready()
  app.server.emit('request', req, res)
}
