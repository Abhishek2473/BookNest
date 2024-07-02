import express from 'express';
import { createBook, getBooks, getBookById, updateBookById, deleteBookById, addReview } from '../controllers/book.controller.js';
import upload from "../middleware/upload.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', upload.single('image'), createBook);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBookById);
router.delete('/:id', deleteBookById);

// Review routes
router.post('/:id/reviews',verifyToken, addReview);

export default router;




