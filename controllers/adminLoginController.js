// controllers/adminLoginController.js
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';  // 🔁 changed from 'bcrypt' to 'bcryptjs'
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'default_secret',
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      email: admin.email,
      token
    });
  } catch (err) {
    console.error('❌ Admin login error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};
