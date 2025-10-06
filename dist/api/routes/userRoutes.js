"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/routes/userRoutes.ts
const express_1 = require("express");
const userController_1 = require("../controllers/userController"); // Lo crearemos a continuación
const router = (0, express_1.Router)();
router.get('/:id', userController_1.userController.getUser); // GET /users/:id [cite: 24]
//router.get('/', userController.getAllUsers); // GET /users [cite: 21]
//router.post('/', userController.createUser); // POST /users [cite: 25]
exports.default = router;
