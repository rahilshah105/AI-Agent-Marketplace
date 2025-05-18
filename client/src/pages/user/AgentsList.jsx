import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/user/Footer';
import { assets } from '../../assets/assets';
import AgentCard from '../../components/user/AgentCard';
import { AppContext } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import SearchBar from '../../components/user/SearchBar';

const AgentsList = () => {
  const { input } = useParams();
  const { allAgents, navigate } = useContext(AppContext);
  const [filteredAgents, setFilteredAgents] = useState([]);

  useEffect(() => {
    if (allAgents && allAgents.length > 0) {
      const tempAgents = allAgents.slice();
      input
        ? setFilteredAgents(
            tempAgents.filter(agent =>
              agent.agentName.toLowerCase().includes(input.toLowerCase())
            )
          )
        : setFilteredAgents(tempAgents);
    }
  }, [allAgents, input]);

  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">Explore Agents</h1>
            <p className="text-gray-500">
              <span onClick={() => navigate('/')} className="text-blue-600 cursor-pointer">Home</span> / <span>Agents</span>
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        {input && (
          <div className="inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8 text-gray-600">
            <p>{input}</p>
            <img onClick={() => navigate('/agents')} className="cursor-pointer" src={assets.cross_icon} alt="" />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0">
          {filteredAgents.map((agent, index) => (
            <AgentCard key={index} agent={agent} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AgentsList;
