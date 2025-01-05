import express from "express";
import {
  createBookMark,
  getAll,
  getFolder,
  deleteBookMark,
  getBookMark,
  updateBookMark
} from "../controllers/bookmarks.controllers.js";
const router = express.Router();
router.route("/").post(createBookMark).get(getAll);
router.route("/:id").get(getBookMark).delete(deleteBookMark).put(updateBookMark);
router.route("/folders/:folder").get(getFolder);
export default router;
