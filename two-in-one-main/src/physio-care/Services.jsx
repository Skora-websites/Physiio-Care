import { Link } from 'react-router-dom';
import { MapPin, Clock, ArrowUpRight } from 'lucide-react';
import './Home.css';
import logo from './assets/physio-care-logo.svg';

export default function Services() {
  return (
    <div className="app-wrapper">

      {/* 1. TOP BAR */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-left">
            <span><MapPin size={14} /> Gorakhpur, Uttar Pradesh</span>
          </div>
          <div className="top-right">
            <span>Help Desk: +91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* 2. FLOATING CURVED NAVBAR (Exact match to Home page) */}
      <div className="navbar-wrapper">
        <nav className="navbar">
          <div className="brand">
            <Link to="/"><img src={logo} alt="Physio Care" className="logo-img" /></Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services" className="active">Services</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <Link to="/doctor/book-appointment" className="btn-primary btn-round">Book Appointment</Link>
        </nav>
      </div>

      {/* 3. IMAGE BANNER HEADER */}
      <div className="internal-header services-header-bg">
        <div className="container">
          <h1>All Services</h1>
          <p>Home / Services</p>
        </div>
      </div>

      {/* All Services Grid - NOW WITH IMAGES FOR ALL 5 CARDS */}
      <section className="services-section" style={{ background: 'white', padding: '80px 0' }}>
        <div className="container">
          <div className="services-grid">

            {/* 1. Geriatric Card */}
            <div className="service-card rounded-box">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80" alt="Geriatric Physiotherapy" className="service-img" />
              <div className="service-content">
                <h3>Geriatric Physiotherapy</h3>
                <p>Specially designed for elderly individuals to improve mobility and reduce pain.</p>
                <Link to="/services/geriatric" className="service-link"><ArrowUpRight size={20} /></Link>
              </div>
            </div>

            {/* 2. Neurological Card */}
            <div className="service-card rounded-box">
              <img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80" alt="Neurological Physiotherapy" className="service-img" />
              <div className="service-content">
                <h3>Neurological Physiotherapy</h3>
                <p>Focuses on improving movement, balance, and function for patients.</p>
                <Link to="/services/neurological" className="service-link"><ArrowUpRight size={20} /></Link>
              </div>
            </div>

            {/* 3. Post Surgical Card */}
            <div className="service-card rounded-box">
              <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=600&q=80" alt="Post Surgical Rehabilitation" className="service-img" />
              <div className="service-content">
                <h3>Post Surgical Rehabilitation</h3>
                <p>A structured program designed to help you regain strength safely.</p>
                <Link to="/services/post-surgical" className="service-link"><ArrowUpRight size={20} /></Link>
              </div>
            </div>

            {/* 4. Orthopaedic Card (FIXED IMAGE) */}
            <div className="service-card rounded-box">
              <img src="https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80" alt="Orthopaedic Physiotherapy" className="service-img" />
              <div className="service-content">
                <h3>Orthopaedic Physiotherapy</h3>
                <p>Focuses on the treatment of bone, joint, and muscle-related issues to restore movement.</p>
                <Link to="/services/orthopaedic" className="service-link"><ArrowUpRight size={20} /></Link>
              </div>
            </div>

            {/* 5. Pain Management Card (NEW RELIABLE IMAGE) */}
            <div className="service-card rounded-box">
              <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80" alt="Pain Management Therapy" className="service-img" />
              <div className="service-content">
                <h3>Pain Management Therapy</h3>
                <p>Targeted interventions for acute and chronic pain relief to help you live comfortably.</p>
                <Link to="/services/pain-management" className="service-link"><ArrowUpRight size={20} /></Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}