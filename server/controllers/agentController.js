import Agent from "../models/Agent.js"

// Get all published agents
export const getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find({ isPublished: true })
      .select(['-internalLogic'])
      .populate({ path: 'creator', select: '-password' });

    res.json({ success: true, agents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get agent by ID
export const getAgentById = async (req, res) => {
  const { id } = req.params;
  try {
    const agentData = await Agent.findById(id).populate('creator');
    res.json({ success: true, agentData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};