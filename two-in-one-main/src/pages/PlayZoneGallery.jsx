import { getImageUrl } from '../utils/imageUrl';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ModernNavbar from '../components/ModernNavbar';
import PlayZoneFooter from '../components/PlayZoneFooter';
import api from '../admin/utils/api';
import '../styles/playzone.css';

const PlayZoneGallery = () => {
  const [settings, setSettings] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-playzone');
    fetchData();
    return () => document.body.classList.remove('theme-playzone');
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, galleryRes] = await Promise.all([
        api.get('/playzone/about'),
        api.get('/playzone/gallery')
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

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem'}}>Loading...</div>;

  const d = settings || {};


  return (
    <div style={{ background: '#fff9e6', minHeight: '100vh' }}>
      <ModernNavbar brandName={d.aboutTitle || "Let's Play Zone"} basePath="/play-zone" />
      
      <section className="page-hero" style={{ height: '300px' }}>
        {d.heroImage && <img src={getImageUrl(d.heroImage)} alt="Gallery Hero" className="page-hero-img" style={{filter: 'brightness(0.6)'}} />}
        <h1 className="page-hero-title">Fun Gallery</h1>
      </section>

      <section className="container content-section">
        <motion.div 
          className="pz-gallery-grid"
          initial="hidden" animate="visible" variants={stagger}
        >
          {gallery.map((item) => (
            <motion.div key={item._id} variants={scaleUp} className="pz-gallery-item">
              <img src={getImageUrl(item.image)} alt={item.altText || 'Gallery Image'} />
              <div className="pz-gallery-item-title">
                {item.altText || 'Gallery Image'}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <PlayZoneFooter phone={d?.contactPhone} email={d?.contactEmail} brandName={d.aboutTitle || "Let's Play Zone"} description={d.aboutText || d.text} address={d.contactAddress} />
    </div>
  );
};

export default PlayZoneGallery;
