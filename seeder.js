import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/productModel.js';
import products from './data/products.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log('Data Imported!');
  process.exit();
};

importData();
