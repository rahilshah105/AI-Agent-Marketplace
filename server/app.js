// app.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import { clerkMiddleware } from '@clerk/express';
import { clerkWebhooks, stripeWebhooks } from './controllers/webhooks.js';
import creatorRouter from './routes/CreatorRoutes.js';
import agentRouter from './routes/agentRoutes.js';

const app = express();
await connectDB();
await connectCloudinary();

// CORS + preflight
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', (_req, res) => res.sendStatus(200));

// Webhooks before auth
app.post('/clerk',  express.json(),                          clerkWebhooks);
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

// Auth
app.use(clerkMiddleware());

// Routes
app.get('/', (req, res) => res.send('API Working'));
app.use('/api/creator', express.json(), creatorRouter);
app.use('/api/agent',   express.json(), agentRouter);
app.use('/api/user',    express.json(), userRouter);

// **DO NOT** call app.listen() here!
export default app;
