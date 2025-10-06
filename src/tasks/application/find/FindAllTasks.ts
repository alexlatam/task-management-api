import {ITaskRepository} from '../../domain/ITaskRepository';
import {Task} from '../../domain/Task';

export class FindAllTasks {
    constructor(private taskRepository: ITaskRepository) {
    }

    async execute(): Promise<Task[]> {
      return this.taskRepository.findAll();
    }
}