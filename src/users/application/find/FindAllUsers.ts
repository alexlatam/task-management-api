// src/core/services/UserService.ts
import {IUserRepository} from '../../domain/IUserRepository';
import {User} from '../../domain/User';

export class FindAllUsers {
    constructor(private userRepository: IUserRepository) {
    }

    async execute(): Promise<User[]> {
      return this.userRepository.findAll();
    }
}