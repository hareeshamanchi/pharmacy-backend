import Product from '../models/productModel.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// Get product by productId
export const getProductByProductId = async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};
