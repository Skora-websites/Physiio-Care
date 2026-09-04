import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

/* ── Inline SVG icons ─────────────────────────────── */
function DoctorIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.cardIcon}>
      {/* Stethoscope */}
      <circle cx="40" cy="40" r="38" fill="var(--clr-accent1-l)" />
      <path d="M28 24c0-2.2 1.8-4 4-4h16c2.2 0 4 1.8 4 4v14c0 8.8-7.2 16-16 16s-8-7.2-8-16V24z"
        fill="var(--clr-accent1)" opacity="0.2"/>
      <path d="M32 20h16v14c0 6.6-5.4 12-12 12s-4-5.4-4-12V20z"
        fill="none" stroke="var(--clr-accent1)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M36 20v-4M44 20v-4" stroke="var(--clr-accent1)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M40 46v8M40 54c0 3.3 2.7 6 6 6s6-2.7 6-6-2.7-6-6-6"
        stroke="var(--clr-accent1)" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="46" cy="60" r="3" fill="var(--clr-accent1)" />
      {/* Cross */}
      <rect x="36" y="30" width="8" height="2.5" rx="1.25" fill="var(--clr-accent1)"/>
      <rect x="38.75" y="27.5" width="2.5" height="8" rx="1.25" fill="var(--clr-accent1)"/>
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.cardIcon}>
      <circle cx="40" cy="40" r="38" fill="var(--clr-accent2-l)" />
      {/* Game controller */}
      <rect x="18" y="30" width="44" height="26" rx="13" fill="var(--clr-accent2)" opacity="0.15"/>
      <rect x="18" y="30" width="44" height="26" rx="13"
        stroke="var(--clr-accent2)" strokeWidth="2.5"/>
      {/* D-pad left side */}
      <rect x="26" y="41" width="10" height="3" rx="1.5" fill="var(--clr-accent2)"/>
      <rect x="29.5" y="37.5" width="3" height="10" rx="1.5" fill="var(--clr-accent2)"/>
      {/* Buttons right side */}
      <circle cx="50" cy="40" r="2.5" fill="var(--clr-accent2)" opacity="0.5"/>
      <circle cx="56" cy="44" r="2.5" fill="var(--clr-accent2)"/>
      <circle cx="50" cy="48" r="2.5" fill="var(--clr-accent2)" opacity="0.7"/>
      <circle cx="44" cy="44" r="2.5" fill="var(--clr-accent2)" opacity="0.5"/>
      {/* Joystick bumps */}
      <circle cx="30" cy="25" r="5" fill="var(--clr-accent2)" opacity="0.2" stroke="var(--clr-accent2)" strokeWidth="2"/>
      <circle cx="50" cy="25" r="5" fill="var(--clr-accent2)" opacity="0.2" stroke="var(--clr-accent2)" strokeWidth="2"/>
    </svg>
  )
}

/* ── Card component ───────────────────────────────── */
function PortalCard({ icon, title, subtitle, badge, accent, accentLight, onClick }) {
  return (
    <article
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      style={{ '--accent': accent, '--accent-l': accentLight }}
    >
      <div className={styles.cardBadge}>{badge}</div>
      <div className={styles.iconWrap}>{icon}</div>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardSub}>{subtitle}</p>
      <span className={styles.cardCta}>
        Explore
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </article>
  )
}

/* ── Page ─────────────────────────────────────────── */
/* ── Page ─────────────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate()

  return (
    <>
      {/* --- LIVE WALLPAPER BACKGROUND (Zero Dependencies) --- */}
      <div className="live-wallpaper">
        {/* Generates 30 random floating particles */}
        {[...Array(30)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}vw`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              animationDuration: `${Math.random() * 15 + 10}s`,
              animationDelay: `-${Math.random() * 15}s` 
            }}
          />
        ))}
        
        {/* Massive Ambient Light Orbs for Cinematic Depth */}
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 60%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 60%)', filter: 'blur(80px)' }} />
      </div>

      {/* --- ORIGINAL MAIN CONTENT --- */}
      <main className={styles.main}>
        {/* Hero text */}
        <section className={`${styles.hero} container`}>
          <span className={styles.eyebrow}>Welcome to My Platform</span>
          <h1 className={styles.heading}>
            Two worlds,<br />
            <em>one destination.</em>
          </h1>
          <p className={styles.subheading}>
            Access expert healthcare or dive into our interactive play zone —
            everything you need, right here.
          </p>
        </section>

        {/* Cards grid */}
        <section className={`${styles.grid} container`}>
          <PortalCard
            icon={<DoctorIcon />}
            title="Doctor"
            subtitle="Connect with certified healthcare professionals. Book consultations, get prescriptions, and manage your wellness journey."
            badge="Healthcare"
            accent="var(--clr-accent1)"
            accentLight="var(--clr-accent1-l)"
            onClick={() => navigate("/doctor")}
          />
          <PortalCard
            icon={<PlayIcon />}
            title="Let's Play Zone"
            subtitle="Enter an immersive world of games, challenges, and interactive experiences designed for all ages."
            badge="Entertainment"
            accent="var(--clr-accent2)"
            accentLight="var(--clr-accent2-l)"
            onClick={() => navigate('/play-zone')}
          />
        </section>
      </main>
    </>
  )
}