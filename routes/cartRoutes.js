import express from 'express';
import { addToCart, getCartItems, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addToCart);
router.get('/', authMiddleware, getCartItems);
router.delete('/:productId', authMiddleware, removeFromCart);

export default router;
