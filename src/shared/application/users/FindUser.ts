// src/core/services/UserService.ts
import {IUserRepository} from '../../../users/domain/IUserRepository';
import {User} from '../../domain/entities/User';

export class FindUser {
    constructor(private userRepository: IUserRepository) {
    }

    async execute(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
}