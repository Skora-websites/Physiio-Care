import React from 'react';

const Footer = ({ brandName, description, address }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div className="footer-brand" style={{ maxWidth: '400px' }}>
            <h3>{brandName}</h3>
            <p className="footer-text">
              {description}
            </p>
          </div>
          <div>
            <h3>Visit Us</h3>
            <p className="footer-text">{address}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {brandName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;