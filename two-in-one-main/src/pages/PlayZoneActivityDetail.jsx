import { getImageUrl } from '../utils/imageUrl';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ModernNavbar from '../components/ModernNavbar';
import PlayZoneFooter from '../components/PlayZoneFooter';
import api from '../admin/utils/api';
import { FaArrowLeft } from 'react-icons/fa';
import '../styles/playzone.css';

const PlayZoneActivityDetail = () => {
  const { id } = useParams();
  const [settings, setSettings] = useState(null);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('theme-playzone');
    fetchData();
    return () => document.body.classList.remove('theme-playzone');
  }, [id]);

  const fetchData = async () => {
    try {
      const [settingsRes, activityRes] = await Promise.all([
        api.get('/playzone/about'),
        api.get(`/playzone/activities/${id}`)
      ]);
      setSettings(settingsRes.data);
      setActivity(activityRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem'}}>Loading...</div>;

  if (!activity) {
    return (
      <div style={{ textAlign: 'center', padding: '100px' }}>
        <h2>Activity Not Found! 😢</h2>
        <Link to="/play-zone/activities">Back to Fun Activities</Link>
      </div>
    );
  }

  const d = settings || {};


  return (
    <div style={{ background: '#fff9e6', minHeight: '100vh' }}>
      <ModernNavbar brandName={d.aboutTitle || "Let's Play Zone"} basePath="/play-zone" />
      
      <section className="page-hero" style={{ height: '400px' }}>
        <img src={getImageUrl(activity.image)} alt={activity.title} className="page-hero-img" style={{filter: 'brightness(0.6)'}} />
        <motion.h1 
          className="page-hero-title"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {activity.title}
        </motion.h1>
      </section>

      <section className="container content-section" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '30px' }}>
          <Link to="/play-zone/activities" style={{ color: 'var(--primary-color)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            <FaArrowLeft /> Back to Activities
          </Link>
        </div>

        <motion.div 
          style={{ background: 'white', padding: 'clamp(20px, 5vw, 50px)', borderRadius: '32px', boxShadow: '0 15px 40px rgba(245, 158, 11, 0.15)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 style={{ marginBottom: '30px', color: 'var(--text-dark)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: '800' }}>More Details!</h2>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#555', marginBottom: '40px', whiteSpace: 'pre-line' }}>
            {activity.description}
          </p>

          <div className="text-center">
            <motion.button 
              onClick={() => window.dispatchEvent(new CustomEvent('openBookingModal'))}
              className="pz-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book This Activity Now! 🚀
            </motion.button>
          </div>
        </motion.div>
      </section>

      <PlayZoneFooter phone={d?.contactPhone} email={d?.contactEmail} brandName={d.aboutTitle || "Let's Play Zone"} description={d.aboutText || d.text} address={d.contactAddress} />
    </div>
  );
};

export default PlayZoneActivityDetail;
