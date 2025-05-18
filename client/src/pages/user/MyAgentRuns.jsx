import React, { useContext, useEffect, useState } from 'react';
import Footer from '../../components/user/Footer';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyAgentRuns = () => {
  const {
    userData,
    navigate,
    backendUrl,
    getToken,
    fetchUserAgentRuns,
    agentRuns
  } = useContext(AppContext);

  const [loading, setLoading] = useState(true);

  const fetchRuns = async () => {
    try {
      await fetchUserAgentRuns();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchRuns();
    }
  }, [userData]);

  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">My Agent Executions</h1>

        <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Agent</th>
              <th className="px-4 py-3 font-semibold truncate">Model</th>
              <th className="px-4 py-3 font-semibold truncate">Run Date</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {agentRuns.map((run, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                  <img src={run.agentThumbnail} alt="" className="w-14 sm:w-24 md:w-28" />
                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{run.agentName}</p>
                  </div>
                </td>
                <td className="px-4 py-3 max-sm:hidden">{run.modelType}</td>
                <td className="px-4 py-3 max-sm:hidden">
                  {new Date(run.runDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 max-sm:text-right">
                  <button
                    onClick={() => navigate(`/agent-run/${run._id}`)}
                    className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </>
  );
};

export default MyAgentRuns;
