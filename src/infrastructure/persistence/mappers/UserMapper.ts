import {User} from '../../../api/core/domain/User';
import {Address} from '../../../api/core/domain/Address';
import {UserOrmEntity} from '../entities/UserOrmEntity';

export class UserMapper {
  public static toDomain(entity: UserOrmEntity): User {

    const address = new Address({
        addressLine1: entity.address.addressLine1,
        addressLine2: entity.address.addressLine2,
        city: entity.address.city,
        stateOrProvince: entity.address.stateOrProvince,
        postalCode: entity.address.postalCode,
        country: entity.address.country,
    });

    return new User({
        id: entity.id,
        name: entity.name,
        email: entity.email,
        phoneNumber: entity.phoneNumber,
        address: address,
        role: entity.role as 'admin' | 'user',
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
    });
  }

  public static toEntity(domain: User): UserOrmEntity {

    const ormEntity = new UserOrmEntity();
    ormEntity.id = domain.id;
    ormEntity.name = domain.getName();
    ormEntity.email = domain.getEmail();
    ormEntity.phoneNumber = domain.getPhoneNumber();
    ormEntity.address = {
        addressLine1: domain.getAddress().addressLine1,
        addressLine2: domain.getAddress().addressLine2 ?? '',
        city: domain.getAddress().city,
        stateOrProvince: domain.getAddress().stateOrProvince,
        postalCode: domain.getAddress().postalCode,
        country: domain.getAddress().country,
    }

    ormEntity.role = domain.getRole();
    ormEntity.createdAt = domain.getCreatedAt() || new Date();
    ormEntity.updatedAt = domain.getUpdatedAt() || new Date();

    return ormEntity;
  }
}