// /lib/db/connection.js

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://Hello_World:uCBbFHrsNtQnJfoN@cluster0.m3wscmw.mongodb.net/";

export async function dbConnect() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
}
