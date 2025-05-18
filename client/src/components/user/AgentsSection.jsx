import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import AgentCard from './AgentCard';
import { Link } from 'react-router-dom';

const AgentsSection = () => {
  const { allAgents } = useContext(AppContext);

  return (
    <div className="py-16 md:px-40 px-8">
      <h2 className="text-3xl font-medium text-gray-800">Run powerful AI agents</h2>
      <p className="md:text-base text-sm text-gray-500 mt-3">
        Explore ready-to-use AI agents designed to solve problems, automate tasks, and generate insights — from market analysis to content generation.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 md:px-0 md:my-16 my-10 gap-4">
        {allAgents.slice(0, 4).map((agent, index) => (
          <AgentCard key={index} agent={agent} />
        ))}
      </div>
      <Link
        to="/agent-list"
        onClick={() => scrollTo(0, 0)}
        className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded"
      >
        Show all agents
      </Link>
    </div>
  );
};

export default AgentsSection;
