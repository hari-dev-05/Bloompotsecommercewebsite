import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/db.js';
import { seedDatabase } from './utils/seeder.js';
import apiRouter from './routes/api.js';

// Resolve directory name in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables using relative path resolution
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connect to MongoDB database
await connectDB();

// Automatically seed database with default products if empty
await seedDatabase();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api', apiRouter);

// Healthcheck Route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Bloompots API is running' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in development mode on port ${PORT}`);
});
