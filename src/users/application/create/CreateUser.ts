import {IUserRepository} from '../../domain/IUserRepository';
import {User} from '../../../shared/domain/entities/User';
import {Address} from "../../../shared/domain/entities/Address";
import {CreateUserDto} from "./CreateUserDto";

export class CreateUser {
    constructor(private userRepository: IUserRepository) {
    }

    async execute(userData: CreateUserDto): Promise<User> {
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