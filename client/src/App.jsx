import React from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import Navbar from './components/user/Navbar';
import Home from './pages/user/Home';
import AgentDetails from './pages/user/AgentDetails';
import AgentsList from './pages/user/AgentsList';
import Dashboard from './pages/creator/Dashboard';
import AddAgent from './pages/creator/AddAgent';
import MyAgents from './pages/creator/MyAgents';
import AgentRuns from './pages/creator/AgentRuns';
import Creator from './pages/creator/Creator';
import 'quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import ExecutionResult from './pages/user/ExecutionResult';
// import MyExecutions from './pages/user/MyExecutions';
import Loading from './components/user/Loading';

const App = () => {
  const isCreatorRoute = useMatch('/creator/*');

  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer />
      {/* Render Navbar only if not on creator routes */}
      {!isCreatorRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agent/:id" element={<AgentDetails />} />
        <Route path="/agents" element={<AgentsList />} />
        <Route path="/agents/:input" element={<AgentsList />} />
        {/* <Route path="/my-executions" element={<MyExecutions />} />
        <Route path="/result/:runId" element={<ExecutionResult />} /> */}
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/creator" element={<Creator />}>
          <Route index element={<Dashboard />} />
          <Route path="add-agent" element={<AddAgent />} />
          <Route path="my-agents" element={<MyAgents />} />
          <Route path="agent-runs" element={<AgentRuns />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
