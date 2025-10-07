import { CreateUser } from '../../../../src/users/application/create/CreateUser'; // Ruta a tu clase
import { IUserRepository } from '../../../../src/users/domain/IUserRepository'; // Ruta a la interfaz
import { User } from '../../../../src/shared/domain/entities/User'; // Ruta a la entidad de dominio
import { CreateUserDto } from '../../../../src/users/application/create/CreateUserDto'; // Ruta al DTO

// 1. Mock del Repositorio
// Creamos un objeto falso que simula ser el IUserRepository.
// Usamos jest.fn() para poder espiar cuándo y con qué se llaman sus métodos.
const mockUserRepository: IUserRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
};

describe('CreateUser Use Case', () => {
    let createUser: CreateUser;

    // Se ejecuta antes de cada test para asegurar un estado limpio
    beforeEach(() => {
        // Limpiamos cualquier registro de llamadas anteriores en el mock
        jest.clearAllMocks();
        // Creamos una nueva instancia de nuestro caso de uso, inyectando el mock
        createUser = new CreateUser(mockUserRepository);
    });

    it('should correctly create a user entity and call the repository', async () => {
        // --- ARRANGE (Organizar) ---

        // a) Datos de entrada para el caso de uso (el DTO)
        const inputDto: CreateUserDto = {
            id: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phoneNumber: '123456789',
            role: 'user',
            address: {
                addressLine1: '123 Main St',
                city: 'Anytown',
                stateOrProvince: 'Anystate',
                postalCode: '12345',
                country: 'USA',
            },
        };

        // b) El objeto User que esperamos que el repositorio devuelva
        const expectedUser = new User(inputDto);

        // c) Configuramos el mock: cuando se llame a 'create', debe devolver nuestro 'expectedUser'
        (mockUserRepository.create as jest.Mock).mockResolvedValue(expectedUser);

        // --- ACT (Actuar) ---

        // Ejecutamos el método que queremos probar
        const result = await createUser.execute(inputDto);

        // --- ASSERT (Afirmar) ---

        // 1. Verificamos que el método 'create' del repositorio fue llamado una vez
        expect(mockUserRepository.create).toHaveBeenCalledTimes(1);

        // 2. Verificamos que se llamó con un objeto que es una instancia de la clase User
        expect(mockUserRepository.create).toHaveBeenCalledWith(expect.any(User));

        // 3. Verificamos que el objeto pasado al repositorio contiene los datos correctos del DTO
        expect(mockUserRepository.create).toHaveBeenCalledWith(
            expect.objectContaining({
                name: 'John Doe',
                email: 'john.doe@example.com',
                address: expect.objectContaining({
                    city: 'Anytown'
                })
            })
        );

        // 4. Verificamos que el resultado devuelto por el caso de uso es el mismo que devolvió el repositorio
        expect(result).toEqual(expectedUser);
    });
});