import { getImageUrl } from '../utils/imageUrl';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaCheckCircle } from 'react-icons/fa';
import ModernNavbar from '../components/ModernNavbar';
import PlayZoneFooter from '../components/PlayZoneFooter';
import VideoShowcase from '../components/VideoShowcase';
import VideosGallery from '../components/VideosGallery';
import '../styles/playzone.css';
import api from '../admin/utils/api';

const PlayZonePage = () => {
  const [settings, setSettings] = useState(null);
  const [activities, setActivities] = useState([]);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('theme-playzone');
    fetchData();
    return () => document.body.classList.remove('theme-playzone');
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, actRes, servicesRes, galleryRes] = await Promise.all([
        api.get('/playzone/about'),
        api.get('/playzone/activities'),
        api.get('/playzone/services'),
        api.get('/playzone/gallery')
      ]);
      setSettings(settingsRes.data);
      setActivities(actRes.data || []);
      setServices(servicesRes.data || []);
      setGallery(galleryRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSettings({});
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem'}}>Loading...</div>;

  const d = settings || {};


  return (
    <div>
      <ModernNavbar brandName={d.aboutTitle || "Let's Play Zone"} basePath="/play-zone" />

      <section className="pz-hero" style={{ backgroundImage: `url(${getImageUrl(d.heroImage)})` }}>
        <motion.div className="pz-hero-content" initial="hidden" animate="visible" variants={fadeUp}>
          <h1>{d.heroTitle || 'Welcome to Play Zone!'}</h1>
          <p>{d.heroSubtitle}</p>
          <a href="#explore" className="pz-btn">Explore Fun</a>
        </motion.div>
      </section>

      <section id="explore" className="pz-section">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
          <h2 className="pz-section-title">Our Top Activities</h2>
          <p className="pz-section-subtitle">Discover endless joy and challenges designed for all ages!</p>
        </motion.div>

        <motion.div className="pz-activities-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {activities.slice(0, 3).map((act) => (
            <motion.div key={act._id} className="pz-activity-card" variants={fadeUp}>
              <div className="pz-activity-img-wrap">
                <img src={getImageUrl(act.image)} alt={act.title} className="pz-activity-img" />
              </div>
              <div className="pz-activity-content">
                <h3>{act.title}</h3>
                <p>{act.description.substring(0, 100)}...</p>
                <Link to={`/play-zone/activities/${act._id}`} className="card-action">View Activity →
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center" style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link to="/play-zone/activities" className="pz-btn">Explore All Activities</Link>
        </div>
      </section>

      {(services && services.length > 0) && (
        <section className="pz-section pz-services-section">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <h2 className="pz-section-title">Our Premium Services</h2>
            <p className="pz-section-subtitle">Exceptional experiences tailored for you.</p>
          </motion.div>

          <motion.div className="pz-activities-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            {services.slice(0, 3).map((svc) => (
              <motion.div key={svc._id} className="pz-activity-card" variants={fadeUp}>
                <div className="pz-activity-img-wrap">
                  <img src={getImageUrl(svc.image)} alt={svc.title} className="pz-activity-img" />
                </div>
                <div className="pz-activity-content">
                  <h3>{svc.title}</h3>
                  <p>{svc.shortDescription && svc.shortDescription.substring(0, 100)}...</p>
                  <Link to={`/play-zone/services/${svc._id}`} className="card-action">View Services →</Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="text-center" style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link to="/play-zone/services" className="pz-btn">View All Services</Link>
          </div>
        </section>
      )}

      {/* ── Video Showcase Section ── */}
      <VideoShowcase websiteType="playzone" />

      <section className="pz-section pz-features">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="pz-section-title">Why Choose Us?</h2>
        </motion.div>
        <motion.div className="pz-features-grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
          {d.features && d.features.map((feat, index) => (
            <motion.div key={index} className="pz-feature-box" variants={fadeUp}>
              <div className="pz-feature-icon" style={{ fontSize: '2rem', color: '#f59e0b' }}><FaCheckCircle /></div>
              <h4>{feat.title}</h4>
              <p>{feat.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {(gallery && gallery.length > 0) && (
        <section className="pz-section">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
            <h2 className="pz-section-title">Play Zone Gallery</h2>
          </motion.div>
          <div className="pz-gallery-grid">
            {gallery.slice(0, 6).map((item) => (
              <div key={item._id} className="pz-gallery-item">
                <img src={getImageUrl(item.image)} alt={item.altText || 'Gallery Image'} />
                <div className="pz-gallery-item-title">
                  {item.altText || 'Gallery Image'}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/play-zone/gallery" className="pz-btn">View Full Gallery</Link>
          </div>
        </section>
      )}

      {/* ── Videos Gallery Section ── */}
      <VideosGallery websiteType="playzone" />

      <section className="pz-section" style={{ background: 'linear-gradient(to bottom, #fffbf0, #ffe5e5)' }}>
        <motion.div className="pz-contact-container" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
          <h2 className="pz-section-title">Get In Touch</h2>
          <div className="pz-contact-info">
            <div className="pz-contact-item"><FaPhoneAlt className="pz-contact-icon" /><span>{d.contactPhone}</span></div>
            <div className="pz-contact-item"><FaEnvelope className="pz-contact-icon" /><span>{d.contactEmail}</span></div>
            <div className="pz-contact-item"><FaMapMarkerAlt className="pz-contact-icon" /><span>{d.contactAddress}</span></div>
          </div>
        </motion.div>
      </section>

      <PlayZoneFooter phone={d?.contactPhone} email={d?.contactEmail} brandName={d.aboutTitle || "Let's Play Zone"} description={d.aboutText || d.text} address={d.contactAddress} />
    </div>
  );
};

export default PlayZonePage;
