import {FindTask} from '../../../../src/tasks/application/find/FindTask';
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

describe('FindTask Use Case', () => {
    let findTask: FindTask;

    beforeEach(() => {
        jest.clearAllMocks();
        findTask = new FindTask(mockTaskRepository);
    });

    it('should return a task when found', async () => {
        // Arrange
        const taskId = 'task-123';
        const mockTask = new Task({
            id: 'task-1',
            title: 'Tarea 1',
            description: 'Descripción de la tarea 1',
            priority: 'high',
            createdBy: 'other-user',
            dueDate: new Date('2025-01-15'),
        });
        (mockTaskRepository.findById as jest.Mock).mockResolvedValue(mockTask);

        // Act
        const result = await findTask.execute(taskId);

        // Assert
        expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
        expect(result).toEqual(mockTask);
    });

    it('should return null when not found', async () => {
        // Arrange
        const taskId = 'not-found-id';
        (mockTaskRepository.findById as jest.Mock).mockResolvedValue(null);

        // Act
        const result = await findTask.execute(taskId);

        // Assert
        expect(mockTaskRepository.findById).toHaveBeenCalledWith(taskId);
        expect(result).toBeNull();
    });
});