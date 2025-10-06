import { Router } from 'express';
import taskController from '../controllers/taskController';
import {body} from "express-validator";
import {validations} from '../middlewares/request-validations';

const router = Router();

router.get('/:id', taskController.getTask); // GET /task/:id
router.get('/', taskController.getAllTasks); // GET /tasks
router.post('/',
    body('id', 'The id is requeried and must be an uuid valid.').notEmpty().isString().isUUID().trim(),
    body('title', 'The title is requeried.').notEmpty().isString().trim(),
    body('description', 'The description is requeried.').notEmpty().isString().trim().isLength({max: 500}),
    body('priority', 'The priority is requeried.').notEmpty().isString().isIn(['low', 'medium', 'high']),
    body('createdBy', 'The createdBy is requeried and must be an uuid valid.').notEmpty().isString().isUUID().trim(),
    body('dueDate', 'The dueDate is requeried.').notEmpty().isISO8601().toDate(),
    [validations],
    taskController.createTask); // POST /task
router.delete('/:id', taskController.deleteTask); // DELETE /task/:id
router.post('/:id/assign',
    body('user_id', 'The id is requeried and must be an uuid valid.').notEmpty().isString().isUUID().trim(),
    [validations],
    taskController.postAssignToUser); // GET /users/:id/tasks
router.get('/:id/users', taskController.getAllAssignedToSpecificUser); // GET /users/:id/tasks

export default router;