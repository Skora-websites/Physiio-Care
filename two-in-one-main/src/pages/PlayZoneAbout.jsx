import { getImageUrl } from '../utils/imageUrl';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ModernNavbar from '../components/ModernNavbar';
import PlayZoneFooter from '../components/PlayZoneFooter';
import api from '../admin/utils/api';
import '../styles/playzone.css';

const PlayZoneAbout = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-playzone');
    fetchData();
    return () => document.body.classList.remove('theme-playzone');
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get('/playzone/about');
      setSettings(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSettings({});
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem'}}>Loading...</div>;

  const d = settings || {};


  return (
    <div style={{ background: '#fff9e6', minHeight: '100vh' }}>
      <ModernNavbar brandName={d.aboutTitle || "Let's Play Zone"} basePath="/play-zone" />
      
      <section className="page-hero" style={{ height: '300px' }}>
        {d.aboutImage && <img src={getImageUrl(d.aboutImage)} alt="About PlayZone" className="page-hero-img" style={{filter: 'brightness(0.6)'}} />}
        <h1 className="page-hero-title">About Let's Play Zone</h1>
      </section>

      <section className="container content-section" style={{ maxWidth: '900px' }}>
        <motion.div 
          className="pz-about-content pz-card" 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          style={{ background: 'white', padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.15)', textAlign: 'center' }}
        >
          <h2 className="pz-section-title">{d.aboutTitle}</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#444' }}>{d.aboutText || d.text}</p>
        </motion.div>
      </section>

      <PlayZoneFooter phone={d?.contactPhone} email={d?.contactEmail} brandName={d.aboutTitle || "Let's Play Zone"} description={d.aboutText || d.text} address={d.contactAddress} />
    </div>
  );
};

export default PlayZoneAbout;
