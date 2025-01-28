import { User } from '../entities/user.entity'
import client from '../database/sql'

export interface IUserRepository {
    findAll(): Promise<User[]>
    findById(id: string): Promise<User | null>
    create(user: Omit<User, 'id' | 'createdAt'>): Promise<User>
    update(id: string, user: Partial<User>): Promise<User | null>
    delete(id: string): Promise<boolean>
}

export class UserRepository implements IUserRepository {
    async findAll(): Promise<User[]> {
        const { rows } = await client.query<User>(
            'SELECT id, name, email, created_at AS "createdAt" FROM users'
        )
        return rows
    }

    async findById(id: string): Promise<User | null> {
        const { rows } = await client.query<User>(
            'SELECT id, name, email, created_at AS "createdAt" FROM users WHERE id = $1',
            [id]
        )
        return rows[0] || null
    }

    async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
        const { rows } = await client.query<User>(
            `INSERT INTO users (name, email)
             VALUES ($1, $2)
             RETURNING id, name, email, created_at AS "createdAt"`,
            [userData.name, userData.email]
        )
        return rows[0]
    }

    async update(id: string, updates: Partial<User>): Promise<User | null> {
        const { rows } = await client.query<User>(
            `UPDATE users 
             SET name = COALESCE($1, name), 
                 email = COALESCE($2, email)
             WHERE id = $3
             RETURNING id, name, email, created_at AS "createdAt"`,
            [updates.name, updates.email, id]
        )
        return rows[0] || null
    }

    async delete(id: string): Promise<boolean> {
        const { rowCount } = await client.query(
            'DELETE FROM users WHERE id = $1',
            [id]
        )
        return (rowCount ?? 0) > 0
    }
}