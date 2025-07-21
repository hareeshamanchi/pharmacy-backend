// routes/emailRoutes.js
import express from 'express'; // Use ES Module import for express
import { sendInvoice } from '../controllers/emailController.js'; // ✅ Use ES Module import for controller and add .js extension

const router = express.Router();

router.post("/send-invoice", sendInvoice);

export default router; // ✅ Export using 'export default'