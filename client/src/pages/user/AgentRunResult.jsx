import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import Footer from '../../components/user/Footer';
import Loading from '../../components/user/Loading';

const AgentRunResult = () => {
  const { runId } = useParams();
  const { backendUrl, getToken } = useContext(AppContext);
  const [runData, setRunData] = useState(null);

  const fetchRunData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/user/run/${runId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setRunData(data.run);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchRunData();
  }, []);

  return runData ? (
    <>
      <div className="min-h-screen md:px-36 px-6 py-12 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Agent Execution Summary</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">{runData.agentName}</h2>
          <p className="text-sm text-gray-500 mb-4">Model: {runData.modelType}</p>

          <div className="mb-4">
            <p className="font-medium text-gray-700 mb-1">Input Prompt:</p>
            <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
              {runData.input}
            </pre>
          </div>

          <div className="mb-4">
            <p className="font-medium text-gray-700 mb-1">Generated Output:</p>
            <pre className="bg-blue-50 border border-blue-100 p-3 rounded text-sm whitespace-pre-wrap">
              {runData.output}
            </pre>
          </div>

          <p className="text-sm text-gray-400">Run Time: {new Date(runData.createdAt).toLocaleString()}</p>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default AgentRunResult;

// {
//   "success": true,
//   "run": {
//     "_id": "run123",
//     "agentName": "Market Trend Analyzer",
//     "modelType": "OpenAI",
//     "input": "Analyze current stock market trends",
//     "output": "Based on the data, the market is showing bearish trends...",
//     "createdAt": "2025-05-18T14:02:00Z"
//   }
// }
