import { getImageUrl } from '../utils/imageUrl';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaStethoscope, FaHeartbeat, FaBrain, FaCheckCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import ModernNavbar from '../components/ModernNavbar';
import DoctorFooter from '../components/DoctorFooter';
import VideoShowcase from '../components/VideoShowcase';
import VideosGallery from '../components/VideosGallery';
import api from '../admin/utils/api';
import '../styles/doctor.css';

const DoctorPage = () => {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFaq, setActiveFaq] = useState(0);

  const faqs = [
    { q: "How can I book a physiotherapy appointment?", a: "You can book directly by clicking the 'Book Appointment' button on our site or by calling our clinic." },
    { q: "Do I need a doctor's referral for physiotherapy?", a: "In most cases, a referral is not mandatory, but it might be required by your insurance provider." },
    { q: "What conditions do you treat in physiotherapy?", a: "We treat sports injuries, post-surgery recovery, chronic back pain, arthritis, and neurological conditions." },
    { q: "How long does a physiotherapy session take?", a: "An initial consultation usually takes 45-60 minutes, while follow-up sessions take about 30-45 minutes." },
    { q: "How many sessions are usually required?", a: "This depends entirely on your condition and response to treatment. Your physiotherapist will outline a plan after your first visit." }
  ];

  useEffect(() => {
    document.body.classList.add('theme-doctor');
    fetchData();
    return () => document.body.classList.remove('theme-doctor');
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, servicesRes, galleryRes] = await Promise.all([
        api.get('/about'),
        api.get('/services'),
        api.get('/gallery')
      ]);
      setSettings(settingsRes.data);
      setServices(servicesRes.data || []);
      setGallery(galleryRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSettings({});
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem', color: '#22577A'}}>Loading...</div>;

  const d = settings || {};


  return (
    <div>
      <ModernNavbar brandName={d.aboutTitle || "Physio Care"} basePath="/doctor" />
      
      {/* ── Hero Section ── */}
      <section 
        className="doc-hero" 
        style={{ backgroundImage: `url(${d.heroImage ? getImageUrl(d.heroImage) : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop'})` }}
      >
        <div className="doc-hero-overlay"></div>
        <div className="container doc-hero-content">
          <h1 className="doc-hero-title">
            {d.heroTitle || 'Expert Physiotherapy Care'}
          </h1>
          <p className="doc-hero-subtitle">
            {d.heroSubtitle || 'Providing comprehensive rehabilitation and wellness services for a pain-free life.'}
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={() => window.dispatchEvent(new CustomEvent('openBookingModal'))} className="doc-btn" style={{ border: 'none', fontFamily: 'inherit', cursor: 'pointer' }}>Book Appointment</button>
            <Link to="/doctor/services" className="doc-btn-outline" style={{ borderColor: 'white', color: 'white' }}>View Services</Link>
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section className="doc-about-section">
        <div className="doc-about-grid">
          <div className="doc-about-img-wrapper">
            <img 
              src={d.aboutImage ? getImageUrl(d.aboutImage) : 'https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=2070&auto=format&fit=crop'} 
              alt={d.aboutTitle || "About Us"} 
              className="doc-about-img"
            />
            <div className="doc-about-badge">
              <span>15+</span>
              <small>Years Exp</small>
            </div>
          </div>
          <div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              {d.aboutTitle || 'Passionate About Providing Expert Care'}
            </h2>
            <p className="doc-about-text">
              {d.aboutText || 'At our physiotherapy clinic, our dedicated professionals combine compassionate care, continuous support, and clinical expertise to relieve pain and help patients regain a better quality of life. We are committed to your long-term health and mobility.'}
            </p>
            <Link to="/doctor/about" className="doc-btn">Read More About Us</Link>
          </div>
        </div>
      </section>

      {/* ── Services Section ── */}
      <section className="doc-services-section">
        <h2 className="section-title">Explore Our Physiotherapy Services</h2>
        <div className="doc-services-grid">
          {services?.slice(0, 4).map((service, index) => {
            const icons = [<FaHeartbeat />, <FaBrain />, <FaStethoscope />, <FaHeartbeat />];
            return (
              <div key={service._id} className="doc-service-card">
                <div className="doc-service-icon">
                  {icons[index % icons.length]}
                </div>
                <h4>{service.title}</h4>
                <p>{service.shortDescription}</p>
                <Link to={`/doctor/services/${service._id}`} className="doc-service-link">
                  Read More <FaArrowRight size={12} />
                </Link>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/doctor/services" className="doc-btn">View All Services</Link>
        </div>
      </section>

      {/* ── Video Showcase Section ── */}
      <VideoShowcase websiteType="doctor" />

      {/* ── Blogs Section ── */}
      {(blogs && blogs.length > 0) && (
        <section className="doc-services-section" style={{ backgroundColor: '#F8FAFC' }}>
          <h2 className="section-title">Latest Health Insights</h2>
          <div className="doc-services-grid">
            {blogs.slice(0, 3).map((blog) => (
              <div key={blog._id} className="doc-service-card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
                <img 
                  src={getImageUrl(blog.image)} 
                  alt={blog.title} 
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                />
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{blog.title}</h4>
                  <p style={{ flex: 1, fontSize: '0.9rem', marginBottom: '1rem' }}>{blog.shortDescription}</p>
                  <Link to={`/doctor/blogs/${blog._id}`} className="doc-service-link" style={{ alignSelf: 'flex-start' }}>
                    Read More <FaArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/doctor/blogs" className="doc-btn">View All Blogs</Link>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
     

      {/* ── FAQ Section ── */}
      <section className="doc-faq-section">
        <div className="container doc-faq-grid">
          <div className="doc-faq-left">
            <h3>Got A Question</h3>
            <h2>Frequently Asked <span>Questions</span></h2>
            <p style={{ color: '#64748B', lineHeight: '1.6' }}>
              Find quick answers to common questions about our physiotherapy treatments and recovery programs.
            </p>
          </div>
          <div className="doc-faq-mid">
            <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" alt="Doctor Treatment" className="doc-faq-img" />
          </div>
          <div className="doc-faq-right">
            {faqs.map((faq, idx) => (
              <div key={idx} className="doc-accordion-item">
                <div 
                  className="doc-accordion-header" 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                >
                  {faq.q}
                  {activeFaq === idx ? <FaChevronUp color="#38A3A5" /> : <FaChevronDown color="#94a3b8" />}
                </div>
                {activeFaq === idx && (
                  <div className="doc-accordion-content">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
           <div className="container" style={{ position: 'relative' }}>
        <div className="doc-cta-banner">
          <div>
            <h3 className="doc-cta-title">Ready To Start Your Journey To Recovery?</h3>
            <p className="doc-cta-subtitle">Contact us today to schedule your initial consultation.</p>
          </div>
          <button onClick={() => window.dispatchEvent(new CustomEvent('openBookingModal'))} className="doc-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer', flexShrink: 0 }}>
            <span style={{ background: 'white', color: 'var(--doc-primary)', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FaArrowRight size={10} style={{ transform: 'rotate(-45deg)' }} />
            </span>
            Book Appointment
          </button>
        </div>
      </div>
        </div>
      </section>

      {/* ── Gallery Section ── */}
      {(gallery && gallery.length > 0) && (
        <section className="doc-services-section">
          <h2 className="section-title">Our Facility & Success Stories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            {gallery.slice(0, 4).map((item) => (
              <div key={item._id} style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                <img src={getImageUrl(item.image)} alt={item.altText} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/doctor/gallery" className="doc-btn">View Full Gallery</Link>
          </div>
        </section>
      )}

      {/* ── Videos Gallery Section ── */}
      <VideosGallery websiteType="doctor" />

      {/* ── Features/Excellence Section ── */}
      {(d.features && d.features.length > 0) && (
        <section className="doc-features-section">
          <h2 className="section-title">Excellence In Care And Rehabilitation</h2>
          <div className="doc-features-marquee">
            {[...d.features, ...d.features].map((feat, index) => (
              <div key={index} className="doc-feature-item">
                <div className="doc-feature-icon">
                  <FaCheckCircle />
                </div>
                <h4>{feat.title}</h4>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* <section className="doc-contact-strip">
        <div className="doc-contact-grid">
          <div className="doc-contact-item">
            <FaPhoneAlt />
            <p>{d.contactPhone || '+91 123 456 7890'}</p>
          </div>
          <div className="doc-contact-item">
            <FaEnvelope />
            <p>{d.contactEmail || 'info@clinic.com'}</p>
          </div>
          <div className="doc-contact-item">
            <FaMapMarkerAlt />
            <p>{d.contactAddress || '123 Clinic Street, Medical District'}</p>
          </div>
        </div>
      </section> */}

      <DoctorFooter phone={d?.contactPhone} email={d?.contactEmail} brandName={d.aboutTitle || "Physio Care"} description={d.aboutText} address={d.contactAddress} />
    </div>
  );
};

export default DoctorPage;
