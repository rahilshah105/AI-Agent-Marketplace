import express from 'express';
import { addUserRating, getUserData, purchaseAgentRun, userPurchasedAgents } from '../controllers/userController.js';
import { protectCreator } from '../middlewares/authMiddleware.js';
const userRouter = express.Router();

// Get User Data
userRouter.get('/data', getUserData);

// Purchase Agent Run
userRouter.post('/purchase', purchaseAgentRun);

// Get Executed Agents
userRouter.get("/my-agents",   userPurchasedAgents); 

// Add Agent Rating
userRouter.post('/add-rating', addUserRating);

export default userRouter;
