// controllers/emailController.js
import nodemailer from "nodemailer"; // Use ES Module import
// const fs = require("fs"); // Not needed for current logic
// const path = require("path"); // Not needed for current logic

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Use 'export const' for a named ES Module export
export const sendInvoice = async (req, res) => {
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
      to: [to, EMAIL_USER],
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
    if (error.response) {
      console.error("Nodemailer response error details:", error.response);
    } else if (error.code === 'EENVELOPE') {
      console.error("Email envelope error (e.g., invalid recipient/sender format):", error);
    } else if (error.code === 'EAUTH') {
      console.error("Authentication error (check EMAIL_USER/EMAIL_PASS/App Password):", error);
    }
    res.status(500).json({ message: "Failed to send invoice" });
  }
};