// routes/emailRoutes.js
import express from 'express';
import multer from 'multer'; // ✅ Import multer
import { sendInvoice } from '../controllers/emailController.js'; // ✅ Use ES Module import for named export

const router = express.Router();

// Configure multer to store the uploaded file in memory.
// This is suitable for small files like PDFs.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the POST route for sending an invoice.
// 'upload.single('file')' means it expects a single file upload
// with the field name 'file' (which matches your frontend's form.append('file', ...)).
router.post("/send-invoice", upload.single('file'), sendInvoice); // ✅ Add multer middleware

// ✅ Export the router as the default export for server.js to import
export default router;