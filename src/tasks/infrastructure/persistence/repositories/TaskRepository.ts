import {ITaskRepository} from '../../../domain/ITaskRepository';
import {Task} from '../../../domain/Task';
import {TaskOrmEntity} from '../entities/TaskOrmEntity';
import {TaskMapper} from '../mappers/TaskMapper';
import {AppDataSource} from '../../../../data/database';
import {Repository} from 'typeorm';

export class TaskRepository implements ITaskRepository {
    private ormRepository: Repository<TaskOrmEntity>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(TaskOrmEntity);
    }

    async findAll(): Promise<Task[]> {
        return this.ormRepository.find().then(entities => entities.map(TaskMapper.toDomain));
    }

    async findById(id: string): Promise<Task | null> {
        const entity = await this.ormRepository.findOneBy({id});
        return entity ? TaskMapper.toDomain(entity) : null;
    }

    async create(task: Task): Promise<Task> {
        const taskOrm = TaskMapper.toEntity(task);
        const savedEntity = await this.ormRepository.save(taskOrm);
        return TaskMapper.toDomain(savedEntity);
    }

    async delete(id: string): Promise<void> {
        await this.ormRepository.delete(id);
    }
}