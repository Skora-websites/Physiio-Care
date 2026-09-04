import { Link } from 'react-router-dom';
import { MapPin, Clock, PlayCircle, ArrowUpRight } from 'lucide-react';
import './Home.css';
import logo from './assets/physio-care-logo.svg'; 

export default function Home() {
  return (
    <div className="app-wrapper">
      
      {/* 1. TOP BAR */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-left">
            <span><MapPin size={14}/> Gorakhpur, Uttar Pradesh</span>
            <span className="divider">|</span>
            <span><Clock size={14}/> Working Time: 09:00 am To 06:00 pm</span>
          </div>
          <div className="top-right">
            <span>Help Desk: +91 98765 43210</span>
          </div>
        </div>
      </div>

      {/* 2. CURVED NAVBAR */}
      <div className="navbar-wrapper">
        <nav className="navbar">
          <div className="brand">
            <Link to="/"><img src={logo} alt="Physio Care" className="logo-img" /></Link>
          </div>
          <ul className="nav-links">
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/blogs">Blogs</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
          <Link to="/book-appointment" className="btn-primary btn-round">Book Appointment</Link>
        </nav>
      </div>

      {/* 3. HERO SECTION */}
      <section className="hero">
        <div className="container position-relative">
          <div className="hero-content">
            <span className="subtitle">HELPING HANDS</span>
            <h1>Stretch Your Body To <br/>Reduce <span className="text-maroon">Daily Pain</span></h1>
            <p>Daily tasks like typing, lifting, or walking can place constant stress on your joints, leading to stiffness, soreness, and fatigue. We are here to heal.</p>
            <div className="hero-actions">
              <Link to="/contact" className="btn-primary btn-round">Contact us</Link>
              
            </div>
          </div>
          <div className="experience-box">
            <h2>15</h2>
            <div className="exp-text"><p>YEARS OF</p><p>EXPERTISE</p></div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section id="about" className="about-section container">
        <div className="about-grid">
          <div className="about-image-card">
            <img src="https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=800&q=80" alt="Clinic" className="img-fluid rounded-image" />
          </div>
          <div className="about-content">
            <span className="subtitle text-cyan">OUR TRUSTED SUPPORT</span>
            <h2>Passionate About Providing Expert Care And Support</h2>
            <p>At Physio Care, our dedicated physiotherapists combine compassionate care, continuous support, and clinical expertise to relieve pain and help patients regain a better quality of life.</p>
            <div className="quote-box">
              <p>“True healing comes from more than treatments—it's built on trust, patience, and compassion, reflected in each small victory.”</p>
              <h4>Dr. Santosh Kumar Mishra</h4>
              <span>Lead Physiotherapist</span>
            </div>
            <Link to="/about" className="btn-cyan btn-round mt-4">About more</Link>
          </div>
        </div>
      </section>

      {/* 5. IMAGE-BASED SERVICES SECTION */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="section-header">
            <div className="header-text">
              <span className="subtitle">OUR SERVICES</span>
              <h2>Explore Our Physiotherapy Services</h2>
              <p>We offer comprehensive physiotherapy services designed to relieve pain, restore mobility, and improve overall well-being.</p>
            </div>
            <Link to="/services" className="btn-outline btn-round">View All Services</Link>
          </div>

          <div className="services-grid">
            {/* Geriatric Card */}
            <div className="service-card rounded-box">
              <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80" alt="Geriatric" className="service-img" />
              <div className="service-content">
                <h3>Geriatric Physiotherapy</h3>
                <p>Specially designed for elderly individuals to improve mobility and reduce pain.</p>
                <Link to="/services/geriatric" className="service-link"><ArrowUpRight size={20}/></Link>
              </div>
            </div>
            {/* Neurological Card */}
            <div className="service-card rounded-box">
              <img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80" alt="Neurological" className="service-img" />
              <div className="service-content">
                <h3>Neurological Physiotherapy</h3>
                <p>Focuses on improving movement, balance, and function for patients.</p>
                <Link to="/services/neurological" className="service-link"><ArrowUpRight size={20}/></Link>
              </div>
            </div>
            {/* Post Surgical Card */}
            <div className="service-card rounded-box">
              <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=600&q=80" alt="Post Surgical" className="service-img" />
              <div className="service-content">
                <h3>Post Surgical Rehabilitation</h3>
                <p>A structured program designed to help you regain strength safely.</p>
                <Link to="/services/post-surgical" className="service-link"><ArrowUpRight size={20}/></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}