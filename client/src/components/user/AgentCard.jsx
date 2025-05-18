import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';

const AgentCard = ({ agent }) => {
  const { currency } = useContext(AppContext);

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      to={'/agent/' + agent._id}
      className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg"
    >
      <img className="w-full" src={agent.agentThumbnail} alt="Agent Thumbnail" />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{agent.agentName}</h3>
        <p className="text-gray-500">{agent.creator?.name || 'Unknown Creator'}</p>
        <p className="text-base font-semibold text-gray-800">
          {currency}{agent.pricePerRun.toFixed(2)} per run
        </p>
      </div>
    </Link>
  );
};

export default AgentCard;
