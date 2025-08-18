import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri || uri.trim() === '') {
  throw new Error('MONGO_URI is missing or empty in .env file');
}

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Connected to DB successfully!');
  } catch (error) {
    console.log('Error connection to DB! ', error.message);
    process.exit(1);
  }
};
