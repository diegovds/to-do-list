import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

const bodySchema = z
  .object({
    content: z
      .string()
      .min(5, { message: 'Content deve ter no mínimo 5 caracteres' })
      .max(300, { message: 'Content deve ter no máximo 300 caracteres' }),
    priority: z.string(),
    status: z.string(),
  })
  .refine(
    (data) =>
      data.priority === 'high' ||
      data.priority === 'medium' ||
      data.priority === 'low',
    {
      message: 'Priority deve ser high, medium, ou low.',
    },
  )
  .refine(
    (data) =>
      data.status === 'todo' ||
      data.status === 'progress' ||
      data.status === 'done',
    {
      message: 'Status deve ser todo, progress ou done.',
    },
  )

const GetTodoByStatus = async (userId: string, status: string) => {
  return await prisma.todo.findMany({
    where: {
      AND: [
        {
          userId,
        },
        {
          status: {
            equals: status,
          },
        },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function todosRoute(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.post('/todos', async (request, reply) => {
    const { content, priority, status } = bodySchema.parse(request.body)

    const todo = await prisma.todo.create({
      data: {
        content,
        priority,
        status,
        userId: request.user.sub,
      },
    })

    return reply.status(201).send({ todo })
  })

  app.get('/todos', async (request) => {
    const todo = await GetTodoByStatus(request.user.sub, 'todo')
    const progress = await GetTodoByStatus(request.user.sub, 'progress')
    const done = await GetTodoByStatus(request.user.sub, 'done')

    return { todo, progress, done }
  })

  app.delete('/todos/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    let todo = await prisma.todo.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (todo.userId !== request.user.sub) {
      return reply.status(401).send({ message: 'Usuário não autorizado' })
    }

    todo = await prisma.todo.delete({
      where: {
        id,
      },
    })

    return { todo }
  })

  app.put('/todos/:id', async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)

    const { content, priority, status } = bodySchema.parse(request.body)

    let todo = await prisma.todo.findUniqueOrThrow({
      where: {
        id,
      },
    })

    if (todo.userId !== request.user.sub) {
      return reply.status(401).send({ message: 'Usuário não autorizado' })
    }

    todo = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        content,
        priority,
        status,
      },
    })

    return { todo }
  })
}
