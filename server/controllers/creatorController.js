import { v2 as cloudinary } from 'cloudinary'
import Course from '../models/Agent.js';
import { Purchase } from '../models/Purchase.js';
import User from '../models/User.js';
import { clerkClient } from '@clerk/express'

// Update role to agent creator
export const updateRoleToCreator = async (req, res) => {
  try {
    const userId = req.auth.userId;
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: 'creator' },
    });
    res.json({ success: true, message: 'You can now publish agents' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add new AI agent
export const addAgent = async (req, res) => {
  try {
    const { agentData } = req.body;
    const imageFile = req.file;
    const creatorId = req.auth.userId;

    if (!imageFile) {
      return res.json({ success: false, message: 'Thumbnail not attached' });
    }

    const parsedAgentData = JSON.parse(agentData);
    parsedAgentData.creator = creatorId;

    const newAgent = await Agent.create(parsedAgentData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newAgent.agentThumbnail = imageUpload.secure_url;

    await newAgent.save();
    res.json({ success: true, message: 'Agent added' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// Get creator dashboard data
export const creatorDashboardData = async (req, res) => {
  try {
    const creator = req.auth.userId;
    const agents = await Agent.find({ creator });
    const totalAgents = agents.length;
    const agentIds = agents.map(agent => agent._id);

    const purchases = await Purchase.find({ agentId: { $in: agentIds }, status: 'completed' });
    const totalEarnings = purchases.reduce((sum, p) => sum + p.amount, 0);

    const executionData = [];
    for (const agent of agents) {
      const runs = await AgentRun.find({ agentId: agent._id }).populate('userId', 'name imageUrl');
      runs.forEach(run => {
        executionData.push({
          agentName: agent.agentName,
          user: run.userId,
          runDate: run.createdAt
        });
      });
    }

    res.json({
      success: true,
      dashboardData: {
        totalEarnings,
        executionData,
        totalAgents
      }
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const purchaseAgentRun = async (req, res) => {
  try {
    const { agentId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;

    const agent = await Agent.findById(agentId);
    const user = await User.findById(userId);

    if (!user || !agent) return res.json({ success: false, message: 'Data not found' });

    const amount = parseFloat(agent.pricePerRun).toFixed(2);
    const newPurchase = await Purchase.create({ agentId, userId, amount });

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY.toLowerCase();

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/dashboard/runs`,
      cancel_url: `${origin}/`,
      line_items: [{
        price_data: {
          currency,
          product_data: { name: agent.agentName },
          unit_amount: Math.floor(amount * 100)
        },
        quantity: 1
      }],
      mode: 'payment',
      metadata: { purchaseId: newPurchase._id.toString() }
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

