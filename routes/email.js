import express from 'express';
import nodemailer from 'nodemailer';
import multer from 'multer';

const router = express.Router();
const upload = multer();

// ✅ POST route to send invoice to both seller and customer
router.post('/send-invoice', upload.single('file'), async (req, res) => {
  try {
    const { invoiceId, customerEmail } = req.body;
    const file = req.file;

    if (!customerEmail) {
      return res.status(400).json({ error: 'Customer email is required' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'focusgovernment@gmail.com',
        pass: 'fzmb jjrd qxud pqrk' // App Password
      }
    });

    const mailOptions = {
      from: 'focusgovernment@gmail.com',
      to: [`focusgovernment@gmail.com`, customerEmail], // ✅ BOTH seller and customer
      subject: `VaidyaSthana Invoice - ${invoiceId}`,
      text: 'Please find your invoice attached.',
      attachments: [
        {
          filename: file.originalname,
          content: file.buffer
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Email send error:', err);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;
