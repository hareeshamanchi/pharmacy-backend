// routes/emailRoutes.js
const express = require("express");
const router = express.Router();
const { sendInvoice } = require("../controllers/emailController");

router.post("/send-invoice", sendInvoice);

module.exports = router;
