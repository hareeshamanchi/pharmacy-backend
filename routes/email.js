// routes/email.js
import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

const EMAIL_USER = process.env.EMAIL_USER || 'focusgovernment@gmail.com';
const EMAIL_PASS = process.env.EMAIL_PASS;

// ✅ POST /api/send-invoice
router.post('/send-invoice', async (req, res) => {
  try {
    const { to, subject, text, pdfBase64 } = req.body;

    if (!to || !subject || !text || !pdfBase64) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: [to, EMAIL_USER], // 👈 Send to both customer and your inbox
      subject,
      text,
      attachments: [
        {
          filename: 'invoice.pdf',
          content: Buffer.from(pdfBase64, 'base64'),
          contentType: 'application/pdf',
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);

    res.status(200).json({ message: 'Invoice email sent successfully' });
  } catch (err) {
    console.error('❌ Failed to send invoice email:', err);
    res.status(500).json({ message: 'Failed to send invoice' });
  }
});

export default router;
