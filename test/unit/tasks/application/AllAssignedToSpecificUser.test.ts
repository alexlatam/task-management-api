import {AllAssignedToSpecificUser} from '../../../../src/tasks/application/assignment/AllAssignedToSpecificUser'; // Ruta a tu clase
import {ITaskRepository} from '../../../../src/tasks/domain/ITaskRepository'; // Ruta a la interfaz
import {Task} from '../../../../src/tasks/domain/Task'; // Ruta a la entidad

// 1. Mock del Repositorio
const mockTaskRepository: ITaskRepository = {
    findAllAssignedToSpecificUser: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
};

describe('AllAssignedToSpecificUser Use Case', () => {
    let allAssignedToSpecificUser: AllAssignedToSpecificUser;

    // Limpiamos los mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();
        allAssignedToSpecificUser = new AllAssignedToSpecificUser(mockTaskRepository);
    });

    it('should return an array of tasks for a specific user', async () => {
        // --- ARRANGE (Organizar) ---

        const userId = 'user-123';
        const mockTasks = [
            new Task({
                id: 'task-1',
                title: 'Tarea 1',
                description: 'Descripción de la tarea 1',
                priority: 'high',
                createdBy: 'other-user',
                dueDate: new Date('2025-01-15'),
                assignedTo: userId, /* ...otros datos */
            }),
            new Task({
                id: 'task-2',
                title: 'Tarea 2',
                description: 'Descripción de la tarea 2',
                priority: 'low',
                createdBy: 'other-user',
                dueDate: new Date('2025-01-16'),
                assignedTo: userId, /* ...otros datos */
            }),
        ];

        // Configuramos el mock para que devuelva la lista de tareas
        (mockTaskRepository.findAllAssignedToSpecificUser as jest.Mock).mockResolvedValue(mockTasks);

        // --- ACT (Actuar) ---

        const result = await allAssignedToSpecificUser.execute(userId);

        // --- ASSERT (Afirmar) ---

        // 1. Verificamos que el método del repositorio fue llamado una vez
        expect(mockTaskRepository.findAllAssignedToSpecificUser).toHaveBeenCalledTimes(1);

        // 2. Verificamos que fue llamado con el ID de usuario correcto
        expect(mockTaskRepository.findAllAssignedToSpecificUser).toHaveBeenCalledWith(userId);

        // 3. Verificamos que el resultado es la lista de tareas que esperábamos
        expect(result).toEqual(mockTasks);
        expect(result.length).toBe(2);
    });

    it('should return an empty array if no tasks are assigned to the user', async () => {
        // --- ARRANGE ---

        const userId = 'user-with-no-tasks';

        // Configuramos el mock para que devuelva un array vacío
        (mockTaskRepository.findAllAssignedToSpecificUser as jest.Mock).mockResolvedValue([]);

        // --- ACT ---

        const result = await allAssignedToSpecificUser.execute(userId);

        // --- ASSERT ---

        expect(mockTaskRepository.findAllAssignedToSpecificUser).toHaveBeenCalledTimes(1);
        expect(mockTaskRepository.findAllAssignedToSpecificUser).toHaveBeenCalledWith(userId);

        // Verificamos que el resultado es un array vacío
        expect(result).toEqual([]);
        expect(result.length).toBe(0);
    });
});