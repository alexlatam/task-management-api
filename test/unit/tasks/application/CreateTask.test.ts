import { CreateTask } from '../../../../src/tasks/application/create/CreateTask';
import { ITaskRepository } from '../../../../src/tasks/domain/ITaskRepository';
import { Task } from '../../../../src/tasks/domain/Task';
import { CreateTaskDto } from '../../../../src/tasks/application/create/CreateTaskDto';

// Mock del Repositorio
const mockTaskRepository: ITaskRepository = {
    findAllAssignedToSpecificUser: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
};

describe('CreateTask Use Case', () => {
    let createTask: CreateTask;

    beforeEach(() => {
        jest.clearAllMocks();
        createTask = new CreateTask(mockTaskRepository);
    });

    it('should create a task and call the repository', async () => {
        // Arrange
        const inputDto: CreateTaskDto = {
            id: 'new-task-id',
            title: 'New Task',
            description: 'A description',
            priority: 'medium',
            createdBy: 'user-creator-id',
            dueDate: new Date(),
        };
        const expectedTask = new Task(inputDto);
        (mockTaskRepository.create as jest.Mock).mockResolvedValue(expectedTask);

        // Act
        const result = await createTask.execute(inputDto);

        // Assert
        expect(mockTaskRepository.create).toHaveBeenCalledTimes(1);
        // Verifica que se llamó con un objeto que tiene las propiedades correctas
        expect(mockTaskRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
                id: 'new-task-id',
                title: 'New Task',
                priority: 'medium',
            }),
        );
        expect(result).toEqual(expectedTask);
    });
});