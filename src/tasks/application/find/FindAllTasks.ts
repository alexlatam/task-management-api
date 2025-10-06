// src/core/services/UserService.ts
import {ITaskRepository} from '../../domain/ITaskRepository';
import {Task} from '../../domain/Task';

export class FindAllTasks {
    constructor(private userRepository: ITaskRepository) {
    }

    async execute(): Promise<Task[]> {
      return this.userRepository.findAll();
    }
}