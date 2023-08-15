import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function usersRoute(app: FastifyInstance) {
  app.post('/users', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      email: z.string().email({ message: 'email não válido' }),
      password: z
        .string()
        .min(6, { message: 'a senha deve ter pelo menos 6 caracteres' }),
    })

    const { name, email, password } = bodySchema.parse(request.body)

    const passwordHash = await app.bcrypt.hash(password)

    return { name, email, passwordHash }
  })
}
