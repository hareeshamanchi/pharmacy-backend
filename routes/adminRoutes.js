import express from 'express';
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/adminController.js';

const router = express.Router();

// Admin Product Routes
router.post('/products', addProduct);                         // POST   /api/admin/products
router.get('/products', getAllProducts);                      // GET    /api/admin/products
router.get('/products/:productId', getProductById);           // GET    /api/admin/products/P001
router.put('/products/:productId', updateProduct);            // PUT    /api/admin/products/P001
router.delete('/products/:productId', deleteProduct);         // DELETE /api/admin/products/P001

export default router;
