// routes/emailRoutes.js
const express = require("express");
const router = express.Router();
const { sendInvoice } = require("../controllers/emailController"); // ✅ Import the controller function

// Define the POST route for sending an invoice
// When a POST request comes to /api/send-invoice, it will execute sendInvoice function
router.post("/send-invoice", sendInvoice);

module.exports = router; // Export the router