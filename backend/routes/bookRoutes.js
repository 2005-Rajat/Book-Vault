import express from 'express';
const router = express.Router();
import { getBooks, getBookById, createBook, updateBook, deleteBook, readBook } from '../controllers/bookController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getBooks).post(protect, admin, createBook);
router.route('/:id').get(getBookById).put(protect, admin, updateBook).delete(protect, admin, deleteBook);
router.route('/:id/read').get(protect, readBook);
router.route('/:id/sample').get(readBook);

export default router;
