import { User } from '../entities/user.entity'
import { UserRepository } from '../repositories/user.repository'

export interface IUserService {
    getAllUsers(): Promise<User[]>
    getUserById(id: string): Promise<User | null>
    createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User>
    updateUser(id: string, updates: Partial<User>): Promise<User | null>
    deleteUser(id: string): Promise<boolean>
}

export class UserService implements IUserService {
    constructor(private readonly userRepository: UserRepository) {}

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.findAll()
    }

    async getUserById(id: string): Promise<User | null> {
        if (!id) throw new Error('User ID is required')
        return this.userRepository.findById(id)
    }

    async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
        if (!userData.email || !userData.name) {
            throw new Error('Name and email are required')
        }
        return this.userRepository.create(userData)
    }

    async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
        if (!id) throw new Error('User ID is required')
        return this.userRepository.update(id, updates)
    }

    async deleteUser(id: string): Promise<boolean> {
        if (!id) throw new Error('User ID is required')
        return this.userRepository.delete(id)
    }
}
