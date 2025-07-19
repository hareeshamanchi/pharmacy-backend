// routes/contactRoutes.js
import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post('/send-message', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Setup the nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,  // Using the email from the .env file
        pass: process.env.EMAIL_PASS,  // Using the app password from the .env file
      },
    });

    // Mail options including subject and body
    const mailOptions = {
      from: email,                      // Sender's email address
      to: 'focusgovernment@gmail.com',   // Recipient's email address
      subject: `Message from ${name}`,   // Subject of the email
      text: `Message from: ${name}\n\nEmail: ${email}\n\nMessage: ${message}`, // Email body
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('❌ Error sending message:', err);
    res.status(500).json({ success: false, error: 'Failed to send message' });
  }
});

export default router;
