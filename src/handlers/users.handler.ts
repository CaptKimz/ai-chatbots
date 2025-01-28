import { Request, Response } from 'express'
import { UserService } from '../services/user.service'
import { UserRepository } from '../repositories/user.repository'
import { UserCreateSchema } from '../validators/user.validator'
import { ZodError } from 'zod'

export class UsersHandler {
    private readonly userService: UserService

    constructor() {
        this.userService = new UserService(new UserRepository())
    }

    public getAllUsers = async (req: Request, res: Response) => {
        const users = await this.userService.getAllUsers()
        res.json(users)
    }

    public getUserById = async (req: Request, res: Response) => {
        const user = await this.userService.getUserById(req.params.id)
        res.json(user)
    }

    public createUser = async (req: Request, res: Response) => {
        try {
            const validatedData = UserCreateSchema.parse(req.body)
            const newUser = await this.userService.createUser(validatedData)
            res.status(201).json(newUser)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ errors: error.errors })
            } else if (error instanceof Error) {
                res.status(400).json({ error: error.message })
            } else {
                res.status(500).json({ error: 'Unknown error occurred' })
            }
        }
    }

    public updateUser = async (req: Request, res: Response) => {
        const updatedUser = await this.userService.updateUser(
            req.params.id,
            req.body
        )
        res.json(updatedUser)
    }

    public deleteUser = async (req: Request, res: Response) => {
        await this.userService.deleteUser(req.params.id)
        res.status(204).send()
    }
}
