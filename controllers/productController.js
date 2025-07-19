import Product from '../models/productModel.js';

// Get all products (with optional search by drugName or brandName)
export const getAllProducts = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};
    if (search) {
      query = {
        $or: [
          { drugName: { $regex: search, $options: 'i' } },
          { brandName: { $regex: search, $options: 'i' } }
        ]
      };
    }

    const products = await Product.find(query);
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

// Group products by category
export const getProductsGroupedByCategory = async (req, res) => {
  try {
    const products = await Product.find({});
    const grouped = products.reduce((acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    }, {});
    res.json(grouped);
  } catch (error) {
    res.status(500).json({ message: 'Failed to group products by category: ' + error.message });
  }
};

// Get products by category name
export const getProductsByCategoryName = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({
      category: { $regex: new RegExp(category, 'i') }
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category products: ' + error.message });
  }
};

// Search product by drugName or brandName — for autosuggestions or redirect
export const searchExactMatchProduct = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ error: 'Search query missing' });

    const regex = new RegExp(query, 'i');
    const results = await Product.find({
      $or: [
        { drugName: { $regex: regex } },
        { brandName: { $regex: regex } }
      ]
    });

    if (results.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(results);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Server error while searching' });
  }
};

// ✅ Permanently delete product by _id
export const deleteProductById = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product: ' + error.message });
  }
};
