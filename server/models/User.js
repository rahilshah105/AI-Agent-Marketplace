import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String, required: true },
  credits: { type: Number, default: 0 }
}, { timestamps: true });

userSchema.add({
  workspaceAgents: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Agent' }],
    default: []
  }
});

const User = mongoose.model('User', userSchema);
export default User;
