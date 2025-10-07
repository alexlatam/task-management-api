// tests/application/FindAllUsers.test.ts

import {FindAllUsers} from '../../../../src/users/application/find/FindAllUsers'; // Ruta a tu clase
import {IUserRepository} from '../../../../src/users/domain/IUserRepository'; // Ruta a la interfaz
import {User} from '../../../../src/shared/domain/entities/User';
import {Address} from "../../../../src/shared/domain/entities/Address"; // Ruta a la entidad

// 1. Mock del Repositorio
// Creamos una versión falsa del IUserRepository con sus métodos simulados.
const mockUserRepository: IUserRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
};

describe('FindAllUsers Use Case', () => {
    let findAllUsers: FindAllUsers;

    // Limpiamos los mocks antes de cada prueba para evitar interferencias
    beforeEach(() => {
        jest.clearAllMocks();
        findAllUsers = new FindAllUsers(mockUserRepository);
    });

    it('should return an array of users from the repository', async () => {
        // --- ARRANGE (Organizar) ---

        // a) Creamos una lista de usuarios falsos que simulará la respuesta de la base de datos
        const mockAddress = new Address({
            addressLine1: '123 Main St',
            city: 'Anytown',
            stateOrProvince: 'Anystate',
            postalCode: '12345',
            country: 'USA',
            addressLine2: 'Apt 4B',
        });

        const mockUsers = [
            new User({
                id: '1',
                name: 'Alice',
                email: 'alice@example.com',
                phoneNumber: "+01 52684596",
                role: "user",
                address: mockAddress
            }),
            new User({
                id: '2',
                name: 'Bob',
                email: 'bob@example.com',
                phoneNumber: "+01 52684596",
                role: "user",
                address: mockAddress
            }),
        ];

        // b) Configuramos el mock: cuando se llame a 'findAll', debe devolver nuestra lista de usuarios
        (mockUserRepository.findAll as jest.Mock).mockResolvedValue(mockUsers);

        // --- ACT (Actuar) ---

        // Ejecutamos el método que queremos probar
        const result = await findAllUsers.execute();

        // --- ASSERT (Afirmar) ---

        // 1. Verificamos que el método 'findAll' del repositorio fue llamado una vez
        expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);

        // 2. Verificamos que el resultado devuelto es igual a la lista de usuarios que definimos
        expect(result).toEqual(mockUsers);
        expect(result.length).toBe(2);
    });

    it('should return an empty array if the repository finds no users', async () => {
        // --- ARRANGE ---

        // Configuramos el mock para que devuelva un array vacío
        (mockUserRepository.findAll as jest.Mock).mockResolvedValue([]);

        // --- ACT ---

        const result = await findAllUsers.execute();

        // --- ASSERT ---

        expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
        expect(result.length).toBe(0);
    });
});