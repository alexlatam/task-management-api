import {Request, Response} from 'express';
import {CreateTask} from '../../application/create/CreateTask';
import {FindTask} from '../../application/find/FindTask';
import {FindAllTasks} from '../../application/find/FindAllTasks';
import {TaskRepository} from '../persistence/repositories/TaskRepository';
import {CreateTaskDto} from "../../application/create/CreateTaskDto";
import {DeleteTask} from "../../application/delete/DeleteTask";

const taskRepository = new TaskRepository();
const createTask = new CreateTask(taskRepository);
const findAllTasks = new FindAllTasks(taskRepository);
const findTask = new FindTask(taskRepository);
const deleteTask = new DeleteTask(taskRepository);

const taskController = {
    async getAllTasks(req: Request, res: Response) {
        const tasks = await findAllTasks.execute();
        res.json(tasks);
    },

    async getTask(req: Request, res: Response) {
        const task = await findTask.execute(req.params.id);
        if (task) {
            res.json({
                data: task,
                message: 'Task retrieved successfully'
            });
        } else {
            res.status(404).json({message: 'Task not found'});
        }
    },

    async createTask(req: Request, res: Response) {
        const task = await findTask.execute(req.body.id);

        if (task != null) {
            return res.status(400).json({message: 'Task with this ID already exists'});
        }

        // validate that user with this id does not exist

        const dto = new CreateTaskDto(req.body);

        const newTask = await createTask.execute(dto);
        res.status(201).json({
            data: newTask,
            message: 'Task created successfully'
        });
    },

    async deleteTask(req: Request, res: Response) {
        const task = await findTask.execute(req.params.id);

        if (task == null) {
            return res.status(400).json({message: 'Task with this ID does not exist'});
        }

        await deleteTask.execute(req.params.id);

        res.status(204).send();
    }
};
export default taskController