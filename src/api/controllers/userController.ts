import { Request, Response } from 'express';
import { UserService } from '../core/services/UserService';
import { UserRepository } from '../../infrastructure/persistence/repositories/UserRepository';
import {CreateUserDto} from "../core/services/CreateUserDto";

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

const userController = {
  async getAllUsers(req: Request, res: Response) {
    const users = await userService.getAllUsers();
    res.json(users);
  },

  async getUser(req: Request, res: Response){
      // copilot: get user
        const user = await userService.getUser(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
  },

  async createUser(req: Request, res: Response) {
      const dto = new CreateUserDto(req.body);

    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  },
};
export default userController