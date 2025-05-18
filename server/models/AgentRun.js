import mongoose from 'mongoose';

const agentRunSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true
  },
  userId: {
    type: String,
    ref: 'User',
    required: true
  },
  input: { type: Object },
  output: { type: Object },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  executionTime: { type: Number },
  error: { type: String }
}, { timestamps: true });

export const AgentRun = mongoose.model('AgentRun', agentRunSchema);
