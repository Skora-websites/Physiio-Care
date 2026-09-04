import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaChevronRight } from 'react-icons/fa';
import './DoctorFooter.css';

const DoctorFooter = ({ brandName, description, address, phone, email }) => {
  return (
    <footer className="doc-footer">
      <div className="container doc-footer-container">
        {/* Column 1: About */}
        <div className="doc-footer-col">
          <h3 className="doc-footer-title">{brandName || 'Physio Care'}</h3>
          <p className="doc-footer-desc">
            {description || 'A trusted physiotherapy clinic dedicated to relieving pain, restoring movement, and improving your quality of life.'}
          </p>
          <div className="doc-footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Column 2: Useful Links */}
        <div className="doc-footer-col">
          <h3 className="doc-footer-title">Useful Links</h3>
          <ul className="doc-footer-links">
            <li><Link to="/doctor"><FaChevronRight className="link-icon" /> Home</Link></li>
            <li><Link to="/doctor/about"><FaChevronRight className="link-icon" /> About</Link></li>
            <li><Link to="/doctor/services"><FaChevronRight className="link-icon" /> Services</Link></li>
            <li><Link to="/doctor"><FaChevronRight className="link-icon" /> Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="doc-footer-col">
          <h3 className="doc-footer-title">Services</h3>
          <ul className="doc-footer-links">
            <li><Link to="/doctor/services"><FaChevronRight className="link-icon" /> Geriatric Physiotherapy</Link></li>
            <li><Link to="/doctor/services"><FaChevronRight className="link-icon" /> Neurological Physiotherapy</Link></li>
            <li><Link to="/doctor/services"><FaChevronRight className="link-icon" /> Orthopaedic Physiotherapy</Link></li>
            <li><Link to="/doctor/services"><FaChevronRight className="link-icon" /> Pain Management Therapy</Link></li>
            <li><Link to="/doctor/services"><FaChevronRight className="link-icon" /> Post Surgical Rehabilitation</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="doc-footer-col">
          <h3 className="doc-footer-title">Contact</h3>
          <div className="doc-footer-contact">
            <div className="contact-item">
              <span className="contact-icon-wrap"><FaMapMarkerAlt /></span>
              <div>
                <p className="contact-label">Address</p>
                <p className="contact-text">{address || '123 Medical Drive, Health City'}</p>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon-wrap"><FaEnvelope /></span>
              <div>
                <p className="contact-label">Email</p>
                <a href={`mailto:${email || 'info@physiocare.com'}`} className="contact-text">
                  {email || 'info@physiocare.com'}
                </a>
              </div>
            </div>
            <div className="contact-item">
              <span className="contact-icon-wrap"><FaPhoneAlt /></span>
              <div>
                <p className="contact-label">Phone</p>
                <a href={`tel:${phone || '+91 98765 43210'}`} className="contact-text">
                  {phone || '+91 98765 43210'}
                </a>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a 
                href="https://www.google.com/search?q=physiotherapy+crossing+republik&oq=Physio#sv=CAwSpQIKBmxjbF9wdhI3CgNwdnESMENnMHZaeTh4TVdZMU1EVTNiakJrSWhNS0RYQm9lWE5wYjNSb1pYSmhjSGtRQWhnRBKTAQoDbHFpEosBQ2g5d2FIbHphVzkwYUdWeVlYQjVJR055YjNOemFXNW5JSEpsY0hWaWJHbHJTSXlnejRLVXJZQ0FDRm9wRUFBWUFCZ0JHQUlpSDNCb2VYTnBiM1JvWlhKaGNIa2dZM0p2YzNOcGJtY2djbVZ3ZFdKc2FXdVNBUTl3YUhsemFXOTBhR1Z5WVhCcGMzURISCgN0YnMSC2xyZjohM3NJQUU9EiQKAXESH3BoeXNpb3RoZXJhcHkgY3Jvc3NpbmcgcmVwdWJsaWsaEmxvY2FsLXBsYWNlLXZpZXdlchgKIKihgcAE" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '10px 20px', 
                  borderRadius: '5px', 
                  textDecoration: 'none', 
                  background: 'var(--doc-primary)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                  
                }}
              >
                <FaMapMarkerAlt /> Review Us On Google
              </a>
              <a 
                href="https://www.google.com/maps/dir/?api=1&destination=4th+Floor,+Physio+Care,+Orbit+Plaza,+Unit+-+405,+Crossings+Republik,+Ghaziabad,+Uttar+Pradesh+201016" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  padding: '10px 20px', 
                  borderRadius: '5px', 
                  textDecoration: 'none', 
                  background: 'var(--doc-primary)', 
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.9rem'
                }}
              >
                <FaMapMarkerAlt /> Get Directions
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="doc-footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} {brandName || 'Physio Care'}. All rights reserved. Designed by <span className="highlight-text">SkoraSoft</span>.</p>
        </div>
      </div>
    </footer>
  );
};

export default DoctorFooter;
