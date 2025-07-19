// seedAdmin.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'; // ✅ changed from 'bcrypt' to 'bcryptjs'
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  const email = 'hareeshamanchi@gmail.com'; // ✅ Your desired admin email
  const plainPassword = 'Haareesh@123';      // ✅ Your desired password

  await mongoose.connect(process.env.MONGO_URI);

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    console.log('❌ Admin already exists');
    mongoose.disconnect();
    return;
  }

  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await Admin.create({
    email,
    password: hashedPassword,
  });

  console.log(`✅ Admin ${email} seeded with password ${plainPassword}`);
  mongoose.disconnect();
};

createAdmin();
