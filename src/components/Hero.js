import { stats } from '../data/ads';

export default function Hero({ onExplore }) {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      padding: '72px 0 64px',
      background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 70%)',
    }}>
      {/* Decorative grid */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '60px 60px', opacity: 0.35,
      }} />

      {/* Glowing orb */}
      <div style={{
        position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', textAlign: 'center' }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', borderRadius: 999,
          background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.3)',
          fontSize: 13, fontWeight: 500, color: 'var(--accent)',
          marginBottom: 28, animation: 'fadeUp 0.5s ease both',
        }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
          Pakistan's #1 Premium Classifieds Platform
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(36px, 6vw, 68px)', lineHeight: 1.08,
          letterSpacing: '-2px', marginBottom: 20,
          animation: 'fadeUp 0.5s 0.1s ease both', opacity: 0,
          animationFillMode: 'both',
        }}>
          Buy. Sell. <span style={{ color: 'var(--accent)', position: 'relative' }}>Connect.</span>
          <br />
          <span style={{ color: 'var(--text2)', fontSize: '0.65em', fontWeight: 600, letterSpacing: '-1px' }}>
            All in One Place.
          </span>
        </h1>

        <p style={{
          color: 'var(--text2)', fontSize: 18, maxWidth: 520, margin: '0 auto 40px',
          animation: 'fadeUp 0.5s 0.2s ease both', opacity: 0, animationFillMode: 'both',
        }}>
          Discover thousands of verified listings across Pakistan — from electronics and vehicles to property and services.
        </p>

        <div style={{
          display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
          animation: 'fadeUp 0.5s 0.3s ease both', opacity: 0, animationFillMode: 'both',
        }}>
          <button
            onClick={onExplore}
            style={{
              padding: '14px 32px', borderRadius: 999,
              background: 'var(--accent)', color: 'white',
              fontWeight: 700, fontSize: 16,
              boxShadow: '0 0 30px rgba(249,115,22,0.35)',
              transition: 'var(--transition)',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
          >
            Explore Listings →
          </button>
          <button
            style={{
              padding: '14px 32px', borderRadius: 999,
              background: 'var(--bg3)', color: 'var(--text)',
              fontWeight: 600, fontSize: 16,
              border: '1px solid var(--border2)',
              transition: 'var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border2)'}
          >
            Post a Free Ad
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: 0, justifyContent: 'center', marginTop: 64,
          borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)',
          background: 'var(--bg2)',
          animation: 'fadeUp 0.5s 0.4s ease both', opacity: 0, animationFillMode: 'both',
          flexWrap: 'wrap',
        }}>
          {stats.map((stat, i) => (
            <div key={i} style={{
              flex: '1 1 140px', padding: '20px 24px',
              borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: 'var(--accent)' }}>
                {stat.value}
              </div>
              <div style={{ color: 'var(--text3)', fontSize: 13, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
