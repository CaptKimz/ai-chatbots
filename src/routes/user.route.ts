import express from 'express'
import { UsersHandler } from '../handlers/users.handler'

const router = express.Router()
const usersHandler = new UsersHandler()

// User routes
router.get('/', usersHandler.getAllUsers)
router.get('/:id', usersHandler.getUserById)
router.post('/', usersHandler.createUser)
router.put('/:id', usersHandler.updateUser)
router.delete('/:id', usersHandler.deleteUser)

export const userRouter = router
