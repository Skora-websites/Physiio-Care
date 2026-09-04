import { getImageUrl } from '../utils/imageUrl';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ModernNavbar from '../components/ModernNavbar';
import PlayZoneFooter from '../components/PlayZoneFooter';
import api from '../admin/utils/api';
import '../styles/playzone.css';

const PlayZoneServices = () => {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-playzone');
    fetchData();
    return () => document.body.classList.remove('theme-playzone');
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, servicesRes] = await Promise.all([
        api.get('/playzone/about'),
        api.get('/playzone/services')
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

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem'}}>Loading...</div>;

  const d = settings || {};


  return (
    <div style={{ background: '#fff9e6', minHeight: '100vh' }}>
      <ModernNavbar brandName={d.aboutTitle || "Let's Play Zone"} basePath="/play-zone" />
      
      <section className="page-hero" style={{ height: '300px' }}>
        {d.heroImage && <img src={getImageUrl(d.heroImage)} alt="Services Hero" className="page-hero-img" style={{filter: 'brightness(0.6)'}} />}
        <h1 className="page-hero-title">Our Services</h1>
      </section>

      <section className="container content-section">
        <p className="text-center" style={{ marginBottom: '50px', fontSize: '1.2rem' }}>
          Explore our amazing play zone services!
        </p>
        
        <motion.div className="pz-activities-grid" initial="hidden" animate="visible" variants={stagger}>
          {services.map((svc) => (
            <motion.div key={svc._id} className="pz-activity-card" variants={fadeUp}>
              <div className="pz-activity-img-wrap">
                <img src={getImageUrl(svc.image)} alt={svc.title} className="pz-activity-img" />
              </div>
              <div className="pz-activity-content">
                <h3>{svc.title}</h3>
                <p>{svc.shortDescription && svc.shortDescription.substring(0, 100)}...</p>
                <Link to={`/play-zone/services/${svc._id}`} className="card-action">View Service</Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <PlayZoneFooter phone={d?.contactPhone} email={d?.contactEmail} brandName={d.aboutTitle || "Let's Play Zone"} description={d.aboutText || d.text} address={d.contactAddress} />
    </div>
  );
};

export default PlayZoneServices;
