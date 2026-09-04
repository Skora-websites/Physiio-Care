import { getImageUrl } from '../utils/imageUrl';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ModernNavbar from '../components/ModernNavbar';
import DoctorFooter from '../components/DoctorFooter';
import api from '../admin/utils/api';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const DoctorServiceDetail = () => {
  const { id } = useParams();
  const [settings, setSettings] = useState(null);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-doctor');
    fetchData();
    return () => document.body.classList.remove('theme-doctor');
  }, [id]);

  const fetchData = async () => {
    try {
      const [settingsRes, serviceRes] = await Promise.all([
        api.get('/about'),
        api.get(`/services/${id}`)
      ]);
      setSettings(settingsRes.data);
      setService(serviceRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem'}}>Loading...</div>;

  if (!service) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Service Not Found</h2>
        <Link to="/doctor/services">Back to Services</Link>
      </div>
    );
  }

  const d = settings || {};

  return (
    <div style={{ background: 'var(--background-light)', minHeight: '100vh' }}>
      <ModernNavbar brandName={d.aboutTitle || "Physio Care"} basePath="/doctor" />
      
      <section className="page-hero" style={{ height: '400px' }}>
        <img src={getImageUrl(service.image)} alt={service.title} className="page-hero-img" style={{filter: 'brightness(0.6)'}} />
        <h1 className="page-hero-title">{service.title}</h1>
      </section>

      <section className="container content-section" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '30px' }}>
          <Link to="/doctor/services" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
            <FaArrowLeft /> Back to Services
          </Link>
        </div>

        <div style={{ background: 'white', padding: '50px', borderRadius: '16px', boxShadow: 'var(--shadow)' }}>
          <h2 style={{ marginBottom: '20px', color: 'var(--text-dark)', fontSize: '2rem' }}>Overview</h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#475569', marginBottom: '40px', whiteSpace: 'pre-line' }}>
            {service.mainContent}
          </p>

          <div className="text-center">
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('openBookingModal'))}
              style={{ padding: '15px 40px', fontSize: '1.1rem', fontWeight: '600', color: 'white', background: 'var(--primary-color)', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.3s' }}
            >
              Book an Appointment
            </button>
          </div>
        </div>
      </section>

      <DoctorFooter phone={d?.contactPhone} email={d?.contactEmail} brandName={d.aboutTitle || "Physio Care"} description={d.aboutText} address={d.contactAddress} />
    </div>
  );
};

export default DoctorServiceDetail;
