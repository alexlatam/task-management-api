import { Task } from '../../../../src/tasks/domain/Task'; // Asegúrate de que la ruta sea correcta

describe('Task Domain Entity', () => {
    it('should create a new task with default pending status', () => {
        // Arrange: Prepara los datos de prueba
        const taskProps = {
            id: 'b95e8a9a-32b4-4e4b-9e45-1b7b7a6a4c6a',
            title: 'Mi primera tarea',
            description: 'Descripción de la tarea',
            priority: 'high' as const, // 'as const' ayuda a TypeScript con los tipos literales
            dueDate: new Date(),
            createdBy: 'f1e2d3c4-b5a6-7890-1234-abcdef123456',
        };

        // Act: Ejecuta la lógica que quieres probar
        const task = new Task(taskProps);

        // Assert: Verifica que el resultado es el esperado
        expect(task).toBeInstanceOf(Task);
        expect(task.title).toBe('Mi primera tarea');
        expect(task.status).toBe('pending'); // Verifica que el valor por defecto se aplicó
        expect(task.assignedTo).toBeNull(); // Verifica que 'assignedTo' es nulo por defecto
    });
});