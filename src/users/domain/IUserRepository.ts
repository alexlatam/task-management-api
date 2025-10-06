import { User } from './User';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  create(user: Omit<User, 'id'>): Promise<User>;
}