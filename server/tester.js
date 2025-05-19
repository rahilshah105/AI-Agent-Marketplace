import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Agent from './models/Agent.js'; // ✅ Update path if needed

dotenv.config(); // Load .env variables

(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/agent-web`);
    console.log("✅ MongoDB connected");

    const agents = [
      {
        agentName: "Market Trend Analyzer",
        agentDescription: "Analyzes recent market trends using OpenAI and suggests investment strategies.",
        agentThumbnail: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d4?auto=format&fit=crop&w=800&q=80",
        pricePerRun: 2.99,
        isPublished: true,
        creator: "user_2xI5r5NoX42ZG4tjr7O3jywIMH5",
        modelType: "openai",
        promptTemplate: "Analyze current market trends and recommend 3 sectors to invest in.",
        inputSchema: { query: "string" },
        ratings: []
      },
      {
        agentName: "Product Review Summarizer",
        agentDescription: "Summarizes customer reviews using Hugging Face sentiment models.",
        agentThumbnail: "https://images.unsplash.com/photo-1581291519195-ef11498d1cf5?auto=format&fit=crop&w=800&q=80",
        pricePerRun: 1.49,
        isPublished: true,
        creator: "user_2xI5r5NoX42ZG4tjr7O3jywIMH5",
        modelType: "huggingface",
        promptTemplate: "Summarize the sentiment of these product reviews.",
        inputSchema: { reviews: "array" },
        ratings: []
      },
      {
        agentName: "CRM Lead Webhook Bot",
        agentDescription: "Sends qualified leads to your CRM via webhook after filtering by engagement score.",
        agentThumbnail: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
        pricePerRun: 0.99,
        isPublished: true,
        creator: "user_2xI5r5NoX42ZG4tjr7O3jywIMH5",
        modelType: "webhook",
        promptTemplate: "",
        inputSchema: { leads: "array", webhookUrl: "string" },
        ratings: []
      }
    ];

    await Agent.insertMany(agents);
    console.log("✅ Agents inserted.");

    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected.");
  } catch (error) {
    console.error("❌ Error seeding agents:", error.message);
    process.exit(1);
  }
})();
