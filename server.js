// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

// Import all your route files
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';

// ✅ CORRECTED: Import from routes/emailRoutes.js.
// Make sure you have DELETED the redundant 'routes/email.js' file.
import emailRoutes from './routes/emailRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import adminLoginRoutes from './routes/adminLoginRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Load environment variables from .env file (for local development)
dotenv.config();

const app = express();

// Middleware: Parse JSON request bodies
app.use(express.json());

// Middleware: Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: [
    'http://localhost:3000', // Your frontend's local development URL
    'https://pharmacy-frontend-xiei.onrender.com' // ✅ Your deployed Render frontend URL
  ],
  credentials: true, // Allows cookies, authorization headers, etc.
}));

// Serve static files from the 'images' directory
const __filename = fileURLToTypeOf(import.meta.url); // Gets the current file's path
const __dirname = path.dirname(__filename); // Gets the current directory's path
app.use('/images', express.static(path.join(__dirname, 'images')));

// API Routes setup
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// ✅ Mount the email routes under '/api' base path
app.use('/api', emailRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/login', adminLoginRoutes);
app.use('/api/contact', contactRoutes);

// Default route to confirm backend is running
app.get('/', (req, res) => {
  res.send('✅ Backend is running!');
});

// MongoDB Connection
const PORT = process.env.PORT || 5000; // Use port from environment variable or default to 5000

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, // Deprecated but often included for compatibility
  useUnifiedTopology: true, // Use the new server discovery and monitoring engine
  dbName: 'pharmacyDB', // Specify your database name
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
  console.log(`✅ Connected to DB: ${mongoose.connection.name}`);
  // Start the server only after successful database connection
  app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});