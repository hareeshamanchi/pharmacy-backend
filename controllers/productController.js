import Product from '../models/productModel.js';
import fs from 'fs';
import path from 'path';

// ✅ Get all products (with optional query param)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products', error: err.message });
  }
};

// ✅ Get product by productId (like "P007")
export const getProductByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({ productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch product', error: err.message });
  }
};

// ✅ Group products by category
export const getProductsGroupedByCategory = async (req, res) => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          products: { $push: '$$ROOT' },
        },
      },
    ]);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Failed to group products', error: err.message });
  }
};

// ✅ Get products by category name
export const getProductsByCategoryName = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch category products', error: err.message });
  }
};

// ✅ Search product by exact match (drugName or brandName)
export const searchExactMatchProduct = async (req, res) => {
  try {
    const { query } = req.query;

    const product = await Product.findOne({
      $or: [
        { drugName: { $regex: `^${query}$`, $options: 'i' } },
        { brandName: { $regex: `^${query}$`, $options: 'i' } },
      ],
    });

    if (!product) {
      return res.status(404).json({ message: 'No matching product found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Failed to search product', error: err.message });
  }
};

// ✅ Delete product by MongoDB _id
export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Product not found to delete' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err.message });
  }
};

// ✅ Update product by MongoDB _id (with image support)
export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    // ✅ Handle uploaded image if present
    if (req.file) {
      // Option 1: Save base64 string to DB (recommended if no static server)
      const base64Image = req.file.buffer.toString('base64');
      updatedFields.image = `data:${req.file.mimetype};base64,${base64Image}`;

      // Option 2: Save to local folder
      // const filePath = path.join('uploads', `${Date.now()}-${req.file.originalname}`);
      // fs.writeFileSync(filePath, req.file.buffer);
      // updatedFields.image = filePath;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found for update' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product: ' + error.message });
  }
};
