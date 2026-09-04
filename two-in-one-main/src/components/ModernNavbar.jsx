import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaArrowLeft } from 'react-icons/fa';
import BookingModal from './BookingModal';
import './ModernNavbar.css';

const ModernNavbar = ({ brandName, basePath }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { title: 'Home', path: `${basePath}` },
    { title: 'About', path: `${basePath}/about` },
    { title: 'Services', path: `${basePath}/services` },
    ...(basePath === '/play-zone' ? [{ title: 'Activities', path: `${basePath}/activities` }] : []),
    { title: 'Gallery', path: `${basePath}/gallery` }
  ];

  return (
    <nav className="modern-navbar">
      <div className="container nav-content">

        {/* ✅ LOGO SECTION */}
        <Link to={basePath} className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

          {basePath === '/doctor' ? (
            <>
              <img src="/physio-care-logo.png" alt="Physio Care Logo" style={{ height: '50px' }} />
              <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>
                Dr. Preeti Choudhary (PT)
              </span>
            </>
          ) : basePath === '/play-zone' ? (
            <>
              {/* ✅ YOUR LOGO */}
              <img src="/playzone.jpg" alt="Play Zone Logo" style={{ height: '50px' }} />

            </>
          ) : (
            brandName
          )}

        </Link>

        {/* MENU */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link, index) => {
            const isActive =
              location.pathname === link.path ||
              (link.path !== basePath && location.pathname.startsWith(link.path));

            return (
              <li key={index} className="nav-item">
                <Link
                  to={link.path}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            );
          })}

          <li className="nav-item nav-buttons-container">
            <Link to="/" className="nav-back-btn">
              <FaArrowLeft size={12} /> Portal
            </Link>

            <button
              className="nav-book-btn"
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent('openBookingModal'));
              }}
            >
              {basePath === '/play-zone' ? 'Book Visit' : 'Book Appointment'}
            </button>
          </li>
        </ul>

        {/* MOBILE ICON */}
        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      <BookingModal basePath={basePath} />
    </nav>
  );
};

export default ModernNavbar;