import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaStar, FaSmileBeam, FaPaperPlane } from 'react-icons/fa';
import './PlayZoneFooter.css';

const PlayZoneFooter = ({ brandName, description, address, phone, email }) => {
  return (
    <footer className="pz-footer">
      <div className="pz-footer-wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>

      <div className="container pz-footer-container">
        {/* Column 1: About */}
        <div className="pz-footer-col">
          <h3 className="pz-footer-title"><FaSmileBeam className="title-icon icon-bounce" /> {brandName || "Let's Play Zone"}</h3>
          <p className="pz-footer-desc">
            {description || 'The ultimate fun destination for kids! We provide a safe, engaging, and colorful environment where imaginations run wild and every day is a new adventure.'}
          </p>
          <div className="pz-footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-inst">
              <FaInstagram />
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="social-wa">
              <FaWhatsapp />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-fb">
              <FaFacebookF />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="pz-footer-col">
          <h3 className="pz-footer-title">Quick Links</h3>
          <ul className="pz-footer-links">
            <li><Link to="/play-zone"><FaStar className="link-icon icon-spin-hover" /> Home</Link></li>
            <li><Link to="/play-zone/about"><FaStar className="link-icon icon-spin-hover" /> About Us</Link></li>
            <li><Link to="/play-zone/activities"><FaStar className="link-icon icon-spin-hover" /> Activities</Link></li>
            <li><Link to="/play-zone/gallery"><FaStar className="link-icon icon-spin-hover" /> Gallery</Link></li>
            <li><Link to="/play-zone"><FaStar className="link-icon icon-spin-hover" /> Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Activities / Services */}
        <div className="pz-footer-col">
          <h3 className="pz-footer-title">Fun Activities</h3>
          <ul className="pz-footer-links">
            <li><Link to="/play-zone/activities"><FaStar className="link-icon icon-spin-hover" /> Indoor Play Area</Link></li>
            <li><Link to="/play-zone/activities"><FaStar className="link-icon icon-spin-hover" /> Birthday Parties</Link></li>
            <li><Link to="/play-zone/activities"><FaStar className="link-icon icon-spin-hover" /> Toddler Zone</Link></li>
            <li><Link to="/play-zone/activities"><FaStar className="link-icon icon-spin-hover" /> Arcade Games</Link></li>
            <li><Link to="/play-zone/activities"><FaStar className="link-icon icon-spin-hover" /> Creative Workshops</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & CTA */}
        <div className="pz-footer-col">
          <h3 className="pz-footer-title">Find Us!</h3>
          <div className="pz-footer-contact">
            <div className="contact-item">
              <span className="contact-icon bg-yellow"><FaMapMarkerAlt /></span>
              <p className="contact-text">{address || '456 Playful Ave, Fun City'}</p>
            </div>
            <div className="contact-item">
              <span className="contact-icon bg-blue"><FaEnvelope /></span>
              <a href={`mailto:${email || 'hello@playzone.com'}`} className="contact-text">
                {email || 'hello@playzone.com'}
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-icon bg-green"><FaPhoneAlt /></span>
              <a href={`tel:${phone || '+91 98765 43211'}`} className="contact-text">
                {phone || '+91 98765 43211'}
              </a>
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a 
              href="https://www.google.com/search?gs_ssp=eJwFwUsOgjAQANC4NfEOszEuXDDjtNJyBG7Rz1AbGyAUksrpfe9661JH1PAVo1YGL8MdG1sMMhFZJm9Z9wM2pRX3xgQ9MUl84_gssj8qrMX94FxmgbAtteY5wSbr4Uv-Qvq4Mzvv4h9ThR5u&q=let%27s+play+zone+crossing+republik+ghaziabad&oq=lets+play+zone+cr&gs_lcrp=EgZjaHJvbWUqEggBEC4YDRivARjHARiABBiOBTIGCAAQRRg5MhIIARAuGA0YrwEYxwEYgAQYjgUyCggCEAAYgAQYogQyCggDEAAYgAQYogQyCggEEAAYgAQYogQyCggFEAAYgAQYogTSAQg2NDkwajBqN6gCCLACAfEFE_i_oMSZYzc&sourceid=chrome&ie=UTF-8" 
              target="_blank" 
              rel="noreferrer" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '12px 24px', 
                borderRadius: '50px', 
                textDecoration: 'none', 
                background: 'var(--pz-primary)', 
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                transition: 'all 0.3s ease'
              }}
              className="pz-btn-directions"
            >
              <FaMapMarkerAlt /> Reviews Us On Google
            </a>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=Ground+Floor,+Saviour+Street,+30,+Crossings+Republik,+Uttar+Pradesh+201016" 
              target="_blank" 
              rel="noreferrer" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '8px', 
                padding: '12px 24px', 
                borderRadius: '50px', 
                textDecoration: 'none', 
                background: 'var(--pz-primary)', 
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
                transition: 'all 0.3s ease'
              }}
              className="pz-btn-directions"
            >
              <FaMapMarkerAlt /> Get Directions
            </a>
          </div>
        </div>
      </div>

      <div className="pz-footer-bottom">
        <div className="container pz-bottom-inner">
          <p>&copy; {new Date().getFullYear()} {brandName || "Let's Play Zone"}. All rights reserved. Designed by <span className="highlight-text-pz">SkoraSoft</span>.</p>
          <div className="pz-bottom-decorations">
            <span className="decor circle c-1"></span>
            <span className="decor circle c-2"></span>
            <span className="decor circle c-3"></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PlayZoneFooter;
