import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'

interface User {
    user_id: string
    role_id: string
    username: string
}

interface AuthenticatedRequest extends Request {
    user?: User
}

export const authenticate = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided' })
        }

        const token = authHeader.split(' ')[1]

        // Verify token
        const decoded = jwt.verify(token, config.jwt.secret) as User

        // Check user existence in Redis
        const userKey = `user:${decoded.user_id}`
        const user = await config.redis.client.get(userKey)
        
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' })
        }

        // Rate limiting
        const apiUsageKey = `api_usage:${decoded.user_id}`
        const apiUsage = await config.redis.client.get(apiUsageKey)
        const usage = apiUsage ? parseInt(apiUsage as string) : 0

        await config.redis.client.incr(apiUsageKey)
        await config.redis.client.expire(apiUsageKey, 24 * 60 * 60)

        if (usage > config.api.rateLimit) {
            return res.status(429).json({ message: 'API rate limit exceeded' })
        }

        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

export const checkRole = (allowedRoles: string[]) => {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' })
        }

        const userRole = req.user.role_id
        
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ message: 'Insufficient permissions' })
        }

        next()
    }
}

// Token generation utility
export const generateToken = (user: User) => {
    return jwt.sign(
        { 
            user_id: user.user_id, 
            role_id: user.role_id, 
            username: user.username 
        }, 
        config.jwt.secret, 
        { expiresIn: '1d' }
    )
}
