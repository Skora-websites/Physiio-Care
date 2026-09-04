import { getImageUrl } from '../utils/imageUrl';
import React, { useEffect, useState } from 'react';
import ModernNavbar from '../components/ModernNavbar';
import DoctorFooter from '../components/DoctorFooter';
import api from '../admin/utils/api';
import '../styles/doctor.css';

const DoctorGallery = () => {
  const [settings, setSettings] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('theme-doctor');
    fetchData();
    return () => document.body.classList.remove('theme-doctor');
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, galleryRes] = await Promise.all([
        api.get('/about'),
        api.get('/gallery')
      ]);
      setSettings(settingsRes.data);
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
      
      <div className="doc-hero" style={{ minHeight: '40vh', backgroundImage: `url(${d.heroImage ? getImageUrl(d.heroImage) : 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop'})` }}>
        <div className="doc-hero-overlay" style={{ background: 'linear-gradient(90deg, rgba(34, 87, 122, 0.9) 0%, rgba(56, 163, 165, 0.8) 100%)' }}></div>
        <div className="container doc-hero-content" style={{ textAlign: 'center', paddingTop: '4rem' }}>
          <h1 className="doc-hero-title">Our Gallery</h1>
          <p className="doc-hero-subtitle">Take a look at our state-of-the-art facilities and success stories.</p>
        </div>
      </div>

      <section className="doc-services-section" style={{ backgroundColor: 'white' }}>
        <h2 className="section-title">Image Gallery</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {gallery?.map((item) => (
            <div key={item._id} style={{ borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.08)', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}>
              <img src={getImageUrl(item.image)} alt={item.altText} style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }} />
              <div style={{ padding: '20px', background: 'white', textAlign: 'center', fontWeight: '600', color: 'var(--doc-primary-dark)' }}>
                {item.altText}
              </div>
            </div>
          ))}
        </div>
      </section>

      <DoctorFooter phone={d?.contactPhone} email={d?.contactEmail} brandName={d.aboutTitle || "Physio Care"} description={d.aboutText} address={d.contactAddress} />
    </div>
  );
};

export default DoctorGallery;
