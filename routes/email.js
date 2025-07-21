// routes/email.js
import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/send-email', upload.single('pdf'), async (req, res) => {
  try {
    const { customerEmail } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: 'PDF file not found in request' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'focusgovernment@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD, // Use environment variable
      },
    });

    const mailOptions = {
      from: 'focusgovernment@gmail.com',
      to: [customerEmail, 'focusgovernment@gmail.com'], // Send to both
      subject: '🧾 Your Medicine Order Invoice',
      text: 'Attached is the invoice for your recent pharmacy order.',
      attachments: [
        {
          filename: file.originalname || 'invoice.pdf',
          content: file.buffer,
          contentType: 'application/pdf',
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent:', info.response);
    res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('❌ Email send error:', error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

export default router;
