import Agent from "../models/Agent.js";
import { AgentRun } from "../models/AgentRun.js";

import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
import stripe from "stripe";

// Get User Data
export const getUserData = async (req, res) => {
  try {
    if (!req.auth || !req.auth.userId) {
      return res.json({ success: false, message: "Unauthorizedd" });
    }
    const userId = req.auth.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Purchase Agent Run
export const purchaseAgentRun = async (req, res) => {
  try {
    const { agentId } = req.body;
    const { origin } = req.headers;
    const userId = req.auth.userId;

    const agentData = await Agent.findById(agentId);
    const userData = await User.findById(userId);

    if (!userData || !agentData) {
      return res.json({ success: false, message: "Data Not Found" });
    }

    const purchaseData = {
      agentId: agentData._id,
      userId,
      amount: parseFloat(agentData.pricePerRun).toFixed(2),
    };

    const newPurchase = await Purchase.create(purchaseData);

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const currency = process.env.CURRENCY.toLowerCase();

    const line_items = [
      {
        price_data: {
          currency,
          product_data: {
            name: agentData.agentName,
          },
          unit_amount: Math.floor(newPurchase.amount * 100),
        },
        quantity: 1,
      },
    ];

    const session = await stripeInstance.checkout.sessions.create({
      success_url: `${origin}/dashboard/runs`,
      cancel_url: `${origin}/`,
      line_items: line_items,
      mode: "payment",
      metadata: {
        purchaseId: newPurchase._id.toString(),
      },
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get User Executed Agents
export const userPurchasedAgents = async (req, res) => {
  try {
    if (!req.auth?.userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const userId = req.auth.userId;

    // 1) fetch all completed purchases for this user
    const purchases = await Purchase
      .find({ userId, status: "completed" })
      .sort({ createdAt: -1 })          // newest first
      .populate("agentId", "-__v");     // populate Agent doc, drop __v

    // 2) keep just the unique agent documents
    const seen = new Set();
    const agents = [];
    purchases.forEach(p => {
      if (p.agentId && !seen.has(String(p.agentId._id))) {
        seen.add(String(p.agentId._id));
        agents.push(p.agentId);
      }
    });

    return res.json({
      success: true,
      agents,
      message:
        agents.length === 0
          ? "You haven't purchased any agents yet."
          : "Purchased agents retrieved successfully."
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// Add Rating to Agent
export const addUserRating = async (req, res) => {
  const userId = req.auth.userId;
  const { agentId, rating } = req.body;

  if (!agentId || !userId || !rating || rating < 1 || rating > 5) {
    return res.json({ success: false, message: "Invalid Details" });
  }

  try {
    const agent = await Agent.findById(agentId);
    if (!agent) {
      return res.json({ success: false, message: "Agent not found." });
    }

    const user = await User.findById(userId);
    const pastRuns = await AgentRun.findOne({ agentId, userId });

    if (!user || !pastRuns) {
      return res.json({ success: false, message: "You must use the agent before rating it." });
    }

    const existingRatingIndex = agent.ratings.findIndex((r) => r.userId === userId);

    if (existingRatingIndex > -1) {
      agent.ratings[existingRatingIndex].rating = rating;
    } else {
      agent.ratings.push({ userId, rating });
    }

    await agent.save();
    return res.json({ success: true, message: "Rating added" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
