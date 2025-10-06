import {IUserRepository} from '../../../domain/IUserRepository';
import {User} from '../../../domain/User';
import {UserOrmEntity} from '../entities/UserOrmEntity';
import {UserMapper} from '../mappers/UserMapper';
import {AppDataSource} from '../../../../data/database';
import {Repository} from 'typeorm';

export class UserRepository implements IUserRepository {
    private ormRepository: Repository<UserOrmEntity>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(UserOrmEntity);
    }

    async findAll(): Promise<User[]> {
        return this.ormRepository.find().then(entities => entities.map(UserMapper.toDomain));
    }

    async findById(id: string): Promise<User | null> {
        const entity = await this.ormRepository.findOneBy({id});
        return entity ? UserMapper.toDomain(entity) : null;
    }

    async create(user: User): Promise<User> {
        const userOrm = UserMapper.toEntity(user as User);
        // console.log(userOrm);
        const savedEntity = await this.ormRepository.save(userOrm);
        return UserMapper.toDomain(savedEntity);
    }
}