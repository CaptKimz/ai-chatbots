import express from 'express';
import figlet from 'figlet';
import { userRouter } from '../routes/user.route';
import { authenticate } from '../middleware/auth.middleware';
import { swaggerMiddleware, swaggerSetup } from '../swagger';

export class ServerModule {
    private readonly app: express.Application;

    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.configureRoutes();
    }

    private configureMiddleware(): void {
        this.app.use(express.json());
        this.app.use('/api-docs', swaggerMiddleware, swaggerSetup);
    }

    private configureRoutes(): void {
        // Create base API router
        const apiRouter = express.Router();

        // Base API route with ASCII art welcome message
        apiRouter.get('/', (req, res) => {
            const body = figlet.textSync('Hello API!');
            res.setHeader('Content-Type', 'text/plain');
            res.send(body);
        });

        // Register user routes under /users path
        apiRouter.use('/users', authenticate as express.RequestHandler, userRouter);

        // Apply base path to all API routes
        this.app.use('/api', apiRouter);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}

export default new ServerModule();
