import Agent from "../models/Agent.js";
import AgentRun from "../models/AgentRun.js";
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";
import stripe from "stripe";
import { Webhook } from "svix";

// Get User Data
export const getUserData = async (req, res) => {
  try {
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
export const userExecutedAgents = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const agentRuns = await AgentRun.find({ userId }).populate("agentId");
    res.json({ success: true, agentRuns });
  } catch (error) {
    res.json({ success: false, message: error.message });
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

// Clerk Webhook
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
          resume: "",
        };
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          imageUrl: data.image_url,
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Stripe Webhook
export const stripeWebhooks = async (request, response) => {
  const sig = request.headers["stripe-signature"];
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { purchaseId } = session.data[0].metadata;
      const purchaseData = await Purchase.findById(purchaseId);
      purchaseData.status = "completed";
      await purchaseData.save();
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const paymentIntentId = paymentIntent.id;

      const session = await stripeInstance.checkout.sessions.list({
        payment_intent: paymentIntentId,
      });

      const { purchaseId } = session.data[0].metadata;
      const purchaseData = await Purchase.findById(purchaseId);
      purchaseData.status = "failed";
      await purchaseData.save();
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  response.json({ received: true });
};
