import Product from '../models/productModel.js';

// Add Product
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product', details: error.message });
  }
};

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get One Product by productId
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product', details: error.message });
  }
};

// Update Product by productId
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findOneAndUpdate(
      { productId: req.params.productId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product updated successfully', product: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product', details: error.message });
  }
};

// Delete Product by productId
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findOneAndDelete({ productId: req.params.productId });
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product', details: error.message });
  }
};
