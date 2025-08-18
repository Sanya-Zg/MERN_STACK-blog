import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './db/connectDB.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

// Connecting to DB and create server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log(`Server listening on port 3000`);
    });
  } catch (error) {
    console.log('Could not connect to the DB: ', error.message);
    process.exit(1);
  }
};
startServer();
