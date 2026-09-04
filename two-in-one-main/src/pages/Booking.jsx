import { Calendar, User, Phone, Mail, Activity } from 'lucide-react';
import styles from './Booking.module.css';

export default function Booking() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Protocol Initiated: Your appointment request has been secured.");
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Background Engine */}
      <div className="clinical-wallpaper">
        <div className="ambient-purple"></div>
      </div>

      <main className={styles.container}>
        {/* Left Side: Information */}
        <div className={styles.infoPanel}>
          <div className={styles.badge}>Secure Portal</div>
          <h1 className={styles.title}>Initialize Your <br/><span className={styles.accent}>Recovery Protocol</span></h1>
          <p className={styles.subtitle}>
            Enter your biometrics and preferred scheduling window. Our clinical triage team will secure your assessment slot within 24 hours.
          </p>
          
          <div className={styles.featureList}>
            <div className={styles.feature}><Activity size={16} className={styles.icon}/> End-to-end encrypted medical data</div>
            <div className={styles.feature}><Activity size={16} className={styles.icon}/> Direct specialist assignment</div>
            <div className={styles.feature}><Activity size={16} className={styles.icon}/> Priority scheduling for critical neuro/ortho</div>
          </div>
        </div>

        {/* Right Side: The Glass Form */}
        <div className={styles.formWrapper}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formHeader}>
              <h3>Patient Intake</h3>
              <p>Secure Clinical Assessment Request</p>
            </div>

            <div className={styles.inputGroup}>
              <User className={styles.inputIcon} size={16} />
              <input type="text" placeholder="Full Legal Name" required />
            </div>

            <div className={styles.row}>
              <div className={styles.inputGroup}>
                <Phone className={styles.inputIcon} size={16} />
                <input type="tel" placeholder="Contact Number" required />
              </div>
              <div className={styles.inputGroup}>
                <Mail className={styles.inputIcon} size={16} />
                <input type="email" placeholder="Email Address" required />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <Activity className={styles.inputIcon} size={16} />
              <select required className={styles.select}>
                <option value="" disabled selected>Select Recovery Protocol...</option>
                <option value="sports">Sports Physiotherapy</option>
                <option value="neuro">Neurological Rehab</option>
                <option value="ortho">Orthopedic Care</option>
                <option value="consult">General Clinical Consult</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <Calendar className={styles.inputIcon} size={16} />
              <input type="date" required className={styles.dateInput} />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Submit Assessment Request
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}