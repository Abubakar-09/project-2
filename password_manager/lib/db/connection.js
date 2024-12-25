// /lib/db/connection.js

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

export async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
}
