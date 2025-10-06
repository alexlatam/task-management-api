import {ITaskRepository} from '../../domain/ITaskRepository';

export class DeleteTask {
    constructor(private userRepository: ITaskRepository) {
    }

    async execute(id: string): Promise<void> {
        console.log("IDDDDD:" + id);
        await this.userRepository.delete(id);
    }
}