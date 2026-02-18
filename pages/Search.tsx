import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Loader2, ArrowRight } from 'lucide-react';
import { searchDrugInfo } from '../services/geminiService';
import { DrugDetails } from '../types';
import DrugCard from '../components/DrugCard';

const SUGGESTIONS = ['Ibuprofen', 'Amoxicillin', 'Metformin', 'Atorvastatin', 'Paracetamol', 'Omeprazole'];

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DrugDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

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

      .search-root {
        font-family: 'DM Sans', sans-serif;
        background: var(--paper);
        min-height: 100vh;
        color: var(--ink);
      }

      /* HEADER */
      .search-header {
        border-bottom: 2px solid var(--ink);
        padding: 40px 24px 32px;
        max-width: 1100px;
        margin: 0 auto;
      }
      .search-eyebrow {
        font-family: 'Syne', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .18em;
        text-transform: uppercase;
        color: var(--slate-mid);
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .search-eyebrow::before {
        content: '';
        display: inline-block;
        width: 6px; height: 6px;
        border-radius: 50%;
        background: var(--lime);
        box-shadow: 0 0 0 2px var(--ink);
      }
      .search-title {
        font-family: 'Syne', sans-serif;
        font-size: clamp(36px, 5vw, 60px);
        font-weight: 800;
        letter-spacing: -.03em;
        line-height: .95;
        margin-bottom: 16px;
      }
      .search-title span {
        display: inline-block;
        background: var(--lime);
        padding: 2px 10px;
        border-radius: 6px;
        transform: rotate(-1deg);
      }
      .search-subtitle {
        font-size: 16px;
        font-weight: 300;
        color: #4b5563;
        line-height: 1.6;
        max-width: 520px;
      }

      /* SEARCH SECTION */
      .search-body {
        max-width: 1100px;
        margin: 0 auto;
        padding: 40px 24px 64px;
      }

      /* INPUT ROW */
      .search-input-wrap {
        display: flex;
        gap: 0;
        border: 2px solid var(--ink);
        border-radius: 14px;
        overflow: hidden;
        background: #fff;
        transition: box-shadow .2s;
        margin-bottom: 20px;
      }
      .search-input-wrap:focus-within {
        box-shadow: 4px 4px 0 var(--ink);
      }
      .search-icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 18px;
        background: var(--ink);
        color: var(--lime);
        flex-shrink: 0;
      }
      .search-input {
        flex: 1;
        padding: 18px 16px;
        font-family: 'DM Sans', sans-serif;
        font-size: 17px;
        font-weight: 400;
        border: none;
        outline: none;
        background: transparent;
        color: var(--ink);
        min-width: 0;
      }
      .search-input::placeholder { color: #b0b8c4; }
      .search-btn {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 0 28px;
        background: var(--ink);
        color: #fff;
        font-family: 'Syne', sans-serif;
        font-size: 15px;
        font-weight: 700;
        border: none;
        cursor: pointer;
        transition: background .18s, color .18s;
        flex-shrink: 0;
        white-space: nowrap;
      }
      .search-btn:hover:not(:disabled) {
        background: var(--lime);
        color: var(--ink);
      }
      .search-btn:disabled {
        opacity: .4;
        cursor: not-allowed;
      }
      .search-btn .s-arrow {
        background: var(--lime);
        color: var(--ink);
        border-radius: 5px;
        padding: 3px;
        display: flex;
        transition: background .18s, color .18s;
      }
      .search-btn:hover:not(:disabled) .s-arrow {
        background: var(--ink);
        color: var(--lime);
      }
      .search-btn:disabled .s-arrow { background: #d1d5db; color: #fff; }

      /* SUGGESTIONS */
      .suggestions-row {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
      }
      .suggestions-label {
        font-family: 'Syne', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: var(--slate-mid);
      }
      .suggestion-chip {
        padding: 6px 14px;
        border: 2px solid var(--ink);
        border-radius: 99px;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        font-weight: 500;
        background: #fff;
        cursor: pointer;
        transition: background .15s, color .15s, transform .15s;
      }
      .suggestion-chip:hover {
        background: var(--lime);
        transform: translateY(-2px);
      }

      /* DIVIDER */
      .search-divider {
        border: none;
        border-top: 2px solid var(--cream);
        margin: 32px 0;
      }

      /* STATES */
      .state-box {
        min-height: 420px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
      }

      /* EMPTY */
      .empty-icon {
        width: 80px; height: 80px;
        border-radius: 50%;
        background: var(--cream);
        border: 2px solid var(--ink);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .empty-h {
        font-family: 'Syne', sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: var(--ink);
        opacity: .5;
      }
      .empty-sub { font-size: 14px; color: var(--slate-mid); }

      /* LOADING */
      .loading-box {
        min-height: 420px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 28px;
        background: var(--ink);
        border: 2px solid var(--ink);
        border-radius: 20px;
      }
      .loading-ring {
        position: relative;
        width: 72px; height: 72px;
      }
      .loading-ring-bg {
        position: absolute; inset: 0;
        border-radius: 50%;
        border: 3px solid rgba(200,241,53,.15);
      }
      .loading-ring-spin {
        position: absolute; inset: 0;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: var(--lime);
        animation: spin 1s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      .loading-dot {
        position: absolute; inset: 0;
        display: flex; align-items: center; justify-content: center;
      }
      .loading-h {
        font-family: 'Syne', sans-serif;
        font-size: 20px;
        font-weight: 700;
        color: #fff;
      }
      .loading-steps {
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
      }
      .loading-step {
        font-size: 13px;
        color: rgba(255,255,255,.4);
        display: flex; align-items: center; gap: 8px;
      }
      .loading-step-dot {
        width: 5px; height: 5px;
        border-radius: 50%;
        background: var(--lime);
        animation: stepPulse 1.5s ease-in-out infinite;
      }
      .loading-step:nth-child(2) .loading-step-dot { animation-delay: .3s; }
      .loading-step:nth-child(3) .loading-step-dot { animation-delay: .6s; }
      @keyframes stepPulse {
        0%,100% { opacity:.3; transform:scale(1); }
        50% { opacity:1; transform:scale(1.5); }
      }

      /* ERROR */
      .error-bar {
        background: #fff0f0;
        border: 2px solid #f87171;
        border-radius: 12px;
        padding: 14px 20px;
        font-size: 14px;
        color: #dc2626;
        font-weight: 500;
        margin-bottom: 24px;
      }

      /* RESULT */
      .result-wrap {
        animation: fadeUp .45s ease both;
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await searchDrugInfo(query);
      setResult(data);
    } catch {
      setError("Could not find information for this drug. Please check the spelling.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestion = (name: string) => {
    setQuery(name);
  };

  return (
    <div className="search-root">
      {/* Header */}
      <div className="search-header">
        <div className="search-eyebrow">Drug Encyclopedia</div>
        <h1 className="search-title">
          Search any <span>Medication</span>
        </h1>
        <p className="search-subtitle">
          Query our comprehensive AI database for detailed information on any medication — generic or brand name.
        </p>
      </div>

      <div className="search-body">
        {/* Search input */}
        <form onSubmit={handleSearch}>
          <div className="search-input-wrap">
            <div className="search-icon-box">
              <SearchIcon size={22} />
            </div>
            <input
              className="search-input"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Enter drug name (e.g. Ibuprofen, Amoxicillin)…"
            />
            <button
              type="submit"
              className="search-btn"
              disabled={isLoading || !query.trim()}
            >
              {isLoading
                ? <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                : <>Search <span className="s-arrow"><ArrowRight size={14} /></span></>
              }
            </button>
          </div>
        </form>

        {/* Suggestions */}
        <div className="suggestions-row">
          <span className="suggestions-label">Try:</span>
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              className="suggestion-chip"
              onClick={() => handleSuggestion(s)}
              type="button"
            >
              {s}
            </button>
          ))}
        </div>

        <hr className="search-divider" />

        {/* Error */}
        {error && <div className="error-bar">{error}</div>}

        {/* States */}
        {isLoading ? (
          <div className="loading-box">
            <div className="loading-ring">
              <div className="loading-ring-bg" />
              <div className="loading-ring-spin" />
              <div className="loading-dot">
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--lime)' }} />
              </div>
            </div>
            <div className="loading-h">Searching Database</div>
            <div className="loading-steps">
              <div className="loading-step"><span className="loading-step-dot" />Scanning medication records…</div>
              <div className="loading-step"><span className="loading-step-dot" />Cross-referencing interactions…</div>
              <div className="loading-step"><span className="loading-step-dot" />Compiling safety data…</div>
            </div>
          </div>
        ) : result ? (
          <div className="result-wrap">
            <DrugCard data={result} />
          </div>
        ) : (
          !error && (
            <div className="state-box">
              <div className="empty-icon">
                <SearchIcon size={30} color="#0a0a0f" />
              </div>
              <div className="empty-h">Enter a drug name above</div>
              <div className="empty-sub">Results will appear here instantly</div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Search;