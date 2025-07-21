// controllers/emailController.js
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const sendInvoice = async (req, res) => {
  try {
    const { to, subject, text, pdfBase64 } = req.body;

    if (!to || !subject || !text || !pdfBase64) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: [to, EMAIL_USER], // send to customer AND seller
      subject,
      text,
      attachments: [
        {
          filename: "invoice.pdf",
          content: Buffer.from(pdfBase64, "base64"),
          contentType: "application/pdf",
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: " + info.response);

    res.status(200).json({ message: "Invoice sent successfully" });
  } catch (error) {
    console.error("❌ Email error:", error);
    res.status(500).json({ message: "Failed to send invoice" });
  }
};

module.exports = { sendInvoice };
