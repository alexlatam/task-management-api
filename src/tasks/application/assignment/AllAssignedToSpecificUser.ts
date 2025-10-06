import {ITaskRepository} from '../../domain/ITaskRepository';
import {Task} from '../../domain/Task';

export class AllAssignedToSpecificUser {
    constructor(private taskRepository: ITaskRepository) {
    }

    async execute(id: string): Promise<Task[]> {
        return this.taskRepository.findAllAssignedToSpecificUser(id);
    }
}