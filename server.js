// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import all your routes
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

import emailRoutes from './routes/email.js';
import adminRoutes from './routes/adminRoutes.js';
import adminLoginRoutes from './routes/adminLoginRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();

// CORS and JSON middleware
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://pharmacy-frontend-xiei.onrender.com' // ✅ Render frontend link
  ],
  credentials: true,
}));

// Static Files (e.g. images)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/images', express.static(path.join(__dirname, 'images')));

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.use('/api', emailRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/login', adminLoginRoutes);
app.use('/api/contact', contactRoutes);

// Default route to verify backend is running
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'pharmacyDB',
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`✅ Connected to DB: ${mongoose.connection.name}`);
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});
