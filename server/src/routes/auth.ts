import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function authRoutes(app: FastifyInstance) {
  app.post('/users', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string().optional(),
      email: z.string().email({ message: 'email não válido' }),
      password: z
        .string()
        .min(6, { message: 'a senha deve ter pelo menos 6 caracteres' }),
    })

    const { name, email, password } = bodySchema.parse(request.body)

    let passwordVerify = false
    let passwordHash = ''

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      passwordVerify = await app.bcrypt.compare(password, user.password)

      if (!passwordVerify) {
        return reply.status(401).send({
          message: 'Senha incorreta.',
        })
      }
    }

    if (!user && name) {
      passwordHash = await app.bcrypt.hash(password)

      user = await prisma.user.create({
        data: {
          name,
          email,
          password: passwordHash,
        },
      })
    }

    if ((passwordVerify || passwordHash.length > 0) && user) {
      const token = app.jwt.sign(
        {
          name: user.name,
        },
        {
          sub: user.id,
          expiresIn: '30 days',
        },
      )

      return { token }
    }

    return reply.status(400).send({ message: 'Ocorreu um erro no servidor.' })
  })
}