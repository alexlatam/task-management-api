import { Router } from 'express';
import userController from '../controllers/userController';
import {body} from "express-validator";
import {validations} from '../middlewares/request-validations';

const router = Router();

router.get('/:id', userController.getUser); // GET /users/:id
router.get('/', userController.getAllUsers); // GET /users
router.post('/',
    body('id', 'The id is requeried and must be an uuid valid.').notEmpty().isString().isUUID().trim(),
    body('name', 'The field name is requeried.').notEmpty().isString().trim(),
    body('email', 'The email is requeried and must have a correct format.').isEmail().normalizeEmail(),
    body('phoneNumber', 'The phone number is requeried.').notEmpty().isString(),
    body('role', 'The role is requeried.').notEmpty().isString().isIn(['admin', 'user']),

    // validatoin for address object
    body('address.addressLine1', 'the field addressLine1 is requeried.').notEmpty().isString(),
    body('address.addressLine2').optional().isString(), // Opcional
    body('address.city', 'The city is requeried.').notEmpty().isString(),
    body('address.stateOrProvince', 'The state or province is requeried.').notEmpty().isString(),
    body('address.postalCode', 'The postal code is requeried.').notEmpty().isString(),
    body('address.country', 'The country is requeried.').notEmpty().isString(),
    [validations],
    userController.createUser); // POST /users

export default router;