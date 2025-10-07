import { DeleteTask } from '../../../../src/tasks/application/delete/DeleteTask'; // Ruta a tu clase
import { ITaskRepository } from '../../../../src/tasks/domain/ITaskRepository'; // Ruta a la interfaz

// 1. Mock del Repositorio
const mockTaskRepository: ITaskRepository = {
    findAllAssignedToSpecificUser: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    save: jest.fn(),
};

describe('DeleteTask Use Case', () => {
    let deleteTask: DeleteTask;

    // Limpiamos los mocks antes de cada prueba.
    beforeEach(() => {
        jest.clearAllMocks();
        deleteTask = new DeleteTask(mockTaskRepository);
    });

    it('should call the repository to delete a task', async () => {
        // --- ARRANGE (Organizar) ---

        const taskId = 'task-to-delete-123';

        // Configuramos el mock para que la función 'delete' se resuelva sin problemas.
        (mockTaskRepository.delete as jest.Mock).mockResolvedValue(undefined);

        // --- ACT (Actuar) ---

        // Ejecutamos el método que queremos probar.
        await deleteTask.execute(taskId);

        // --- ASSERT (Afirmar) ---

        // 1. Verificamos que el método 'delete' del repositorio fue llamado una vez.
        expect(mockTaskRepository.delete).toHaveBeenCalledTimes(1);

        // 2. Verificamos que fue llamado con el ID de la tarea correcto.
        expect(mockTaskRepository.delete).toHaveBeenCalledWith(taskId);
    });
});