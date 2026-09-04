import { getImageUrl } from '../utils/imageUrl';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ModernNavbar from '../components/ModernNavbar';
import PlayZoneFooter from '../components/PlayZoneFooter';
import api from '../admin/utils/api';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/playzone.css';

const PlayZoneServiceDetail = () => {
  const { id } = useParams();
  const [settings, setSettings] = useState(null);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-playzone');
    fetchData();
    return () => document.body.classList.remove('theme-playzone');
  }, [id]);

  const fetchData = async () => {
    try {
      const [settingsRes, serviceRes] = await Promise.all([
        api.get('/playzone/about'),
        api.get(`/playzone/services/${id}`)
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
        <Link to="/play-zone/services">Back to Services</Link>
      </div>
    );
  }

  const d = settings || {};


  return (
    <div style={{ background: '#fff9e6', minHeight: '100vh' }}>
      <ModernNavbar brandName={d.aboutTitle || "Let's Play Zone"} basePath="/play-zone" />
      
      <section className="page-hero" style={{ height: '400px' }}>
        <img src={getImageUrl(service.image)} alt={service.title} className="page-hero-img" style={{filter: 'brightness(0.6)'}} />
        <h1 className="page-hero-title">{service.title}</h1>
      </section>

      <section className="container content-section" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '30px' }}>
          <Link to="/play-zone/services" style={{ color: '#ef4444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
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
              className="pz-btn" 
              style={{ padding: '15px 40px', fontSize: '1.1rem', cursor: 'pointer' }}
            >
              Book Visit
            </button>
          </div>
        </div>
      </section>

      <PlayZoneFooter phone={d?.contactPhone} email={d?.contactEmail} brandName={d.aboutTitle || "Let's Play Zone"} description={d.aboutText || d.text} address={d.contactAddress} />
    </div>
  );
};

export default PlayZoneServiceDetail;
