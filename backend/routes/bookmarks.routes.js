import express from "express";
import {
  createBookMark,
  getAll,
  getFolder,
  deleteBookMark,
  getBookMark,
  updateBookMark,
  deleteAllBookmarks,
  moveFolder
} from "../controllers/bookmarks.controllers.js";
const router = express.Router();
router.route("/").post(createBookMark).get(getAll);
router.route("/deleteAll").delete(deleteAllBookmarks);
router.route("/:id").get(getBookMark).delete(deleteBookMark).put(updateBookMark);
router.route("/folders/:folder").get(getFolder);
router.route("/folders/move/:id").put(moveFolder);
export default router;
