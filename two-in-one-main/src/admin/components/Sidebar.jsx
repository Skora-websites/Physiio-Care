import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiUsers, 
  FiFileText, 
  FiSettings, 
  FiImage, 
  FiActivity,
  FiX,
  FiList,
  FiVideo
} from 'react-icons/fi';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const handleLinkClick = () => {
    if (window.innerWidth <= 768 && setIsOpen) {
      setIsOpen(false);
    }
  };

  const NavItem = ({ path, name, icon }) => (
    <li className="admin-nav-item">
      <NavLink 
        to={path} 
        className={({ isActive }) => isActive ? "admin-nav-link active" : "admin-nav-link"}
        end={path === '/admin/dashboard'}
        onClick={handleLinkClick}
      >
        <span className="admin-nav-icon">{icon}</span>
        {name}
      </NavLink>
    </li>
  );

  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="admin-sidebar-header">
        <span>Admin Panel</span>
        <button className="admin-sidebar-close" onClick={() => setIsOpen && setIsOpen(false)} title="Close menu">
          <FiX />
        </button>
      </div>
      <ul className="admin-nav-list">
        <NavItem path="/admin/dashboard" name="Overview" icon={<FiHome />} />
        <NavItem path="/admin/leads" name="Leads" icon={<FiList />} />
        
        <li className="admin-nav-section-title" style={{ padding: '1rem 1rem 0.25rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--admin-text-muted)', fontWeight: 'bold' }}>
          Doctor
        </li>
        <NavItem path="/admin/doctor/settings" name="Settings" icon={<FiSettings />} />
        <NavItem path="/admin/doctor/video-showcase" name="Video Showcase" icon={<FiVideo />} />
        <NavItem path="/admin/doctor/videos" name="Videos" icon={<FiVideo />} />
        <NavItem path="/admin/doctor/services" name="Services" icon={<FiActivity />} />
        <NavItem path="/admin/doctor/gallery" name="Gallery" icon={<FiImage />} />

        <li className="admin-nav-section-title" style={{ padding: '1rem 1rem 0.25rem', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--admin-text-muted)', fontWeight: 'bold' }}>
          Let's Play Zone
        </li>
        <NavItem path="/admin/playzone/settings" name="Settings" icon={<FiSettings />} />
        <NavItem path="/admin/playzone/video-showcase" name="Video Showcase" icon={<FiVideo />} />
        <NavItem path="/admin/playzone/videos" name="Videos" icon={<FiVideo />} />
        <NavItem path="/admin/playzone/activities" name="Activities" icon={<FiActivity />} />
        <NavItem path="/admin/playzone/services" name="Services" icon={<FiFileText />} />
        <NavItem path="/admin/playzone/gallery" name="Gallery" icon={<FiImage />} />
      </ul>
    </div>
  );
};

export default Sidebar;
