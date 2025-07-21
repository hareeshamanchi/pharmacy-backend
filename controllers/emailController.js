// controllers/emailController.js
import nodemailer from "nodemailer"; // ✅ Use ES Module import

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// ✅ Export using 'export const' for named ES Module export
export const sendInvoice = async (req, res) => {
  try {
    // When using multer, text fields are in req.body, and the file is in req.file
    const { customerEmail, invoiceId } = req.body;
    const pdfFile = req.file; // ✅ The uploaded PDF file (Buffer) from Multer

    // Validate if necessary data and the PDF file are present
    if (!customerEmail || !invoiceId || !pdfFile) {
      return res.status(400).json({ message: "Missing customer email, invoice ID, or PDF file." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS, // This MUST be a Gmail App Password if 2FA is enabled
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: [customerEmail, EMAIL_USER], // Send to customer AND your pharmacy email
      subject: `Invoice for Order ID: ${invoiceId} from VaidyaSthana Pharmacy`,
      text: `Dear Customer,\n\nPlease find attached your invoice for Order ID: ${invoiceId} from VaidyaSthana Pharmacy. Thank you for your purchase!\n\nRegards,\nVaidyaSthana Pharmacy`,
      attachments: [
        {
          filename: `invoice_${invoiceId}.pdf`, // Use a dynamic filename for the attachment
          content: pdfFile.buffer, // ✅ Attach the PDF content directly from Multer's buffer
          contentType: 'application/pdf', // Specify the content type
        },
      ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Invoice email sent: " + info.response);

    res.status(200).json({ message: "Invoice email sent successfully" });
  } catch (error) {
    console.error("❌ Failed to send invoice email:", error);
    // Enhanced error logging for Render debugging
    if (error.response) {
      console.error("Nodemailer response error details:", error.response);
    } else if (error.code === 'EENVELOPE') {
      console.error("Email envelope error (invalid recipient/sender format):", error);
    } else if (error.code === 'EAUTH') {
      console.error("Authentication error (check EMAIL_USER/EMAIL_PASS/App Password):", error);
    }
    res.status(500).json({ message: "Failed to send invoice" });
  }
};