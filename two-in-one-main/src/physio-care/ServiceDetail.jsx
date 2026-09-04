import { Link, useParams } from 'react-router-dom';
import { Clock, Phone, MapPin, CheckCircle } from 'lucide-react';
import './Home.css';
import logo from './assets/physio-care-logo.svg';

// This acts as your database so the page knows exactly what image and text to load!
const serviceDatabase = {
  'geriatric': {
    title: 'Geriatric Physiotherapy',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1000&q=80',
    description: 'Our Geriatric Physiotherapy is specially designed for elderly individuals to improve mobility, strength, and balance. We focus on fall prevention, arthritis management, and maintaining independence in daily activities.'
  },
  'neurological': {
    title: 'Neurological Physiotherapy',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1000&q=80',
    description: 'Neurological Physiotherapy focuses on improving movement, balance, and function for patients dealing with nerve damage, stroke, Parkinson’s, or spinal cord injuries. We build new neural pathways through targeted exercises.'
  },
  'post-surgical': {
    title: 'Post Surgical Rehabilitation',
    image: 'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=1000&q=80',
    description: 'A structured program designed to help you regain strength safely after operations like joint replacements or ACL repairs. We ensure proper tissue healing while preventing stiffness and scar tissue buildup.'
  },
  'orthopaedic': {
    title: 'Orthopaedic Physiotherapy',
    // FIXED IMAGE LINK
    image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1000&q=80',
    description: 'Focuses on the treatment of bone, joint, and muscle-related issues. Whether you are dealing with a sports injury, severe back pain, or ligament sprains, we restore your mechanical movement patterns safely.'
  },
  'pain-management': {
    title: 'Pain Management Therapy',
    // NEW RELIABLE IMAGE LINK
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1000&q=80',
    description: 'Targeted interventions for acute and chronic pain relief. We use advanced modalities like dry needling, laser therapy, and myofascial release to treat the root cause of the pain, not just the symptoms.'
  }
};

export default function ServiceDetail() {
  const { id } = useParams(); // Gets the word from the URL (e.g., 'geriatric')
  
  // Look up the data. If someone types a random URL, default to a safe fallback
  const service = serviceDatabase[id] || {
    title: 'Physiotherapy Treatment',
    image: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=1000&q=80',
    description: 'Comprehensive physiotherapy care designed to relieve pain and restore your mobility.'
  };

  return (
    <div className="app-wrapper">
      
      {/* 1. TOP BAR */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-left"><span><MapPin size={14}/> Gorakhpur, Uttar Pradesh</span></div>
          <div className="top-right"><span>Help Desk: +91 98765 43210</span></div>
        </div>
      </div>

      {/* 2. FLOATING CURVED NAVBAR */}
      <div className="navbar-wrapper">
        <nav className="navbar">
          <div className="brand"><Link to="/"><img src={logo} alt="Logo" className="logo-img" /></Link></div>
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

      {/* 3. DYNAMIC IMAGE BANNER HEADER (Uses the specific therapy image!) */}
      <div 
        className="internal-header" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('${service.image}')` 
        }}
      >
        <div className="container">
          <h1>{service.title}</h1>
          <p>Home / Services / {service.title}</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '50px', padding: '80px 20px' }}>
        
        {/* Left Side: Therapy Details & DYNAMIC IMAGE */}
        <div className="service-details-left">
          {/* This image now changes based on exactly what card you clicked! */}
          <img src={service.image} alt={service.title} style={{width: '100%', height: '400px', objectFit: 'cover', borderRadius: '20px', marginBottom: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
          
          <h2 style={{color: 'var(--clr-dark)', marginBottom: '20px'}}>About {service.title}</h2>
          <p style={{marginBottom: '30px', fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--clr-gray)'}}>
            {service.description}
          </p>
          
          <h3 style={{marginTop: '40px', marginBottom: '20px', color: 'var(--clr-dark)'}}>Benefits of this Treatment</h3>
          <ul style={{listStyle: 'none', padding: 0}}>
            <li style={{display: 'flex', gap: '15px', marginBottom: '20px', fontSize: '1.05rem', color: 'var(--clr-gray)'}}><CheckCircle size={24} color="var(--clr-cyan)"/> Reduces chronic pain and cellular inflammation</li>
            <li style={{display: 'flex', gap: '15px', marginBottom: '20px', fontSize: '1.05rem', color: 'var(--clr-gray)'}}><CheckCircle size={24} color="var(--clr-cyan)"/> Restores structural joint mobility and flexibility</li>
            <li style={{display: 'flex', gap: '15px', marginBottom: '20px', fontSize: '1.05rem', color: 'var(--clr-gray)'}}><CheckCircle size={24} color="var(--clr-cyan)"/> Prevents future injuries and biomechanical complications</li>
          </ul>
        </div>

        {/* Right Side: Working Time Sidebar */}
        <div className="service-sidebar">
          <div style={{ background: 'white', padding: '35px', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
            <h3 style={{marginBottom: '20px', borderBottom: '2px solid var(--clr-cyan)', paddingBottom: '15px', color: 'var(--clr-dark)'}}>Working Hours</h3>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '15px', color: 'var(--clr-gray)', fontSize: '1.05rem'}}>
              <span>Mon - Sat:</span> <strong>09:30 am To 07:30 pm</strong>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', color: 'var(--clr-gray)', fontSize: '1.05rem'}}>
              <span>Sunday:</span> <strong style={{color: 'var(--clr-maroon)'}}>Closed</strong>
            </div>
          </div>

          <div style={{ background: 'var(--clr-maroon)', color: 'white', padding: '40px 30px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 20px 40px rgba(161, 43, 94, 0.2)' }}>
            <h3 style={{color: 'white', marginBottom: '15px'}}>Need Emergency Help?</h3>
            <p style={{color: 'rgba(255,255,255,0.9)', marginBottom: '25px'}}>Call us directly to schedule an immediate consultation.</p>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '1.3rem', fontWeight: 'bold'}}>
              <Phone size={24} /> +91 98765 43210
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}