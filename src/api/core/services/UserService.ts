// src/core/services/UserService.ts
import {IUserRepository} from '../interfaces/IUserRepository';
import {User} from '../domain/User';
import {Address} from "../domain/Address";
import {CreateUserDto} from "./CreateUserDto";

export class UserService {
    constructor(private userRepository: IUserRepository) {
    }

    async getAllUsers(): Promise<User[]> {
      return this.userRepository.findAll();
    }

    async getUser(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }

    async createUser(userData: CreateUserDto): Promise<User> {
        const address = new Address({
            addressLine1: userData.address.addressLine1,
            addressLine2: userData.address.addressLine2,
            city: userData.address.city,
            stateOrProvince: userData.address.stateOrProvince,
            postalCode: userData.address.postalCode,
            country: userData.address.country,
        })

        const entity = new User({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            address: address,
            role: userData.role,
        });
        return this.userRepository.create(entity);
    }
}