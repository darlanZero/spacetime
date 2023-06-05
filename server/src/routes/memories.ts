/* eslint-disable prettier/prettier */
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { FastifyInstance } from 'fastify'

export async function memoriesRoutes(app: FastifyInstance) {
  app.get('/memories', async () => {
    const memories = await prisma.memory.findMany({
        orderBy: {
            createdAt: 'asc',
        },
    })

    return memories.map(memory => {
        return {
           id: memory.id,
           coverUrl: memory.coverUrl, 
           excerpt: memory.content.substring(0, 115).concat('...')
        }
    })
  })

  app.get('/memories/:id', async (request) => {
    // const { id } = request.params

    const paramsSchema = z.object({
        id: z.string().uuid(),
    })
    
    const { id } = paramsSchema.parse(request.params)

    const memory = await prisma.memory.findUniqueOrThrow({
        where: {
            id,
        },
    })

    return memory
  })

  app.post('/memories', async (request) => {
    const BodySchema = z.object({
        content: z.string(),
        coverUrl: z.string(),
        isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = BodySchema.parse(request.body)

    const memory = await prisma.memory.create({
      data: {
        content,
        coverUrl,
        isPublic,
        userId: '0711e1d7-4590-41df-a1e1-967941daf3ba',
      }
    })

    return memory
  })

  app.put('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
  
    const { id } = paramsSchema.parse(request.params)
    
    const BodySchema = z.object({
      content: z.string(),
      coverUrl: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })

    const { content, coverUrl, isPublic } = BodySchema.parse(request.body)

    const memory = await prisma.memory.update({
      where: {
        id,
      },
      data: {
        content,
        coverUrl,
        isPublic,
      }
    })

    return memory
  })

  app.delete('/memories/:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })
  
  const { id } = paramsSchema.parse(request.params)

    await prisma.memory.delete({
      where: {
          id,
      },
    })
  })
}
