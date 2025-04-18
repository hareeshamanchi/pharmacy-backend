import express from 'express';
import {
  getAllProducts,
  getProductByProductId,
} from '../controllers/productController.js';

const router = express.Router();

// GET all products
router.get('/', getAllProducts);

// GET a product by productId
router.get('/:productId', getProductByProductId);

export default router;
