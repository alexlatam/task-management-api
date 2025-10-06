"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const UserService_1 = require("./../../api/core/services/UserService");
const UserRepository_1 = require("../../infrastructure/persistence/repositories/UserRepository");
const userRepository = new UserRepository_1.UserRepository();
const userService = new UserService_1.UserService(userRepository);
exports.userController = {
    /* async getAllUsers(req: Request, res: Response) {
      const users = await userService.getAllUsers();
      res.json(users);
    }, */
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // copilot: get user
            const user = yield userService.getUser(req.params.id);
            if (user) {
                res.json(user);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        });
    },
    /* async createUser(req: Request, res: Response) {
      // Aquí iría la validación del body
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    }, */
};
