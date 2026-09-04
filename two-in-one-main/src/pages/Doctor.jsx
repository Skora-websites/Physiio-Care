import { 
  ArrowRight, Phone, Mail, MapPin, Clock, CheckCircle, 
  Activity, Heart, Shield 
} from 'lucide-react';
import styles from './Doctor.module.css';

export default function Doctor() {
  return (
    <div className={styles.clinicTheme}>
      
      {/* --- CLINIC'S OWN NAVBAR --- */}
      <nav className={styles.clinicNav}>
        <div className={styles.navTop}>
          <div className={`${styles.container} ${styles.topBarInner}`}>
            <span className={styles.topInfo}><Phone size={14}/> +91 98765 43210</span>
            <span className={styles.topInfo}><Clock size={14}/> Mon - Sat: 9:00 AM - 8:00 PM</span>
          </div>
        </div>
        <div className={`${styles.container} ${styles.mainNav}`}>
          <div className={styles.logo}>
            <h2>MEDCORE <span>CLINIC</span></h2>
          </div>
          <ul className={styles.navLinks}>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#services">Treatments</a></li>
            <li><a href="#team">Our Doctors</a></li>
          </ul>
          <button className={styles.navBtn}>Book Appointment</button>
        </div>
      </nav>

      {/* --- HERO SECTION (RehabMaxx Style) --- */}
      <section id="home" className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.badge}>Welcome to MedCore Physiotherapy</span>
            <h1>Advanced Pain Relief & <br/><span>Rehabilitation Center</span></h1>
            <p>
              Gorakhpur's most trusted clinic for orthopedic, neurological, and sports physiotherapy. 
              We use evidence-based practices to get you back to living a pain-free life.
            </p>
            <div className={styles.heroButtons}>
              <button className={styles.primaryBtn}>Consult Now <ArrowRight size={16}/></button>
              <button className={styles.secondaryBtn}>Explore Services</button>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS / WHY CHOOSE US --- */}
      <section className={styles.statsSection}>
        <div className={`${styles.container} ${styles.statsGrid}`}>
          <div className={styles.statBox}>
            <h3>15+</h3>
            <p>Years of Experience</p>
          </div>
          <div className={styles.statBox}>
            <h3>10,000+</h3>
            <p>Patients Treated</p>
          </div>
          <div className={styles.statBox}>
            <h3>Modern</h3>
            <p>Equipment & Tech</p>
          </div>
          <div className={styles.statBox}>
            <h3>Certified</h3>
            <p>Specialist Doctors</p>
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className={styles.aboutSection}>
        <div className={`${styles.container} ${styles.aboutGrid}`}>
          <div className={styles.aboutImagePlaceholder}>
            <div className={styles.imageOverlay}>
              <Shield size={48} className={styles.overlayIcon} />
              <h4>ISO Certified Care</h4>
            </div>
          </div>
          <div className={styles.aboutText}>
            <span className={styles.sectionSubtitle}>About MedCore Clinic</span>
            <h2 className={styles.sectionTitle}>Your Partner in <span>Recovery & Health</span></h2>
            <p>
              Led by Dr. Santosh Kumar Mishra, MedCore Clinic is dedicated to providing the highest standard of physical therapy. We don't just treat symptoms; we identify the root cause of your pain to provide long-lasting relief.
            </p>
            <ul className={styles.checkList}>
              <li><CheckCircle size={18} className={styles.checkIcon}/> Personalized treatment plans</li>
              <li><CheckCircle size={18} className={styles.checkIcon}/> Non-invasive pain management</li>
              <li><CheckCircle size={18} className={styles.checkIcon}/> State-of-the-art modalities</li>
            </ul>
          </div>
        </div>
      </section>

      {/* --- SERVICES (Treatments) --- */}
      <section id="services" className={styles.servicesSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeaderCenter}>
            <span className={styles.sectionSubtitle}>Our Expertise</span>
            <h2 className={styles.sectionTitle}>Specialized <span>Treatments</span></h2>
            <div className={styles.underline}></div>
          </div>
          
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <Activity size={32} className={styles.serviceIcon} />
              <h3>Orthopedic Physio</h3>
              <p>Relief for back pain, knee osteoarthritis, frozen shoulder, and joint stiffness.</p>
            </div>
            <div className={styles.serviceCard}>
              <Heart size={32} className={styles.serviceIcon} />
              <h3>Neuro Rehabilitation</h3>
              <p>Dedicated recovery pathways for stroke, paralysis, and nerve injuries.</p>
            </div>
            <div className={styles.serviceCard}>
              <Shield size={32} className={styles.serviceIcon} />
              <h3>Sports Injuries</h3>
              <p>Accelerated healing for ACL tears, ligament sprains, and muscle pulls.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- CLINIC'S OWN FOOTER --- */}
      <footer className={styles.clinicFooter}>
        <div className={`${styles.container} ${styles.footerGrid}`}>
          <div className={styles.footerCol}>
            <div className={styles.logo}>
              <h2 style={{color: 'white'}}>MEDCORE <span>CLINIC</span></h2>
            </div>
            <p>Delivering elite physiotherapy and rehabilitation services to restore your mobility and improve your quality of life.</p>
            <div className={styles.socials}>
            <span style={{cursor: 'pointer'}}>Facebook</span> • 
            <span style={{cursor: 'pointer', margin: '0 10px'}}>Instagram</span> • 
            <span style={{cursor: 'pointer'}}>Twitter</span>
            </div>
          </div>
          <div className={styles.footerCol}>
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Treatments</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h3>Contact Us</h3>
            <ul className={styles.contactList}>
              <li><MapPin size={16} /> District Court Area, Gorakhpur, UP</li>
              <li><Phone size={16} /> +91 98765 43210</li>
              <li><Mail size={16} /> info@medcoreclinic.in</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 MedCore Clinic. Architected by Santosh Kumar Mishra. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}