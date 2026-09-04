import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import '../styles/admin.css';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="admin-container">
      <div className="admin-dashboard-layout">
        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="admin-sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        <div className="admin-main-content">
          <Navbar toggleSidebar={toggleSidebar} />
          <div className="admin-content-body">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
