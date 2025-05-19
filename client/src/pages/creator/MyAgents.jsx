import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Loading from '../../components/user/Loading';

const MyAgents = () => {
  const { backendUrl, getToken, isCreator } = useContext(AppContext);
  const [agents, setAgents] = useState(null);

  const fetchAgents = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(backendUrl + '/api/creator/my-agents', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAgents(data.agents.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isCreator) {
      fetchAgents();
    }
  }, [isCreator]);

  return agents ? (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="flex flex-col items-center max-w-6xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left">
            <tr>
              <th className="px-4 py-3 font-semibold text-center hidden sm:table-cell">#</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Description</th>
              <th className="px-4 py-3 font-semibold hidden md:table-cell">Thumbnail</th>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell">Created</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-500">
            {agents.map((item, index) => (
              <tr key={item._id} className="border-b border-gray-500/20">
                <td className="px-4 py-3 text-center hidden sm:table-cell">{index + 1}</td>
                <td className="md:px-4 px-2 py-3 truncate">{item.agentName}</td>
                <td className="px-4 py-3 truncate">{item.agentDescription}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <img
                    src={item.agentThumbnail}
                    alt={item.agentName}
                    className="w-10 h-10 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '—'}
                </td>
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

export default MyAgents;
