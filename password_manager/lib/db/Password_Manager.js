// /lib/db/User.js

import mongoose from 'mongoose';

const Password_ManagerSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  link: { type: String, required: true }
});

const Password_Manager = mongoose.models.Password_Manager || mongoose.model('Password_Manager', Password_ManagerSchema);

export default Password_Manager;
