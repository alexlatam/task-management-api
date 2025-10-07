import {FindAllTasks} from '../../../../src/tasks/application/find/FindAllTasks';
import {ITaskRepository} from '../../../../src/tasks/domain/ITaskRepository';
import {Task} from '../../../../src/tasks/domain/Task';

// Mock del Repositorio
const mockTaskRepository: ITaskRepository = {
    findAllAssignedToSpecificUser: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
};

describe('FindAllTasks Use Case', () => {
    let findAllTasks: FindAllTasks;

    beforeEach(() => {
        jest.clearAllMocks();
        findAllTasks = new FindAllTasks(mockTaskRepository);
    });

    it('should return an array of tasks', async () => {
        // Arrange
        const mockTasks = [
            new Task({
                id: 'task-1',
                title: 'Tarea 1',
                description: 'Descripción de la tarea 1',
                priority: 'high',
                createdBy: 'other-user',
                dueDate: new Date('2025-01-15'),
            }),
            new Task({
                id: 'task-2',
                title: 'Tarea 2',
                description: 'Descripción de la tarea 2',
                priority: 'low',
                createdBy: 'other-user',
                dueDate: new Date('2025-01-15'),
            })
        ];
        (mockTaskRepository.findAll as jest.Mock).mockResolvedValue(mockTasks);

        // Act
        const result = await findAllTasks.execute();

        // Assert
        expect(mockTaskRepository.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockTasks);
    });
});