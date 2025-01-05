import { getAllfolders, deleteFolder } from "../controllers/folders.controllers.js";
import express from 'express';

const router=express.Router();
router.route('/').get(getAllfolders);
router.route('/:id').delete(deleteFolder);

export default router;