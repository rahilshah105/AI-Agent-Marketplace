/*  src/pages/user/MyAgents.jsx
    — shows every agent the current user has PURCHASED
------------------------------------------------------------------- */
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AppContext } from "../../context/AppContext";
import Loading from "../../components/user/Loading";
import { X } from "lucide-react";

const MyAgents = () => {
  /* -------------------------------------------------- context ---- */
  const { backendUrl, getToken, navigate, fetchUserData } = useContext(AppContext);

  /* ------------------------------------------------ component ---- */
  const [agents, setAgents] = useState([]);  // array of Agent docs
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  /* --------------------------------------------- fetch on mount -- */
  useEffect(() => {
    const load = async () => {
      try {
        const token = await getToken();               // Clerk session
        const res = await axios.get(
          `${backendUrl}/api/user/my-agents`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.data?.success) {
          throw new Error(res.data?.message || "Could not load agents");
        }

        /* newest-purchase first; make sure it’s always an array */
        const list = Array.isArray(res.data.agents) ? res.data.agents : [];
        setAgents([...list].reverse());
      } catch (err) {
        toast.error(err.message);
        setHasError(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [backendUrl, getToken]);

  /* ---------------------------------------------------- render --- */
  if (loading) return <Loading />;

  if (hasError)
    return (
      <div className="p-10 text-center text-red-600">
        Something went wrong; please try again later.
      </div>
    );

  if (agents.length === 0)
    return (
      <div className="p-10 text-center text-gray-500">
        You haven’t purchased any agents yet.
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col items-start md:p-8 p-4 pt-8">
      <h1 className="text-2xl font-semibold mb-6">My Purchased Agents</h1>

      <div className="w-full overflow-x-auto rounded-md border border-gray-300/40 bg-white">
        <table className="w-full whitespace-nowrap">
          <thead className="text-gray-800 border-b border-gray-300/40 text-sm">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Agent</th>
              <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">
                Description
              </th>
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-700 text-sm">
            {agents.map((agent) => (
              <tr key={agent._id} className="border-b border-gray-300/40">
                <td className="px-4 py-3 flex items-center space-x-3">
                  <img
                    src={agent.agentThumbnail}
                    alt={agent.agentName}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <span className="font-medium">{agent.agentName}</span>
                </td>

                <td className="px-4 py-3 hidden sm:table-cell line-clamp-2">
                  {agent.agentDescription}
                </td>

<td className="pr-4 pl-2 py-3">
  <div className="flex justify-between items-center gap-10 pr-10">
    {/* View / Run Button */}
    <button
      onClick={() => navigate(`/agent/${agent._id}`)}
      className="rounded bg-blue-600 px-4 py-2 text-xs font-medium text-white"
    >
      View / Run
    </button>

    {/* Remove from Workspace Button */}
    <button
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();

setAgents((prevAgents) =>
  prevAgents.filter((a) => a._id.toString() !== agent._id.toString())
);

try {
  const token = await getToken();
  await axios.post(
    `${backendUrl}/api/user/remove-from-workspace`,
    { agentId: agent._id },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  toast.success("Agent removed from workspace");
  // await fetchUserData();
} catch (error) {
  toast.error("Failed to remove agent. Please refresh.");
  console.error("Error removing from workspace:", error);
}

      }}
      className="rounded-full bg-red-500 text-white w-6 h-6 flex items-center justify-center"
      title="Remove"
    >
      <X size={12} />
    </button>
  </div>
</td>



              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyAgents;
