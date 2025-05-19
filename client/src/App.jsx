// ───────────── src/App.jsx ─────────────
import React           from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';

/* ---------- shared UI ---------- */
import Navbar          from './components/user/Navbar';
import Loading         from './components/user/Loading';

/* ---------- user pages ---------- */
import Home            from './pages/user/Home';
import AgentDetails    from './pages/user/AgentDetails';
import AgentsList      from './pages/user/AgentsList';
import MyAgents        from './pages/user/MyAgents';     // NEW – purchased agents page

/* ---------- creator pages ---------- */
import Creator         from './pages/creator/Creator';
import Dashboard       from './pages/creator/Dashboard';
import AddAgent        from './pages/creator/AddAgent';
import MyAgentsDashboard from './pages/creator/MyAgents'; // published agents
import AgentRuns       from './pages/creator/AgentRuns';

/* ---------- libs / styles ---------- */
import 'quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/user/Header';

const App = () => {
  /* Hide the navbar on every route that starts with /creator */
  const isCreatorRoute = useMatch('/creator/*');

  return (
    <div className="text-default min-h-screen bg-white">
      <ToastContainer />
      {!isCreatorRoute && <Header/>}

      <Routes>
        {/* ---------- public ---------- */}
        <Route path="/"               element={<Home />} />
        <Route path="/agent/:id"      element={<AgentDetails />} />
        <Route path="/agents"         element={<AgentsList />} />
        <Route path="/agents/:input"  element={<AgentsList />} />

        {/* Purchased / executed agents */}
        <Route path="/my-agents"      element={<MyAgents />} />

        {/* Misc */}
        <Route path="/loading/:path"  element={<Loading />} />

        {/* ---------- creator dashboard ---------- */}
        <Route path="/creator"        element={<Creator />}>
          <Route index                element={<Dashboard />} />
          <Route path="add-agent"     element={<AddAgent />} />
          <Route path="my-agents"     element={<MyAgentsDashboard />} />
          <Route path="agent-runs"    element={<AgentRuns />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
