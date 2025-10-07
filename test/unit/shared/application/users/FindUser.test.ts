// tests/application/FindUser.test.ts

import { FindUser } from '../../../../../src/shared/application/users/FindUser'; // Ruta a tu clase
import { IUserRepository } from '../../../../../src/users/domain/IUserRepository'; // Ruta a la interfaz
import { User } from '../../../../../src/shared/domain/entities/User';
import {Address} from "../../../../../src/shared/domain/entities/Address"; // Ruta a la entidad

// 1. Mock del Repositorio
// Creamos una versión falsa del IUserRepository con sus métodos simulados.
const mockUserRepository: IUserRepository = {
    findById: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
};

describe('FindUser Use Case', () => {
    let findUser: FindUser;

    // Limpiamos los mocks antes de cada prueba
    beforeEach(() => {
        jest.clearAllMocks();
        findUser = new FindUser(mockUserRepository);
    });

    it('should return a user when found by the repository', async () => {
        // --- ARRANGE (Organizar) ---

        // a) ID del usuario que vamos a buscar
        const userId = 'a1b2c3d4-e5f6-7890-1234-567890abcdef';

        const address = new Address({
            addressLine1: '123 Main St',
            city: 'Anytown',
            stateOrProvince: 'Anystate',
            postalCode: '12345',
            country: 'USA',
            addressLine2: 'Apt 4B',
        })
        // b) El objeto User que esperamos que el repositorio devuelva
        const mockUser = new User({
            id: userId,
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            phoneNumber: "+01 52684596",
            role: "admin",
            address: address
        });

        // c) Configuramos el mock: cuando se llame a 'findById', debe devolver nuestro 'mockUser'
        (mockUserRepository.findById as jest.Mock).mockResolvedValue(mockUser);

        // --- ACT (Actuar) ---

        // Ejecutamos el método que queremos probar
        const result = await findUser.execute(userId);

        // --- ASSERT (Afirmar) ---

        // 1. Verificamos que el método 'findById' del repositorio fue llamado una vez
        expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);

        // 2. Verificamos que fue llamado con el ID correcto
        expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);

        // 3. Verificamos que el resultado es el usuario que esperábamos
        expect(result).toEqual(mockUser);
    });

    it('should return null when the user is not found by the repository', async () => {
        // --- ARRANGE ---

        const userId = 'non-existent-id';

        // Configuramos el mock para que devuelva 'null'
        (mockUserRepository.findById as jest.Mock).mockResolvedValue(null);

        // --- ACT ---

        const result = await findUser.execute(userId);

        // --- ASSERT ---

        expect(mockUserRepository.findById).toHaveBeenCalledTimes(1);
        expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);

        // Verificamos que el resultado es nulo
        expect(result).toBeNull();
    });
});