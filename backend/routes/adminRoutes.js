import express from 'express';
import User from '../models/User.js';
import Book from '../models/Book.js';
import Order from '../models/Order.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protect, admin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({});
        const totalBooks = await Book.countDocuments({});
        const orders = await Order.find({});
        
        const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

        res.json({
            users: totalUsers,
            books: totalBooks,
            orders: orders.length,
            revenue: totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
