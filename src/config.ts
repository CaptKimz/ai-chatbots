import { z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
    DB_HOST: z.string().min(1),
    DB_PORT: z.string().transform(Number),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_NAME: z.string().min(1),
    PORT: z.string().default('3000').transform(Number),
    JWT_SECRET: z.string().min(1),
    REDIS_HOST: z.string().default('localhost'),
    REDIS_PORT: z.string().default('6379').transform(Number),
    API_RATE_LIMIT: z.string().default('1000').transform(Number),
})

const env = envSchema.parse(process.env)

export const config = {
    environment: env.NODE_ENV,
    db: {
        host: env.DB_HOST,
        port: env.DB_PORT,
        user: env.DB_USER,
        password: env.DB_PASSWORD,
        name: env.DB_NAME,
    },
    server: {
        port: env.PORT,
    },
    jwt: {
        secret: env.JWT_SECRET,
    },
    redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
    },
    api: {
        rateLimit: env.API_RATE_LIMIT,
    },
} as const
