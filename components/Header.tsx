import React, { useEffect } from 'react';
import { Pill, Search, Camera } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'analyze' | 'search') => void;
  currentPage: string;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

      :root {
        --ink: #0a0a0f;
        --paper: #f5f3ef;
        --cream: #ede9e1;
        --lime: #c8f135;
        --slate-mid: #6b7280;
      }

      .hdr-root {
        position: sticky;
        top: 0;
        z-index: 50;
        background: var(--paper);
        border-bottom: 2px solid var(--ink);
        font-family: 'DM Sans', sans-serif;
      }

      .hdr-inner {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 24px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      /* LOGO */
      .hdr-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        text-decoration: none;
        flex-shrink: 0;
      }
      .hdr-logo-icon {
        background: var(--ink);
        border-radius: 10px;
        width: 38px; height: 38px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: background .18s;
        flex-shrink: 0;
      }
      .hdr-logo:hover .hdr-logo-icon {
        background: var(--lime);
      }
      .hdr-logo:hover .hdr-logo-icon svg {
        stroke: var(--ink);
      }
      .hdr-logo-icon svg { transition: stroke .18s; }

      .hdr-logo-text {
        font-family: 'Syne', sans-serif;
        font-size: 18px;
        font-weight: 800;
        letter-spacing: -.03em;
        color: var(--ink);
        line-height: 1;
      }
      .hdr-logo-text span {
        display: inline-block;
        background: var(--lime);
        border-radius: 4px;
        padding: 0 4px;
        transform: rotate(-1.5deg);
        font-size: 16px;
      }

      /* NAV */
      .hdr-nav {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      /* NAV BUTTONS */
      .hdr-nav-btn {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 8px 16px;
        border-radius: 8px;
        font-family: 'Syne', sans-serif;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: .01em;
        cursor: pointer;
        border: 2px solid transparent;
        transition: background .15s, border-color .15s, color .15s, transform .15s;
        background: transparent;
        color: var(--slate-mid);
        white-space: nowrap;
      }
      .hdr-nav-btn:hover {
        background: var(--cream);
        color: var(--ink);
        border-color: var(--ink);
        transform: translateY(-1px);
      }
      .hdr-nav-btn.active {
        background: var(--ink);
        color: var(--lime);
        border-color: var(--ink);
      }
      .hdr-nav-btn.active:hover {
        background: #1e1e2e;
        color: var(--lime);
        transform: translateY(-1px);
      }

      /* PRIMARY CTA */
      .hdr-cta-btn {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 9px 18px;
        border-radius: 8px;
        font-family: 'Syne', sans-serif;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        border: 2px solid var(--ink);
        background: var(--lime);
        color: var(--ink);
        transition: background .15s, transform .15s;
        white-space: nowrap;
      }
      .hdr-cta-btn:hover {
        background: var(--ink);
        color: var(--lime);
        transform: translateY(-1px);
      }
      .hdr-cta-btn.active {
        background: var(--ink);
        color: var(--lime);
        border-color: var(--ink);
      }
      .hdr-cta-btn.active:hover {
        opacity: .85;
        transform: translateY(-1px);
      }

      /* DIVIDER between nav items */
      .hdr-divider {
        width: 1px;
        height: 20px;
        background: var(--cream);
        margin: 0 4px;
      }

      /* MOBILE: hide text labels on very small screens */
      @media (max-width: 480px) {
        .hdr-nav-label { display: none; }
        .hdr-logo-text  { display: none; }
        .hdr-nav-btn, .hdr-cta-btn { padding: 9px 12px; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <header className="hdr-root">
      <div className="hdr-inner">

        {/* Logo */}
        <div className="hdr-logo" onClick={() => onNavigate('home')}>
          <div className="hdr-logo-icon">
            <Pill size={20} color="#c8f135" />
          </div>
          <div className="hdr-logo-text">
            Pharma<span>Lens</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="hdr-nav">
          <button
            className={`hdr-nav-btn ${currentPage === 'search' ? 'active' : ''}`}
            onClick={() => onNavigate('search')}
          >
            <Search size={15} />
            <span className="hdr-nav-label">Search Database</span>
          </button>

          <div className="hdr-divider" />

          <button
            className={`hdr-cta-btn ${currentPage === 'analyze' ? 'active' : ''}`}
            onClick={() => onNavigate('analyze')}
          >
            <Camera size={15} />
            <span className="hdr-nav-label">Analyze Drug</span>
          </button>
        </nav>

      </div>
    </header>
  );
};

export default Header;