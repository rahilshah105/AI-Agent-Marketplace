import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
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
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  used: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const Purchase = mongoose.model('Purchase', purchaseSchema);
