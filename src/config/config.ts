import { z } from 'zod'
import { Redis } from '@upstash/redis'

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
    UPSTASH_REDIS_REST_URL: z.string().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
    API_RATE_LIMIT: z.string().default('1000').transform(Number),
})

const env = envSchema.parse(process.env)

// Initialize Upstash Redis with connection logging
export const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
})

// Verify Redis connection
let connectionVerified = false
async function verifyRedisConnection() {
    // Prevent multiple verification logs
    if (connectionVerified) return true

    try {
        // Attempt a simple ping operation
        await redis.ping()
        console.log('✅ Redis Connection: Successful')
        connectionVerified = true
        return true
    } catch (error) {
        console.error('❌ Redis Connection: Failed', error)
        connectionVerified = false
        return false
    }
}

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
        client: redis,
        verifyConnection: verifyRedisConnection
    },
    api: {
        rateLimit: env.API_RATE_LIMIT,
    },
} as const
