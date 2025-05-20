// workers/runAgentWorker.js
import "dotenv/config";
import { Worker } from "bullmq";
import IORedis from "ioredis";
import { Purchase } from "../models/Purchase.js";
import { AgentRun } from "../models/AgentRun.js";
import Agent from "../models/Agent.js";

/* ----------- create Redis connection with required option -------- */
const redisUrl = process.env.REDIS_URL || "redis://127.0.0.1:6379";
const connection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,   //  ⬅️ BullMQ requirement
});

/* ----------------------------- worker ---------------------------- */
const worker = new Worker(
  "run-agent",
  async (job) => {
    const { purchaseId, input, userId } = job.data;

    const purchase = await Purchase.findOne({
      _id: purchaseId,
      userId,
      status: "completed",
      used: false,
    }).populate("agentId");

    if (!purchase) throw new Error("Invalid or already used purchase");

    const agent  = purchase.agentId;
    const result = `Agent "${agent.agentName}" processed: ${input}`;

    purchase.used = true;
    await purchase.save();

    await AgentRun.create({
      agentId  : agent._id,
      userId,
      modelType: agent.modelType,
      runDate  : new Date(),
      status   : "completed",
      agentName: agent.agentName,
      output   : result,
    });

    return { result };
  },
  { connection, concurrency: 3 }
);

/* ----------------------- logging helpers ------------------------ */
worker.on("completed", (job) =>
  console.log(`✅ Job ${job.id} completed`)
);

worker.on("failed", (job, err) =>
  console.error(`❌ Job ${job?.id} failed:`, err)
);
