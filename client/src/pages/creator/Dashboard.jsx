import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/user/Loading';

const Dashboard = () => {
  const { backendUrl, isCreator, currency, getToken } = useContext(AppContext);

  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(backendUrl + '/api/creator/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setDashboardData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isCreator) {
      fetchDashboardData();
    }
  }, [isCreator]);

  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='space-y-5'>
        <div className='flex flex-wrap gap-5 items-center'>
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.patients_icon} alt='executions_icon' />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.executionData.length}</p>
              <p className='text-base text-gray-500'>Total Executions</p>
            </div>
          </div>
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.appointments_icon} alt='agents_icon' />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.totalAgents}</p>
              <p className='text-base text-gray-500'>Total Agents</p>
            </div>
          </div>
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.earning_icon} alt='earnings_icon' />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{currency}{Math.floor(dashboardData.totalEarnings)}</p>
              <p className='text-base text-gray-500'>Total Earnings</p>
            </div>
          </div>
        </div>
        <div>
          <h2 className='pb-4 text-lg font-medium'>Latest Agent Executions</h2>
          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
            <table className='table-fixed md:table-auto w-full overflow-hidden'>
              <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
                  <th className='px-4 py-3 font-semibold'>User</th>
                  <th className='px-4 py-3 font-semibold'>Agent Name</th>
                  <th className='px-4 py-3 font-semibold'>Execution Time</th>
                </tr>
              </thead>
              <tbody className='text-sm text-gray-500'>
                {dashboardData.executionData.map((item, index) => (
                  <tr key={index} className='border-b border-gray-500/20'>
                    <td className='px-4 py-3 text-center hidden sm:table-cell'>{index + 1}</td>
                    <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                      <img
                        src={item.user.imageUrl}
                        alt='Profile'
                        className='w-9 h-9 rounded-full'
                      />
                      <span className='truncate'>{item.user.name}</span>
                    </td>
                    <td className='px-4 py-3 truncate'>{item.agentName}</td>
                    <td className='px-4 py-3 truncate'>{new Date(item.runDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default Dashboard;