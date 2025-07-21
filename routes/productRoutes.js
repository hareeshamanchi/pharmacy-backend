import express from 'express';
import multer from 'multer';
import {
  getAllProducts,
  getProductByProductId,
  getProductsGroupedByCategory,
  getProductsByCategoryName,
  searchExactMatchProduct,
  deleteProductById,
  updateProductByProductId // ✅ NEW
} from '../controllers/productController.js';

const router = express.Router();

// Multer for file upload (memory storage or disk storage if needed)
const storage = multer.memoryStorage(); // or use diskStorage if storing on disk
const upload = multer({ storage: storage });

// Search by drug or brand name
router.get('/search', searchExactMatchProduct);

// Products by category name
router.get('/category/:category', getProductsByCategoryName);

// Products grouped by category
router.get('/by-category', getProductsGroupedByCategory);

// Get all products (with optional query param for search)
router.get('/', getAllProducts);

// ✅ Get product by productId (custom)
router.get('/:productId', getProductByProductId);

// ✅ Update product by productId
router.put('/by-product-id/:productId', upload.single('image'), updateProductByProductId);

// ✅ Permanently delete product by _id
router.delete('/:id', deleteProductById);

export default router;
