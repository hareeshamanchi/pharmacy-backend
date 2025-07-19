// seeder.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import products from './data/products.js';

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Product.deleteMany(); // Clear existing data
    await Product.insertMany(products); // Insert new products
    console.log('✅ Products seeded successfully');
    process.exit();
  })
  .catch((err) => {
    console.error('❌ Seeder failed:', err.message);
    process.exit(1);
  });
