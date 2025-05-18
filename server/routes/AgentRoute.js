// Agent Routes
import express from 'express';
import { getAllAgents, getAgentById } from '../controllers/agentController.js';

const agentRouter = express.Router();

// Get All Agents
agentRouter.get('/all', getAllAgents);

// Get Agent Data By Id
agentRouter.get('/:id', getAgentById);

export default agentRouter;