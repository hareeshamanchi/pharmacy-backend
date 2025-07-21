import express from 'express';
import multer from 'multer';
import {
  getAllProducts,
  getProductByProductId,
  getProductsGroupedByCategory,
  getProductsByCategoryName,
  searchExactMatchProduct,
  deleteProductById,
  updateProductById // ✅ newly added
} from '../controllers/productController.js';

const router = express.Router();

// Multer for file upload (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Search by drug or brand name
router.get('/search', searchExactMatchProduct);

// Products by category name
router.get('/category/:category', getProductsByCategoryName);

// Products grouped by category
router.get('/by-category', getProductsGroupedByCategory);

// Get all products (with optional query param for search)
router.get('/', getAllProducts);

// Get specific product by productId
router.get('/:productId', getProductByProductId);

// ✅ Update product with optional image upload
router.put('/:id', upload.single('image'), updateProductById);

// ✅ Permanently delete product by _id
router.delete('/:id', deleteProductById);

export default router;
