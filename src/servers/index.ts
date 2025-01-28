import express from 'express'
import figlet from 'figlet'
import { userRouter } from '../routes/user.route'
import { authenticate } from '../middleware/auth.middleware'

export class ServerModule {
    private readonly app: express.Application

    constructor() {
        this.app = express()
        this.configureMiddleware()
        this.configureRoutes()
    }

    private configureMiddleware(): void {
        this.app.use(express.json())
    }

    private configureRoutes(): void {
        // Create base API router
        const apiRouter = express.Router()

        // Base API route with ASCII art welcome message
        apiRouter.get('/', (req, res) => {
            const body = figlet.textSync('Welcome to the Chat Knowledge Base Server!')
            res.setHeader('Content-Type', 'text/plain')
            res.send(body)
        })

        // Register user routes under /users path
        apiRouter.use('/users', authenticate as express.RequestHandler, userRouter)

        // Apply base path to all API routes
        this.app.use('/api', apiRouter)
    }
    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`)
        })
    }
}

export default new ServerModule()