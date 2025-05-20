// queues/runAgentQueue.js
import { Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL);   // e.g. redis://localhost:6379

export const runAgentQueue = new Queue("run-agent", { connection });
