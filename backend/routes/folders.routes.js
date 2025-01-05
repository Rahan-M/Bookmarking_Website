import { getAllfolders, deleteFolder, deleteAllFolders } from "../controllers/folders.controllers.js";
import express from 'express';

const router=express.Router();
router.route('/').get(getAllfolders);
router.route("/deleteAll").delete(deleteAllFolders);
router.route('/:id').delete(deleteFolder);

export default router;