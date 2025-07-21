// controllers/emailController.js
const nodemailer = require("nodemailer");
const fs = require("fs"); // Although not used in the current logic, kept for context
const path = require("path"); // Although not used in the current logic, kept for context

const EMAIL_USER = process.env.EMAIL_USER; // Your Gmail address from Render environment variables
const EMAIL_PASS = process.env.EMAIL_PASS; // Your Gmail App Password from Render environment variables

const sendInvoice = async (req, res) => {
  try {
    const { to, subject, text, pdfBase64 } = req.body;

    // Basic validation for required fields
    if (!to || !subject || !text || !pdfBase64) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // Using Gmail SMTP service
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Define email options
    const mailOptions = {
      from: EMAIL_USER, // Sender's email address
      to: [to, EMAIL_USER], // Send to the customer AND your own (seller's) inbox
      subject,
      text,
      attachments: [
        {
          filename: "invoice.pdf", // Name of the attached file
          content: Buffer.from(pdfBase64, "base64"), // Convert Base64 string back to Buffer
          contentType: "application/pdf", // Specify content type
        },
      ],
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: " + info.response); // Log successful email response

    res.status(200).json({ message: "Invoice sent successfully" });
  } catch (error) {
    console.error("❌ Email error:", error); // Log the primary error
    // Provide more detailed error logging for debugging on Render
    if (error.response) {
      console.error("Nodemailer response error details:", error.response);
    } else if (error.code === 'EENVELOPE') {
      console.error("Email envelope error (e.g., invalid recipient/sender format):", error);
    } else if (error.code === 'EAUTH') {
      console.error("Authentication error (check EMAIL_USER/EMAIL_PASS/App Password):", error);
    }
    res.status(500).json({ message: "Failed to send invoice" }); // Send generic error response
  }
};

module.exports = { sendInvoice }; // Export the function for use in routesw