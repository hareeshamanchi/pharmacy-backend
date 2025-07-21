import Product from '../models/productModel.js';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

// ✅ Cloudinary Config (optional: move to config file)
cloudinary.v2.config({
  cloud_name: 'YOUR_CLOUD_NAME',
  api_key: 'YOUR_API_KEY',
  api_secret: 'YOUR_SECRET'
});

// Get all products (with optional search query)
export const getAllProducts = async (req, res) => {
  try {
    const { keyword } = req.query;
    const query = keyword
      ? {
          $or: [
            { drugName: { $regex: keyword, $options: 'i' } },
            { brandName: { $regex: keyword, $options: 'i' } }
          ]
        }
      : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Get product by productId (custom ID, not MongoDB _id)
export const getProductByProductId = async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
};

// Search product by exact match
export const searchExactMatchProduct = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: 'Missing query param' });

    const product = await Product.findOne({
      $or: [
        { drugName: query },
        { brandName: query }
      ]
    });

    if (!product) return res.status(404).json({ message: 'No exact match found' });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error searching product' });
  }
};

// Get products grouped by category
export const getProductsGroupedByCategory = async (req, res) => {
  try {
    const products = await Product.find({});
    const grouped = {};

    products.forEach(p => {
      if (!grouped[p.category]) grouped[p.category] = [];
      grouped[p.category].push(p);
    });

    res.json(grouped);
  } catch (error) {
    res.status(500).json({ message: 'Error grouping products' });
  }
};

// Get products by category name
export const getProductsByCategoryName = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category products' });
  }
};

// Delete product by MongoDB _id
export const deleteProductById = async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

// ✅ NEW: Update product by productId (with optional image)
export const updateProductByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateFields = req.body;

    if (req.file) {
      const buffer = req.file.buffer;
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.v2.uploader.upload_stream((error, result) => {
            if (result) resolve(result);
            else reject(error);
          });
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };

      const result = await streamUpload(buffer);
      updateFields.image = result.secure_url;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      { $set: updateFields },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};
