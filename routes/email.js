// routes/email.js
import express from 'express';
import multer from 'multer';
import nodemailer from 'nodemailer';

const router = express.Router();

// Set up multer memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/send-email', upload.single('pdf'), async (req, res) => {
  try {
    const { customerEmail } = req.body;
    const file = req.file;

    // 🛑 Check if PDF file is included
    if (!file) {
      return res.status(400).json({ success: false, message: 'PDF file is missing' });
    }

    // ✅ Use environment variables set in Render dashboard
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // 'focusgovernment@gmail.com'
        pass: process.env.EMAIL_PASS, // App password from Render env
      },
    });

    // ✅ Prepare mail
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [customerEmail, process.env.EMAIL_USER], // Send to both buyer & seller
      subject: '🧾 Pharmacy Invoice for Your Order',
      text: 'Please find the attached invoice for your medicine order.',
      attachments: [
        {
          filename: file.originalname || 'invoice.pdf',
          content: file.buffer,
          contentType: 'application/pdf',
        },
      ],
    };

    // ✅ Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);

    res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('❌ Email send error:', error);
    res.status(500).json({ success: false, message: 'Email failed to send' });
  }
});

export default router;
