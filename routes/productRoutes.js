import express from 'express';
import multer from 'multer';
import {
  getAllProducts,
  getProductByProductId,
  getProductsGroupedByCategory,
  getProductsByCategoryName,
  searchExactMatchProduct,
  deleteProductById,
  updateProductByProductId // ✅ make sure this is named correctly
} from '../controllers/productController.js';

const router = express.Router();

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/search', searchExactMatchProduct);
router.get('/category/:category', getProductsByCategoryName);
router.get('/by-category', getProductsGroupedByCategory);
router.get('/', getAllProducts);
router.get('/:productId', getProductByProductId);

// ✅ new route using productId (custom)
router.put('/by-product-id/:productId', upload.single('image'), updateProductByProductId);

// ✅ delete by MongoDB _id
router.delete('/:id', deleteProductById);

export default router;
