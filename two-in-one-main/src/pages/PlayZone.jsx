import { useNavigate } from 'react-router-dom'
import styles from './Inner.module.css'

const features = [
  { icon: '🎮', title: 'Arcade Games', desc: 'Classic and modern games for quick sessions of fun.' },
  { icon: '🧩', title: 'Puzzles & Quizzes', desc: 'Sharpen your mind with daily brain teasers and trivia.' },
  { icon: '🏆', title: 'Leaderboards', desc: 'Compete globally and climb the ranks.' },
  { icon: '🎭', title: 'Multiplayer', desc: 'Play live with friends or meet new challengers worldwide.' },
]

export default function PlayZone() {
  const navigate = useNavigate()
  return (
    <main className={styles.page}>
      <div className={`${styles.hero} container`} style={{ '--accent': 'var(--clr-accent2)', '--accent-l': 'var(--clr-accent2-l)' }}>
        <button className={styles.back} onClick={() => navigate('/')}>
          ← Back home
        </button>
        <span className={styles.badge}>Entertainment Hub</span>
        <h1 className={styles.heading}>
          Endless fun,<br /><em>level up.</em>
        </h1>
        <p className={styles.sub}>
          Your go-to destination for games, challenges, and interactive
          experiences that entertain and engage every age.
        </p>
      </div>

      <div className={`${styles.grid} container`}>
        {features.map(f => (
          <div key={f.title} className={styles.featureCard} style={{ '--accent': 'var(--clr-accent2)', '--accent-l': 'var(--clr-accent2-l)' }}>
            <span className={styles.featureIcon}>{f.icon}</span>
            <h3 className={styles.featureTitle}>{f.title}</h3>
            <p className={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className={`${styles.cta} container`}>
        <a
          href="https://www.poki.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
          style={{ background: 'var(--clr-accent2)' }}
        >
          Start Playing Now →
        </a>
      </div>
    </main>
  )
}
