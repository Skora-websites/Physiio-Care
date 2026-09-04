import { getImageUrl } from '../utils/imageUrl';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaHeartbeat, FaBrain, FaStethoscope } from 'react-icons/fa';
import ModernNavbar from '../components/ModernNavbar';
import DoctorFooter from '../components/DoctorFooter';
import api from '../admin/utils/api';
import '../styles/doctor.css';

const DoctorServices = () => {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('theme-doctor');
    fetchData();
    return () => document.body.classList.remove('theme-doctor');
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, servicesRes] = await Promise.all([
        api.get('/about'),
        api.get('/services')
      ]);
      setSettings(settingsRes.data);
      setServices(servicesRes.data || []);
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
      
      <div className="doc-hero" style={{ minHeight: '40vh', backgroundImage: `url(${d.heroImage ? getImageUrl(d.heroImage) : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop'})` }}>
        <div className="doc-hero-overlay" style={{ background: 'linear-gradient(90deg, rgba(34, 87, 122, 0.9) 0%, rgba(56, 163, 165, 0.8) 100%)' }}></div>
        <div className="container doc-hero-content" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h1 className="doc-hero-title">Our Services</h1>
          <p className="doc-hero-subtitle">Comprehensive physiotherapy services designed to relieve pain and restore mobility.</p>
        </div>
      </div>

      <section className="doc-services-section">
        <h2 className="section-title">Explore Our Physiotherapy Services</h2>
        <div className="doc-services-grid">
          {services?.map((service, index) => {
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
      </section>

      <DoctorFooter phone={d?.contactPhone} email={d?.contactEmail} brandName={d.aboutTitle || "Physio Care"} description={d.aboutText} address={d.contactAddress} />
    </div>
  );
};

export default DoctorServices;
