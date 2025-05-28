import express from 'express';
import { createUser, deleteAllUsers, deleteUser, getAllUsers, loginUser } from '../controllers/users.controllers.js';

const router=express.Router();
router.route('/').post(createUser).get(getAllUsers).delete(deleteUser);
router.route('/login').post(loginUser)
router.route('/deleteAll').delete(deleteAllUsers)

export default router