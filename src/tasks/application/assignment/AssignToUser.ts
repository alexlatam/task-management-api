import {ITaskRepository} from '../../domain/ITaskRepository';
import {Task} from '../../domain/Task';

export class AssignToUser {
    constructor(private taskRepository: ITaskRepository) {
    }

    async execute(task: Task, userId: string): Promise<void> {
        task.assignToUser(userId);

        await this.taskRepository.save(task);
    }
}