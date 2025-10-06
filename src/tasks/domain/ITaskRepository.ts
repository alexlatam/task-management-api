import {Task} from "./Task";

export interface ITaskRepository {
    findAll(): Promise<Task[]>;

    findById(id: string): Promise<Task | null>;

    create(user: Omit<Task, 'id'>): Promise<Task>;

    delete(id: string): Promise<void>;

    findAllAssignedToSpecificUser(id: string): Promise<Task[]>;

    save(task: Task): Promise<void>;
}