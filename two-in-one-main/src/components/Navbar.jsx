import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlatform } from '../context/PlatformContext';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = ({ brandName, contactEmail }) => {
  const navigate = useNavigate();
  const { clearPlatform } = usePlatform();

  const handleExit = () => {
    clearPlatform();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-brand">
          {brandName}
        </div>
        <ul className="nav-links" style={{ gap: '20px' }}>
          <li>
            <span style={{ color: 'var(--text-dark)', fontWeight: '500' }}>
              {contactEmail}
            </span>
          </li>
          <li>
            <button 
              onClick={handleExit}
              style={{
                background: 'var(--secondary-color)',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: 'bold'
              }}
            >
               Leave Website <FaSignOutAlt />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;