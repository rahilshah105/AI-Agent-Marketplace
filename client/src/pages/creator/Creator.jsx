import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/creator/SideBar';
import Navbar from '../../components/creator/Navbar';
import Footer from '../../components/creator/Footer';

const Creator = () => {
  return (
    <div className="text-default min-h-screen bg-white">
      <Navbar />
      <div className="flex">
        <SideBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Creator;
