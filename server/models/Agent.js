import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  agentName: { type: String, required: true },
  agentDescription: { type: String, required: true },
  agentThumbnail: { type: String },
  pricePerRun: { type: Number, required: true },
  isPublished: { type: Boolean, default: true },
  creator: {
    type: String,
    ref: 'User',
    required: true
  },
  modelType: { type: String, enum: ['openai', 'huggingface', 'webhook'], required: true },
  promptTemplate: { type: String },
  inputSchema: { type: Object },
  ratings: [
    {
      userId: { type: String },
      rating: { type: Number, min: 1, max: 5 }
    }
  ]
}, { timestamps: true });

const Agent = mongoose.model('Agent', agentSchema);
export default Agent;
