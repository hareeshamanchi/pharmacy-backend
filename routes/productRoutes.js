import express from 'express';
import multer from 'multer';
import {
  getAllProducts,
  getProductByProductId,
  getProductsGroupedByCategory,
  getProductsByCategoryName,
  searchExactMatchProduct,
  deleteProductById,
  updateProductById
} from '../controllers/productController.js';

const router = express.Router();

// ✅ Multer setup using memoryStorage (RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 🔍 Search by drug or brand name
router.get('/search', searchExactMatchProduct);

// 📦 Products by category
router.get('/category/:category', getProductsByCategoryName);

// 📦 Products grouped by category
router.get('/by-category', getProductsGroupedByCategory);

// 📦 All products or search by query
router.get('/', getAllProducts);

// 📦 Get product by productId
router.get('/:productId', getProductByProductId);

// 📝 Update product by MongoDB _id with optional image upload
router.put('/:id', upload.single('image'), updateProductById);

// ❌ Delete product by MongoDB _id
router.delete('/:id', deleteProductById);

export default router;
