import { Link } from 'react-router-dom';
import { 
  Globe, 
  MessageCircle, 
  Share2, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight 
} from 'lucide-react';
import logo from './assets/physio-care-logo.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        
        {/* Column 1: Branding & Socials */}
        <div className="footer-col">
          <img src={logo} alt="Physio Care Logo" className="footer-logo" />
          <p className="footer-desc">
            Providing world-class physiotherapy and rehabilitation services to help you regain your strength and live a pain-free life.
          </p>
          <div className="footer-socials">
            {/* Swapped brand icons for safe Lucide icons */}
            <a href="#"><Globe size={20} /></a>
            <a href="#"><MessageCircle size={20} /></a>
            <a href="#"><Share2 size={20} /></a>
            <a href="#"><Users size={20} /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/"><ChevronRight size={14} /> Home</Link></li>
            <li><Link to="/about"><ChevronRight size={14} /> About Us</Link></li>
            <li><Link to="/services"><ChevronRight size={14} /> Our Services</Link></li>
            <li><Link to="/book-appointment"><ChevronRight size={14} /> Book Appointment</Link></li>
            <li><Link to="/contact"><ChevronRight size={14} /> Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="footer-col">
          <h3 className="footer-title">Our Services</h3>
          <ul className="footer-links">
            <li><Link to="/services/geriatric"><ChevronRight size={14} /> Geriatric Physio</Link></li>
            <li><Link to="/services/neurological"><ChevronRight size={14} /> Neurological Physio</Link></li>
            <li><Link to="/services/orthopaedic"><ChevronRight size={14} /> Orthopaedic Physio</Link></li>
            <li><Link to="/services/post-surgical"><ChevronRight size={14} /> Post Surgical Rehab</Link></li>
            <li><Link to="/services/pain-management"><ChevronRight size={14} /> Pain Management</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact Info */}
        <div className="footer-col">
          <h3 className="footer-title">Contact Info</h3>
          <ul className="footer-contact">
            <li>
              <MapPin size={22} className="text-cyan" />
              <span>Gorakhpur, Uttar Pradesh, India</span>
            </li>
            <li>
              <Phone size={20} className="text-cyan" />
              <span>+91 98765 43210</span>
            </li>
            <li>
              <Mail size={20} className="text-cyan" />
              <span>info@physiocare.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar: Professional Credit */}
      <div className="footer-bottom">
        <div className="container bottom-inner">
          <p>© 2026 Physio Care. All Rights Reserved.</p>
          <p className="credit">
            Designed by: <strong>Skorasoft</strong> (Noida, Uttar Pradesh, India)
          </p>
        </div>
      </div>
    </footer>
  );
}