import express from 'express';
import { addUserRating, getUserData, purchaseAgentRun, userPurchasedAgents, addToWorkspace, removeFromWorkspace, runAgent } from '../controllers/userController.js';
import { protectCreator } from '../middlewares/authMiddleware.js';
const userRouter = express.Router();

// Get User Data
userRouter.get('/data', getUserData);

// Purchase Agent Run
userRouter.post('/purchase', purchaseAgentRun);

// Run Agent
userRouter.post('/run-agent', runAgent);

// Get Executed Agents
userRouter.get("/my-agents",   userPurchasedAgents);

// Add Agent to Workspace
userRouter.post('/add-to-workspace', addToWorkspace);

// Remove Agent from Workspace
userRouter.post('/remove-from-workspace', removeFromWorkspace);

// Add Agent Rating
userRouter.post('/add-rating', addUserRating);

export default userRouter;
