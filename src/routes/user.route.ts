import express from 'express'
import { UsersHandler } from '../handlers/users.handler'

const router = express.Router()
const usersHandler = new UsersHandler()

//#region User routes
router.get('/getUserList', usersHandler.getAllUsers)
router.get('/getUser/:id', usersHandler.getUserById)
router.post('/create', usersHandler.createUser)
router.put('/update/:id', usersHandler.updateUser)
router.delete('/remove/:id', usersHandler.deleteUser)

export const userRouter = router

//#region Swagger doc
/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a list of users
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:    
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 * /api/create:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *     NewUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 */
