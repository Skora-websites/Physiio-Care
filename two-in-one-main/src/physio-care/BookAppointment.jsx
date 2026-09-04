import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import './Home.css';
import logo from './assets/physio-care-logo.svg';

export default function BookAppointment() {
  return (
    <div className="app-wrapper">

      {/* TOP BAR */}
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

      {/* NAVBAR */}
      <div className="navbar-wrapper">
        <nav className="navbar">
          <div className="brand">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
          </div>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <Link to="/doctor/book-appointment" className="btn-primary btn-round">
            Book Appointment
          </Link>
        </nav>
      </div>

      {/* HEADER */}
      <div className="internal-header booking-header-bg">
        <div className="container">
          <h1>Book an Appointment</h1>
          <p>Home / Book Appointment</p>
        </div>
      </div>

      {/* FORM */}
      <section className="booking-section">
        <div className="container">
          <div className="booking-card">

            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <span className="subtitle">SCHEDULE A VISIT</span>
              <h2 style={{ color: 'var(--clr-dark)' }}>
                Request Your Consultation
              </h2>
              <p>
                Fill out the form below and our team will contact you.
              </p>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>

              <div className="form-grid">

                <div className="form-group">
                  <label>Full Name *</label>
                  <input type="text" className="form-control" required />
                </div>

                <div className="form-group">
                  <label>Age *</label>
                  <input type="number" className="form-control" required />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" className="form-control" required />
                </div>

                <div className="form-group">
                  <label>Select Service *</label>
                  <select className="form-control" required>
                    <option value="">Choose a treatment...</option>
                    <option value="geriatric">Geriatric Physiotherapy</option>
                    <option value="neurological">Neurological Physiotherapy</option>
                    <option value="post-surgical">Post Surgical Rehabilitation</option>
                    <option value="orthopaedic">Orthopaedic Physiotherapy</option>
                    <option value="pain-management">Pain Management Therapy</option>
                  </select>
                </div>

              </div>

              <button type="submit" className="btn-submit">
                Submit Appointment Request
              </button>

            </form>

          </div>
        </div>
      </section>

    </div>
  );
}