const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('./models/User');

async function seedUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const hashedPassword = await bcrypt.hash('123456', 10);
    const user = new User({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword
    });

    await User.deleteMany({ email: 'test@example.com' }); // optional
    await user.save();
    console.log('✅ Test user created successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Error creating test user:', err);
    process.exit(1);
  }
}

seedUser();
