import { getAllfolders, deleteFolder, deleteAllFolders, renameFolder, getFolderId } from "../controllers/folders.controllers.js";
import express from 'express';

const router=express.Router();
router.route('/').get(getAllfolders);
router.route("/deleteAll").delete(deleteAllFolders);
router.route('/:id').delete(deleteFolder).put(renameFolder);
router.route('/folderId').post(getFolderId);

export default router;