import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiMenu } from 'react-icons/fi';

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        <button className="admin-menu-btn" onClick={toggleSidebar} title="Toggle Menu">
          <FiMenu />
        </button>
        <div className="admin-navbar-title">
          Dashboard
        </div>
      </div>
      <div className="admin-user-menu">
        <button onClick={handleLogout} className="admin-logout-btn" title="Logout">
          <FiLogOut />
          <span className="admin-logout-text">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
