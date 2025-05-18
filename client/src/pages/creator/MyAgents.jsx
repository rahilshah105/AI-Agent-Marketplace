import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Loading from '../../components/user/Loading';

const AgentRuns = () => {
  const { backendUrl, getToken, isCreator } = useContext(AppContext);

  const [executions, setExecutions] = useState(null);

  const fetchAgentRuns = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/creator/runs', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setExecutions(data.runs.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isCreator) {
      fetchAgentRuns();
    }
  }, [isCreator]);

  return executions ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
              <th className="px-4 py-3 font-semibold">User</th>
              <th className="px-4 py-3 font-semibold">Agent Name</th>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell">Run Date</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-500">
            {executions.map((item, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                <td className="md:px-4 px-2 py-3 flex items-center space-x-3">
                  <img src={item.user.imageUrl} alt="" className="w-9 h-9 rounded-full" />
                  <span className="truncate">{item.user.name}</span>
                </td>
                <td className="px-4 py-3 truncate">{item.agentName}</td>
                <td className="px-4 py-3 hidden sm:table-cell">{new Date(item.runDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default AgentRuns;
