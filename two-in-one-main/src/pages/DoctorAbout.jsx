import { getImageUrl } from '../utils/imageUrl';
import React, { useEffect, useState } from 'react';
import ModernNavbar from '../components/ModernNavbar';
import DoctorFooter from '../components/DoctorFooter';
import api from '../admin/utils/api';

const DoctorAbout = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-doctor');
    fetchData();
    return () => document.body.classList.remove('theme-doctor');
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/about');
      setSettings(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading...</div>;
  if (!settings) return <div>Failed to load data.</div>;

  const d = settings;


  return (
    <div style={{ background: 'var(--background-light)', minHeight: '100vh' }}>
      <ModernNavbar brandName={d.aboutTitle || "Physio Care"} basePath="/doctor" />

      <section className="page-hero" style={{ height: '300px' }}>
        {d.aboutImage && <img src={getImageUrl(d.aboutImage)} alt="About Hero" className="page-hero-img" style={{ filter: 'brightness(0.6)' }} />}
        <h1 className="page-hero-title">About Us</h1>
      </section>

      <section className="container content-section" style={{ maxWidth: '900px' }}>
        <h2 className="section-title text-center">{d.aboutTitle}</h2>
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: 'var(--shadow)', lineHeight: '1.8', color: '#475569', fontSize: '1.1rem' }}>
          <p>{d.aboutText}</p>
          <p style={{ marginTop: '20px' }}>We have dedicated our lives to helping people move freely and without pain. Our state-of-the-art clinic is equipped with modern rehabilitation tools, and our staff brings decades of clinical experience. Your health is our utmost priority.</p>
        </div>
      </section>

      <DoctorFooter phone={d?.contactPhone} email={d?.contactEmail} brandName={d.aboutTitle || "Physio Care"} description={d.aboutText} address={d.contactAddress} />
    </div>
  );
};

export default DoctorAbout;
