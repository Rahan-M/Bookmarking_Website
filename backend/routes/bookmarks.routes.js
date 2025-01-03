import express from "express";
import {
  createBookMark,
  getAll,
  getFolder,
  deleteBookMark,
  getBookMark,
  updateBookMark
} from "../controllers/booksmarks.controllers.js";
const router = express.Router();
router.route("/").post(createBookMark).get(getAll);
router.route("/:folder").get(getFolder);
router.route("/get/:id").get(getBookMark);
router.route("/del/:id").delete(deleteBookMark);
router.route("/upd/:id").put(updateBookMark);
export default router;
