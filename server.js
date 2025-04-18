import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import authRoutes from './routes/authRoutes.js'; // ✅ ADDED for login/signup

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for frontend on localhost:3000
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static images from /images folder
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/auth', authRoutes); // ✅ CONNECT AUTH ROUTES

// MongoDB Connection & Server Start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
      console.log('✅ MongoDB Connected');
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });
