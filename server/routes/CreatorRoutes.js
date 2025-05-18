import express from 'express';
import { addAgent, creatorDashboardData, getCreatorAgents, getAgentRunHistory, updateRoleToCreator } from '../controllers/creatorController.js';
import upload from '../configs/multer.js';
import { protectCreator } from '../middlewares/authMiddleware.js';

const creatorRouter = express.Router();

// Add Creator Role 
creatorRouter.get('/update-role', updateRoleToCreator);

// Add Agents 
creatorRouter.post('/add-agent', upload.single('image'), protectCreator, addAgent);

// Get Creator's Agents 
creatorRouter.get('/agents', protectCreator, getCreatorAgents);

// Get Dashboard Data
creatorRouter.get('/dashboard', protectCreator, creatorDashboardData);

// Get Run History
creatorRouter.get('/runs', protectCreator, getAgentRunHistory);

export default creatorRouter;