import React, { useEffect, useRef } from 'react';
import { Camera, Search, ShieldCheck, Activity, ArrowRight, Zap } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: 'home' | 'analyze' | 'search') => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

      :root {
        --ink: #0a0a0f;
        --paper: #f5f3ef;
        --cream: #ede9e1;
        --lime: #c8f135;
        --lime-dark: #a8cc1a;
        --slate-mid: #6b7280;
        --card-bg: #ffffff;
      }

      .home-root {
        font-family: 'DM Sans', sans-serif;
        background: var(--paper);
        min-height: 100vh;
        color: var(--ink);
        overflow-x: hidden;
      }

      /* ─── TICKER ─── */
      .ticker-wrap {
        background: var(--ink);
        padding: 10px 0;
        overflow: hidden;
        white-space: nowrap;
      }
      .ticker-inner {
        display: inline-flex;
        animation: ticker 22s linear infinite;
      }
      .ticker-item {
        font-family: 'Syne', sans-serif;
        font-size: 12px;
        letter-spacing: .14em;
        text-transform: uppercase;
        color: var(--lime);
        padding: 0 48px;
      }
      .ticker-dot {
        color: rgba(255,255,255,.25);
        margin: 0 -32px;
      }
      @keyframes ticker {
        from { transform: translateX(0); }
        to   { transform: translateX(-50%); }
      }

      /* ─── HERO ─── */
      .hero-section {
        position: relative;
        padding: 80px 24px 96px;
        max-width: 1200px;
        margin: 0 auto;
      }

      .hero-label {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: var(--ink);
        color: var(--lime);
        font-family: 'Syne', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .16em;
        text-transform: uppercase;
        padding: 6px 14px;
        border-radius: 4px;
        margin-bottom: 32px;
      }
      .hero-label-dot {
        width: 6px; height: 6px;
        border-radius: 50%;
        background: var(--lime);
        animation: blink 1.4s ease-in-out infinite;
      }
      @keyframes blink {
        0%,100% { opacity: 1; }
        50% { opacity: .2; }
      }

      .hero-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 48px;
        align-items: center;
      }
      @media (max-width: 768px) {
        .hero-layout { grid-template-columns: 1fr; }
        .hero-visual { display: none; }
      }

      .hero-h1 {
        font-family: 'Syne', sans-serif;
        font-size: clamp(48px, 6vw, 80px);
        font-weight: 800;
        line-height: .95;
        letter-spacing: -.03em;
        margin-bottom: 24px;
      }
      .hero-h1 em {
        font-style: italic;
        font-weight: 400;
        color: var(--slate-mid);
      }
      .hero-h1 .highlight {
        display: inline-block;
        background: var(--lime);
        color: var(--ink);
        padding: 0 8px;
        border-radius: 6px;
        transform: rotate(-1.5deg);
        line-height: 1.05;
      }

      .hero-body {
        font-size: 17px;
        line-height: 1.7;
        color: #4b5563;
        margin-bottom: 40px;
        max-width: 480px;
        font-weight: 300;
      }

      .cta-group {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: var(--ink);
        color: #fff;
        font-family: 'Syne', sans-serif;
        font-weight: 600;
        font-size: 15px;
        padding: 14px 24px;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        transition: transform .18s, background .18s;
      }
      .btn-primary:hover {
        background: #1e1e2e;
        transform: translateY(-2px);
      }
      .btn-primary .arrow {
        background: var(--lime);
        color: var(--ink);
        border-radius: 6px;
        padding: 4px;
        display: flex;
        transition: transform .18s;
      }
      .btn-primary:hover .arrow { transform: translate(2px,-2px); }

      .btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: transparent;
        color: var(--ink);
        font-family: 'Syne', sans-serif;
        font-weight: 600;
        font-size: 15px;
        padding: 14px 24px;
        border-radius: 10px;
        border: 2px solid var(--ink);
        cursor: pointer;
        transition: background .18s, transform .18s;
      }
      .btn-secondary:hover {
        background: var(--cream);
        transform: translateY(-2px);
      }

      /* ─── HERO VISUAL ─── */
      .hero-visual {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .pill-card {
        background: var(--ink);
        border-radius: 24px;
        padding: 32px;
        width: 280px;
        box-shadow: 24px 24px 0 var(--lime);
        position: relative;
        z-index: 1;
      }
      .pill-card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
      }
      .pill-card-icon {
        background: var(--lime);
        border-radius: 10px;
        padding: 10px;
        display: flex;
      }
      .pill-card-status {
        font-family: 'Syne', sans-serif;
        font-size: 10px;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: var(--lime);
        opacity: .7;
      }
      .pill-card-name {
        font-family: 'Syne', sans-serif;
        font-size: 22px;
        font-weight: 700;
        color: #fff;
        margin-bottom: 4px;
      }
      .pill-card-dose {
        font-size: 13px;
        color: rgba(255,255,255,.5);
        margin-bottom: 20px;
      }
      .pill-card-bar {
        background: rgba(255,255,255,.1);
        border-radius: 99px;
        height: 6px;
        margin-bottom: 8px;
        overflow: hidden;
      }
      .pill-card-fill {
        background: var(--lime);
        height: 100%;
        border-radius: 99px;
        animation: fillBar 2.4s ease-in-out infinite alternate;
      }
      @keyframes fillBar {
        from { width: 45%; }
        to   { width: 82%; }
      }
      .pill-card-meta {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
      }
      .pill-meta-item { color: rgba(255,255,255,.45); font-size: 12px; }
      .pill-meta-val  { color: #fff; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600; margin-top: 2px; }

      .float-badge {
        position: absolute;
        right: -24px;
        top: -20px;
        background: #fff;
        border-radius: 14px;
        padding: 12px 16px;
        box-shadow: 0 8px 24px rgba(0,0,0,.12);
        display: flex;
        align-items: center;
        gap: 10px;
        animation: floatY 3s ease-in-out infinite;
        z-index: 2;
      }
      .float-badge-icon { background: #ecfdf5; border-radius: 8px; padding: 8px; }
      .float-badge-text { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; }
      .float-badge-sub  { font-size: 11px; color: var(--slate-mid); }
      @keyframes floatY {
        0%,100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }

      /* ─── DIVIDER ─── */
      .section-divider {
        border: none;
        border-top: 2px solid var(--cream);
        margin: 0;
      }

      /* ─── STATS BAR ─── */
      .stats-bar {
        background: var(--ink);
        padding: 40px 24px;
      }
      .stats-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1px;
        background: rgba(255,255,255,.08);
      }
      .stat-cell {
        background: var(--ink);
        padding: 32px 40px;
        text-align: center;
      }
      .stat-num {
        font-family: 'Syne', sans-serif;
        font-size: 48px;
        font-weight: 800;
        color: var(--lime);
        line-height: 1;
        margin-bottom: 6px;
      }
      .stat-label {
        font-size: 13px;
        color: rgba(255,255,255,.5);
        letter-spacing: .04em;
      }

      /* ─── FEATURES ─── */
      .features-section {
        padding: 96px 24px;
        max-width: 1200px;
        margin: 0 auto;
      }
      .section-eyebrow {
        font-family: 'Syne', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .18em;
        text-transform: uppercase;
        color: var(--slate-mid);
        margin-bottom: 12px;
      }
      .section-title {
        font-family: 'Syne', sans-serif;
        font-size: clamp(32px, 4vw, 52px);
        font-weight: 800;
        line-height: 1;
        letter-spacing: -.03em;
        margin-bottom: 64px;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2px;
        background: var(--cream);
        border: 2px solid var(--ink);
        border-radius: 16px;
        overflow: hidden;
      }
      @media (max-width: 768px) {
        .features-grid { grid-template-columns: 1fr; }
        .stats-inner { grid-template-columns: 1fr; }
      }

      .feature-cell {
        background: var(--paper);
        padding: 48px 36px;
        transition: background .2s;
        cursor: default;
        position: relative;
        overflow: hidden;
      }
      .feature-cell::before {
        content: '';
        position: absolute;
        inset: 0;
        background: var(--lime);
        transform: translateY(100%);
        transition: transform .32s cubic-bezier(.22,.68,0,1.2);
        z-index: 0;
      }
      .feature-cell:hover::before { transform: translateY(0); }
      .feature-cell > * { position: relative; z-index: 1; }

      .feature-num {
        font-family: 'Syne', sans-serif;
        font-size: 11px;
        letter-spacing: .16em;
        text-transform: uppercase;
        color: rgba(0,0,0,.3);
        margin-bottom: 32px;
      }
      .feature-icon-wrap {
        width: 52px; height: 52px;
        border: 2px solid var(--ink);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        transition: background .2s;
        background: #fff;
      }
      .feature-cell:hover .feature-icon-wrap {
        background: var(--ink);
        color: var(--lime);
      }
      .feature-cell:hover .feature-icon-wrap svg { stroke: var(--lime); }
      .feature-h3 {
        font-family: 'Syne', sans-serif;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 12px;
        color: var(--ink);
      }
      .feature-p {
        font-size: 15px;
        line-height: 1.65;
        color: #4b5563;
        font-weight: 300;
      }

      /* ─── CTA STRIP ─── */
      .cta-strip {
        background: var(--lime);
        padding: 80px 24px;
        text-align: center;
      }
      .cta-strip-title {
        font-family: 'Syne', sans-serif;
        font-size: clamp(36px, 5vw, 64px);
        font-weight: 800;
        letter-spacing: -.03em;
        color: var(--ink);
        margin-bottom: 32px;
        line-height: 1;
      }
      .cta-strip-title em {
        font-style: italic;
        font-weight: 400;
      }
      .btn-dark {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: var(--ink);
        color: #fff;
        font-family: 'Syne', sans-serif;
        font-weight: 700;
        font-size: 16px;
        padding: 16px 32px;
        border-radius: 12px;
        border: none;
        cursor: pointer;
        transition: transform .18s, opacity .18s;
      }
      .btn-dark:hover { transform: translateY(-3px); opacity: .9; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="home-root">
      {/* Ticker */}
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="ticker-item">Visual Pill ID</span>
              <span className="ticker-item ticker-dot">✦</span>
              <span className="ticker-item">Personalized Dosage</span>
              <span className="ticker-item ticker-dot">✦</span>
              <span className="ticker-item">Drug Interactions</span>
              <span className="ticker-item ticker-dot">✦</span>
              <span className="ticker-item">10,000+ Medications</span>
              <span className="ticker-item ticker-dot">✦</span>
              <span className="ticker-item">AI-Powered Safety</span>
              <span className="ticker-item ticker-dot">✦</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Hero */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-label">
          <span className="hero-label-dot" />
          Powered by Team AlphaWell
        </div>

        <div className="hero-layout">
          <div>
            <h1 className="hero-h1">
              Your <em>personal</em><br />
              <span className="highlight">AI</span><br />
              Pharmacist.
            </h1>
            <p className="hero-body">
              Snap a photo of any pill, bottle, or blister pack and get instant identification, tailored dosage guidelines, and interaction checks — all in one place.
            </p>
            <div className="cta-group">
              <button className="btn-primary" onClick={() => onNavigate('analyze')}>
                <Camera size={17} />
                Identify via Image
                <span className="arrow"><ArrowRight size={14} /></span>
              </button>
              <button className="btn-secondary" onClick={() => onNavigate('search')}>
                <Search size={17} />
                Search Database
              </button>
            </div>
          </div>

          {/* Visual Card */}
          <div className="hero-visual">
            <div className="pill-card">
              <div className="pill-card-header">
                <div className="pill-card-icon"><Camera size={20} color="#0a0a0f" /></div>
                <span className="pill-card-status">● Analyzing…</span>
              </div>
              <div className="pill-card-name">Amoxicillin</div>
              <div className="pill-card-dose">500 mg · Capsule · Oral</div>
              <div className="pill-card-bar"><div className="pill-card-fill" /></div>
              <div style={{fontSize:11,color:'rgba(255,255,255,.35)',marginBottom:4}}>Confidence</div>
              <div className="pill-card-meta">
                <div>
                  <div className="pill-meta-item">Class</div>
                  <div className="pill-meta-val">Antibiotic</div>
                </div>
                <div>
                  <div className="pill-meta-item">Interval</div>
                  <div className="pill-meta-val">8 hrs</div>
                </div>
                <div>
                  <div className="pill-meta-item">Risk</div>
                  <div className="pill-meta-val">Low</div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="float-badge">
              <div className="float-badge-icon"><ShieldCheck size={18} color="#059669" /></div>
              <div>
                <div className="float-badge-text">Safe to take</div>
                <div className="float-badge-sub">No conflicts detected</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Stats */}
      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat-cell">
            <div className="stat-num">10K+</div>
            <div className="stat-label">Medications in database</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">0.8s</div>
            <div className="stat-label">Average identification time</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">98%</div>
            <div className="stat-label">Identification accuracy</div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="features-section">
        <div className="section-eyebrow">What we offer</div>
        <div className="section-title">Everything you<br />need to stay safe.</div>

        <div className="features-grid">
          <div className="feature-cell">
            <div className="feature-num">01</div>
            <div className="feature-icon-wrap">
              <Camera size={22} />
            </div>
            <h3 className="feature-h3">Visual Identification</h3>
            <p className="feature-p">
              Upload photos of pills, blisters, or bottles. Our computer vision model identifies drug details with near-perfect precision.
            </p>
          </div>

          <div className="feature-cell">
            <div className="feature-num">02</div>
            <div className="feature-icon-wrap">
              <Activity size={22} />
            </div>
            <h3 className="feature-h3">Personalized Dosage</h3>
            <p className="feature-p">
              Input your profile to receive tailored dosage recommendations and condition-specific warnings you can trust.
            </p>
          </div>

          <div className="feature-cell">
            <div className="feature-num">03</div>
            <div className="feature-icon-wrap">
              <ShieldCheck size={22} />
            </div>
            <h3 className="feature-h3">Safety First</h3>
            <p className="feature-p">
              Comprehensive breakdown of side effects, drug interactions, and contraindications — so you never take a risk you don't know about.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <div className="cta-strip">
        <div className="cta-strip-title">
          Ready to identify<br /><em>your medication?</em>
        </div>
        <button className="btn-dark" onClick={() => onNavigate('analyze')}>
          <Zap size={18} />
          Get started — it's free
        </button>
      </div>
    </div>
  );
};

export default Home;