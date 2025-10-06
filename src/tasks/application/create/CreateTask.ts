import {ITaskRepository} from '../../domain/ITaskRepository';
import {Task} from '../../domain/Task';
import {CreateTaskDto} from "./CreateTaskDto";

export class CreateTask {
    constructor(private taskRepository: ITaskRepository) {
    }

    async execute(userData: CreateTaskDto): Promise<Task> {

        const entity = new Task({
            id: userData.id,
            title: userData.title,
            description: userData.description,
            priority: userData.priority,
            createdBy: userData.createdBy,
            dueDate: userData.dueDate,
        });

        return this.taskRepository.create(entity);
    }
}