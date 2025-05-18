import express from 'express';
import { addUserRating, getUserData, purchaseAgentRun, userExecutedAgents } from '../controllers/userController.js';

const userRouter = express.Router();

// Get User Data
userRouter.get('/data', getUserData);

// Purchase Agent Run
userRouter.post('/purchase', purchaseAgentRun);

// Get Executed Agents
userRouter.get('/executed-agents', userExecutedAgents);

// Add Agent Rating
userRouter.post('/add-rating', addUserRating);

export default userRouter;
