  import { Request, Response, NextFunction } from 'express'
  import jwt from 'jsonwebtoken'
  import Redis from 'ioredis'
  import { config } from '../config'

  const redis = new Redis({
      host: config.redis.host,
      port: config.redis.port
  })

  interface AuthenticatedRequest extends Request {
      user?: {
          user_id: string
          role_id: string
          username: string
      }
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
          const decoded = jwt.verify(token, config.jwt.secret) as {
              user_id: string
              role_id: string
              username: string
          }

          const apiUsage = await redis.get(`api_usage:${decoded.user_id}`)
          const usage = apiUsage ? parseInt(apiUsage) : 0

          await redis.incr(`api_usage:${decoded.user_id}`)
          await redis.expire(`api_usage:${decoded.user_id}`, 24 * 60 * 60)

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
