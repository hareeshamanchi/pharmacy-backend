// seedUser.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

async function seedUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = 'test@example.com';
    const plainPassword = '123456';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    await User.deleteMany({ email }); // Optional: clear existing test user

    const user = new User({
      name: 'Test User',
      email,
      password: hashedPassword
    });

    await user.save();
    console.log(`✅ Test user "${email}" created successfully!`);
    process.exit();
  } catch (err) {
    console.error('❌ Error creating test user:', err);
    process.exit(1);
  }
}

seedUser();
