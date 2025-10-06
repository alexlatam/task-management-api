import {IUserRepository} from '../../domain/IUserRepository';
import {User} from '../../../shared/domain/entities/User';

export class FindAllUsers {
    constructor(private userRepository: IUserRepository) {
    }

    async execute(): Promise<User[]> {
      return this.userRepository.findAll();
    }
}