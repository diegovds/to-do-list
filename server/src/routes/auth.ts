import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth', async (request, reply) => {
    const bodySchema = z.object({
      name: z
        .string()
        .min(2, { message: 'o nome deve ter pelo menos 2 caracteres' })
        .optional(),
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

    if (user && name) {
      return reply.status(400).send({
        message: 'Email já cadastrado',
      })
    }

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

    if (!user) {
      return reply.status(404).send({
        message: 'Usuário não cadastrado.',
      })
    }

    return reply.status(400).send({ message: 'Ocorreu um erro no servidor.' })
  })
}
