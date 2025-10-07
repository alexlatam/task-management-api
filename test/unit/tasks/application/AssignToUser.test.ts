import {AssignToUser} from '../../../../src/tasks/application/assignment/AssignToUser'; // Ruta a tu clase
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

// 2. Mock parcial de la entidad Task
// Hacemos un mock solo del método que queremos espiar.
jest.mock('../../../../src/tasks/domain/Task', () => {
    return {
        Task: jest.fn().mockImplementation((props) => {
            return {
                ...props,
                assignToUser: jest.fn(), // Creamos una función espía para este método
            };
        }),
    };
});


describe('AssignToUser Use Case', () => {
    let assignToUser: AssignToUser;

    // Limpiamos los mocks antes de cada prueba.
    beforeEach(() => {
        jest.clearAllMocks();
        assignToUser = new AssignToUser(mockTaskRepository);
    });

    it('should assign a user to a task and save it', async () => {
        // --- ARRANGE (Organizar) ---

        const userId = 'user-123';
        // Creamos una instancia de nuestra tarea mockeada.
        const mockTask = new Task({
            id: 'task-1',
            title: 'Tarea 1',
            description: 'Descripción de la tarea 1',
            priority: 'high',
            createdBy: 'other-user',
            dueDate: new Date('2025-01-15'),
            assignedTo: userId, /* ...otros datos */
        });

        // Configuramos el mock del repositorio para que la función 'save' se resuelva sin problemas.
        (mockTaskRepository.save as jest.Mock).mockResolvedValue(undefined);

        // --- ACT (Actuar) ---

        // Ejecutamos el método que queremos probar.
        await assignToUser.execute(mockTask, userId);

        // --- ASSERT (Afirmar) ---

        // 1. Verificamos que el método 'assignToUser' de la tarea fue llamado una vez.
        expect(mockTask.assignToUser).toHaveBeenCalledTimes(1);

        // 2. Verificamos que fue llamado con el ID de usuario correcto.
        expect(mockTask.assignToUser).toHaveBeenCalledWith(userId);

        // 3. Verificamos que el método 'save' del repositorio fue llamado una vez.
        expect(mockTaskRepository.save).toHaveBeenCalledTimes(1);

        // 4. Verificamos que se llamó a 'save' con la instancia de la tarea que fue modificada.
        expect(mockTaskRepository.save).toHaveBeenCalledWith(mockTask);
    });
});