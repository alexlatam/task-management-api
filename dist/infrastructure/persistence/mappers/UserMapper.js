"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMapper = void 0;
const User_1 = require("../../../api/core/domain/User");
const Address_1 = require("../../../api/core/domain/Address");
const UserOrmEntity_1 = require("../entities/UserOrmEntity");
class UserMapper {
    static toDomain(entity) {
        const address = new Address_1.Address({
            addressLine1: entity.address.addressLine1,
            addressLine2: entity.address.addressLine2,
            city: entity.address.city,
            stateOrProvince: entity.address.stateOrProvince,
            postalCode: entity.address.postalCode,
            country: entity.address.country,
        });
        return new User_1.User({
            id: entity.id,
            name: entity.name,
            email: entity.email,
            phoneNumber: entity.phoneNumber,
            address: address,
            role: entity.role,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        });
    }
    static toEntity(domain) {
        const entity = new UserOrmEntity_1.UserOrmEntity();
        // Aquí harías el mapeo inverso, de Dominio a Entidad de TypeORM
        //
        return entity;
    }
}
exports.UserMapper = UserMapper;
