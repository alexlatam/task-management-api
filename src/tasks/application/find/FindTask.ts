import {ITaskRepository} from '../../domain/ITaskRepository';
import {Task} from '../../domain/Task';

export class FindTask {
    constructor(private userRepository: ITaskRepository) {
    }

    async execute(id: string): Promise<Task | null> {
        return this.userRepository.findById(id);
    }
}