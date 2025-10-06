import {Request, Response} from 'express';
import {CreateUser} from '../../application/create/CreateUser';
import {FindUser} from '../../application/find/FindUser';
import {FindAllUsers} from '../../application/find/FindAllUsers';
import {UserRepository} from '../persistence/repositories/UserRepository';
import {CreateUserDto} from "../../application/create/CreateUserDto";

const userRepository = new UserRepository();
const createUser = new CreateUser(userRepository);
const findAllUsers = new FindAllUsers(userRepository);
const findUser = new FindUser(userRepository);

const userController = {
    async getAllUsers(req: Request, res: Response) {
        const users = await findAllUsers.execute();
        res.json(users);
    },

    async getUser(req: Request, res: Response) {
        const user = await findUser.execute(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    },

    async createUser(req: Request, res: Response) {
        const user = await findUser.execute(req.body.id);

        if (user != null) {
            return res.status(400).json({message: 'User with this ID already exists'});
        }

        const dto = new CreateUserDto(req.body);

        const newUser = await createUser.execute(dto);
        res.status(201).json(newUser);
    },
};
export default userController