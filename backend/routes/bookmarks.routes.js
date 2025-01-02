import express from 'express';
import createBookMark from '../controllers/booksmarks.controllers.js'
const router=express.Router();
router.route('/').get(createBookMark);
export default router;