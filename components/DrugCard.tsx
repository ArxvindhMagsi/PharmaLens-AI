import React, { useEffect } from 'react';
import { DrugDetails } from '../types';
import {
  AlertTriangle,
  Info,
  Pill,
  Activity,
  ShieldAlert,
  HeartPulse,
  Dumbbell,
  Utensils,
  Youtube,
  Clock,
} from 'lucide-react';

interface DrugCardProps {
  data: DrugDetails;
}

const DrugCard: React.FC<DrugCardProps> = ({ data }) => {
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
      }

      .dc-root {
        font-family: 'DM Sans', sans-serif;
        color: var(--ink);
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      /* ── IDENTITY CARD ── */
      .dc-identity {
        border: 2px solid var(--ink);
        border-radius: 20px;
        overflow: hidden;
        background: #fff;
        margin-bottom: 20px;
      }
      .dc-identity-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 24px;
        background: var(--ink);
        flex-wrap: wrap;
        gap: 10px;
      }
      .dc-manufacturer-badge {
        font-family: 'Syne', sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: .14em;
        text-transform: uppercase;
        color: var(--lime);
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .dc-manufacturer-badge::before {
        content: '';
        width: 6px; height: 6px;
        border-radius: 50%;
        background: var(--lime);
        display: inline-block;
      }
      .dc-confidence-pill {
        display: flex;
        align-items: center;
        gap: 8px;
        background: rgba(255,255,255,.08);
        border: 1px solid rgba(255,255,255,.12);
        border-radius: 99px;
        padding: 5px 12px;
      }
      .dc-confidence-dot {
        width: 7px; height: 7px;
        border-radius: 50%;
        animation: blink 1.4s ease-in-out infinite;
      }
      @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
      .dc-confidence-label {
        font-family: 'Syne', sans-serif;
        font-size: 10px;
        letter-spacing: .12em;
        text-transform: uppercase;
        color: rgba(255,255,255,.4);
      }
      .dc-confidence-val {
        font-family: 'Syne', sans-serif;
        font-size: 13px;
        font-weight: 700;
        color: #fff;
      }
      .dc-low-badge {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        background: #f97316;
        color: #fff;
        font-family: 'Syne', sans-serif;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .1em;
        text-transform: uppercase;
        padding: 4px 10px;
        border-radius: 99px;
      }

      .dc-identity-body {
        padding: 28px 28px 24px;
      }
      .dc-drug-name {
        font-family: 'Syne', sans-serif;
        font-size: clamp(28px, 4vw, 44px);
        font-weight: 800;
        letter-spacing: -.03em;
        line-height: .95;
        margin-bottom: 6px;
        word-break: break-word;
      }
      .dc-generic-name {
        font-size: 16px;
        font-weight: 300;
        color: var(--slate-mid);
        margin-bottom: 20px;
        word-break: break-word;
      }
      .dc-description {
        font-size: 15px;
        line-height: 1.7;
        color: #4b5563;
        font-weight: 300;
        margin-bottom: 24px;
        padding-bottom: 24px;
        border-bottom: 2px solid var(--cream);
      }

      /* SPECS GRID */
      .dc-specs-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
      }
      @media (max-width: 600px) { .dc-specs-grid { grid-template-columns: 1fr; } }

      .dc-spec-cell {
        border: 2px solid var(--ink);
        border-radius: 12px;
        padding: 18px 20px;
        background: var(--paper);
        transition: background .2s;
      }
      .dc-spec-cell:hover { background: var(--cream); }
      .dc-spec-cell.full { grid-column: 1 / -1; }
      .dc-spec-label {
        display: flex;
        align-items: center;
        gap: 7px;
        font-family: 'Syne', sans-serif;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .15em;
        text-transform: uppercase;
        color: var(--slate-mid);
        margin-bottom: 10px;
      }
      .dc-spec-value {
        font-family: 'Syne', sans-serif;
        font-size: 18px;
        font-weight: 700;
        color: var(--ink);
        line-height: 1.2;
        word-break: break-word;
      }
      .dc-uses-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 7px;
        margin-top: 2px;
      }
      .dc-use-tag {
        display: inline-block;
        border: 2px solid var(--ink);
        border-radius: 8px;
        padding: 4px 12px;
        font-size: 13px;
        font-weight: 500;
        background: #fff;
        transition: background .15s;
      }
      .dc-use-tag:hover { background: var(--lime); }

      /* ── DOSAGE CARD ── */
      .dc-dosage {
        border: 2px solid var(--ink);
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 20px;
        background: var(--ink);
      }
      .dc-dosage-header {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 22px 28px;
        border-bottom: 2px solid rgba(255,255,255,.1);
      }
      .dc-dosage-icon {
        background: var(--lime);
        border-radius: 10px;
        padding: 10px;
        display: flex;
        color: var(--ink);
        flex-shrink: 0;
      }
      .dc-dosage-title {
        font-family: 'Syne', sans-serif;
        font-size: 22px;
        font-weight: 800;
        color: #fff;
        line-height: 1;
        margin-bottom: 4px;
      }
      .dc-dosage-sub {
        font-size: 13px;
        color: rgba(255,255,255,.45);
      }
      .dc-dosage-body {
        padding: 20px 28px 28px;
      }
      .dc-dosage-inner {
        background: #fff;
        border-radius: 14px;
        border: 2px solid var(--lime);
        padding: 24px;
      }
      .dc-dosage-accent-bar {
        width: 4px;
        background: var(--lime);
        border-radius: 99px;
        flex-shrink: 0;
        align-self: stretch;
      }
      .dc-dosage-personalized-row {
        display: flex;
        gap: 14px;
        align-items: flex-start;
      }
      .dc-dosage-intake-label {
        font-family: 'Syne', sans-serif;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .15em;
        text-transform: uppercase;
        color: var(--slate-mid);
        margin-bottom: 8px;
      }
      .dc-dosage-intake-val {
        font-size: 19px;
        font-weight: 400;
        line-height: 1.5;
        color: var(--ink);
      }
      .dc-dosage-disclaimer {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 2px solid var(--cream);
        font-size: 12px;
        color: var(--slate-mid);
        font-style: italic;
      }
      .dc-dosage-standard-label {
        font-family: 'Syne', sans-serif;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .15em;
        text-transform: uppercase;
        color: var(--slate-mid);
        margin-bottom: 10px;
      }
      .dc-dosage-standard-val {
        font-size: 16px;
        line-height: 1.6;
        color: var(--ink);
        margin-bottom: 14px;
      }
      .dc-dosage-tip {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        background: var(--paper);
        border: 2px solid var(--cream);
        border-radius: 10px;
        padding: 10px 14px;
        font-size: 12px;
        color: var(--slate-mid);
      }

      /* ── BOTTOM GRID ── */
      .dc-bottom-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 20px;
      }
      @media (max-width: 900px) { .dc-bottom-grid { grid-template-columns: 1fr; } }

      /* SAFETY */
      .dc-safety {
        border: 2px solid var(--ink);
        border-radius: 20px;
        overflow: hidden;
        background: #fff;
      }
      .dc-section-header {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 18px 24px;
        border-bottom: 2px solid var(--ink);
        background: var(--paper);
      }
      .dc-section-icon {
        border: 2px solid var(--ink);
        border-radius: 10px;
        padding: 7px;
        display: flex;
        background: #fff;
      }
      .dc-section-title {
        font-family: 'Syne', sans-serif;
        font-size: 18px;
        font-weight: 800;
        color: var(--ink);
      }
      .dc-section-body { padding: 20px 24px; display: flex; flex-direction: column; gap: 20px; }

      .dc-sub-label {
        font-family: 'Syne', sans-serif;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .16em;
        text-transform: uppercase;
        padding-bottom: 10px;
        margin-bottom: 10px;
        border-bottom: 2px solid var(--cream);
      }
      .dc-sub-label.rose  { color: #e11d48; border-color: #fce7f3; }
      .dc-sub-label.orange { color: #ea580c; border-color: #ffedd5; }
      .dc-sub-label.slate  { color: var(--slate-mid); }

      .dc-warning-item {
        display: flex;
        gap: 10px;
        align-items: flex-start;
        background: #fff5f5;
        border: 2px solid #fca5a5;
        border-radius: 10px;
        padding: 12px 14px;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.5;
        color: var(--ink);
        margin-bottom: 8px;
      }
      .dc-warning-item:last-child { margin-bottom: 0; }

      .dc-dot-list { display: flex; flex-direction: column; gap: 7px; }
      .dc-dot-item {
        display: flex;
        align-items: flex-start;
        gap: 9px;
        font-size: 13px;
        color: var(--ink);
        line-height: 1.5;
      }
      .dc-dot {
        width: 7px; height: 7px;
        border-radius: 50%;
        margin-top: 5px;
        flex-shrink: 0;
      }
      .dc-dot.orange { background: #f97316; }
      .dc-dot.slate  { background: #94a3b8; }

      .dc-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      @media (max-width: 500px) { .dc-two-col { grid-template-columns: 1fr; } }

      /* LIFESTYLE */
      .dc-lifestyle {
        border: 2px solid var(--ink);
        border-radius: 20px;
        overflow: hidden;
        background: #fff;
        display: flex;
        flex-direction: column;
      }
      .dc-diet-box {
        background: var(--paper);
        border: 2px solid var(--ink);
        border-radius: 12px;
        padding: 16px;
      }
      .dc-diet-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 13px;
        color: var(--ink);
        line-height: 1.5;
        margin-bottom: 10px;
      }
      .dc-diet-item:last-child { margin-bottom: 0; }
      .dc-diet-icon {
        background: var(--lime);
        border-radius: 6px;
        padding: 4px;
        display: flex;
        flex-shrink: 0;
        margin-top: 1px;
      }

      /* EXERCISE CARDS */
      .dc-exercise-card {
        border: 2px solid var(--ink);
        border-radius: 12px;
        padding: 16px;
        background: #fff;
        margin-bottom: 10px;
        transition: background .2s;
      }
      .dc-exercise-card:last-child { margin-bottom: 0; }
      .dc-exercise-card:hover { background: var(--paper); }
      .dc-exercise-top {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 8px;
      }
      .dc-exercise-name {
        font-family: 'Syne', sans-serif;
        font-size: 15px;
        font-weight: 700;
        color: var(--ink);
      }
      .dc-intensity {
        font-family: 'Syne', sans-serif;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .1em;
        text-transform: uppercase;
        padding: 3px 10px;
        border-radius: 99px;
        border: 2px solid var(--ink);
        white-space: nowrap;
        flex-shrink: 0;
      }
      .dc-intensity.low    { background: #d1fae5; color: #065f46; }
      .dc-intensity.medium { background: #fef9c3; color: #713f12; }
      .dc-intensity.high   { background: #fee2e2; color: #7f1d1d; }

      .dc-exercise-benefits {
        font-size: 12px;
        color: var(--slate-mid);
        line-height: 1.5;
        margin-bottom: 12px;
      }
      .dc-yt-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 7px;
        width: 100%;
        padding: 9px;
        background: var(--ink);
        color: var(--lime);
        border-radius: 8px;
        font-family: 'Syne', sans-serif;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: .1em;
        text-transform: uppercase;
        text-decoration: none;
        transition: background .15s, color .15s;
        border: 2px solid var(--ink);
      }
      .dc-yt-btn:hover {
        background: var(--lime);
        color: var(--ink);
      }

      /* DISCLAIMER */
      .dc-disclaimer {
        border: 2px solid var(--ink);
        border-radius: 14px;
        padding: 18px 22px;
        background: var(--paper);
        display: flex;
        gap: 12px;
        align-items: flex-start;
      }
      .dc-disclaimer-icon {
        background: var(--ink);
        color: var(--lime);
        border-radius: 8px;
        padding: 6px;
        display: flex;
        flex-shrink: 0;
        margin-top: 1px;
      }
      .dc-disclaimer-text {
        font-size: 12px;
        color: var(--slate-mid);
        line-height: 1.7;
      }
      .dc-disclaimer-text strong {
        font-family: 'Syne', sans-serif;
        font-size: 10px;
        letter-spacing: .14em;
        text-transform: uppercase;
        color: var(--ink);
        display: block;
        margin-bottom: 4px;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  if (!data) return null;

  const isLowConfidence = (data.confidenceScore || 0) < 60;
  const dosage = data.dosageGuidelines || { strength: 'N/A', frequency: 'N/A', general: 'Not available', personalized: undefined };
  const fitness = data.fitnessGuide || { summary: '', dietaryTips: [], exercises: [] };

  const intensityClass = (i: string) =>
    i === 'Low' ? 'low' : i === 'Medium' ? 'medium' : 'high';

  return (
    <div className="dc-root">

      {/* ── IDENTITY ── */}
      <div className="dc-identity">
        {/* Top bar */}
        <div className="dc-identity-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className="dc-manufacturer-badge">{data.manufacturer || 'Generic'}</span>
            {isLowConfidence && (
              <span className="dc-low-badge"><AlertTriangle size={11} /> Low Confidence</span>
            )}
          </div>
          <div className="dc-confidence-pill">
            <span className="dc-confidence-dot" style={{ background: isLowConfidence ? '#f97316' : '#c8f135' }} />
            <span className="dc-confidence-label">AI Match</span>
            <span className="dc-confidence-val">{data.confidenceScore}%</span>
          </div>
        </div>

        {/* Body */}
        <div className="dc-identity-body">
          <div className="dc-drug-name">{data.name}</div>
          <div className="dc-generic-name">{data.genericName}</div>
          <div className="dc-description">{data.description}</div>

          {/* Specs */}
          <div className="dc-specs-grid">
            <div className="dc-spec-cell">
              <div className="dc-spec-label"><Pill size={14} /> Strength</div>
              <div className="dc-spec-value">{dosage.strength}</div>
            </div>
            <div className="dc-spec-cell">
              <div className="dc-spec-label"><Clock size={14} /> Frequency</div>
              <div className="dc-spec-value">{dosage.frequency}</div>
            </div>
            <div className="dc-spec-cell full">
              <div className="dc-spec-label"><HeartPulse size={14} /> Commonly Used For</div>
              <div className="dc-uses-tags">
                {data.uses?.map((use, i) => (
                  <span key={i} className="dc-use-tag">{use}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── DOSAGE ── */}
      <div className="dc-dosage">
        <div className="dc-dosage-header">
          <div className="dc-dosage-icon"><Activity size={26} /></div>
          <div>
            <div className="dc-dosage-title">Dosage Guide</div>
            <div className="dc-dosage-sub">
              {dosage.personalized ? 'Personalized based on your profile' : 'Standard general recommendations'}
            </div>
          </div>
        </div>
        <div className="dc-dosage-body">
          <div className="dc-dosage-inner">
            {dosage.personalized ? (
              <>
                <div className="dc-dosage-personalized-row">
                  <div className="dc-dosage-accent-bar" />
                  <div>
                    <div className="dc-dosage-intake-label">Your Recommended Intake</div>
                    <div className="dc-dosage-intake-val">{dosage.personalized}</div>
                  </div>
                </div>
                <div className="dc-dosage-disclaimer">
                  <Info size={14} style={{ flexShrink: 0, marginTop: 1, color: '#a8cc1a' }} />
                  AI-generated recommendation. Always follow your doctor's prescription.
                </div>
              </>
            ) : (
              <>
                <div className="dc-dosage-standard-label">Standard Dosage</div>
                <div className="dc-dosage-standard-val">{dosage.general}</div>
                <div className="dc-dosage-tip">
                  <Info size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                  Tip: Add your age and weight in the analysis form for a more specific calculation.
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── SAFETY + LIFESTYLE ── */}
      <div className="dc-bottom-grid">

        {/* Safety */}
        <div className="dc-safety">
          <div className="dc-section-header">
            <div className="dc-section-icon"><ShieldAlert size={18} /></div>
            <div className="dc-section-title">Safety Profile</div>
          </div>
          <div className="dc-section-body">
            {data.warnings && data.warnings.length > 0 && (
              <div>
                <div className="dc-sub-label rose">Critical Warnings</div>
                {data.warnings.map((w, i) => (
                  <div key={i} className="dc-warning-item">
                    <AlertTriangle size={16} style={{ color: '#e11d48', flexShrink: 0, marginTop: 1 }} />
                    {w}
                  </div>
                ))}
              </div>
            )}
            <div className="dc-two-col">
              <div>
                <div className="dc-sub-label orange">Side Effects</div>
                <div className="dc-dot-list">
                  {data.sideEffects?.slice(0, 5).map((s, i) => (
                    <div key={i} className="dc-dot-item">
                      <span className="dc-dot orange" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="dc-sub-label slate">Interactions</div>
                <div className="dc-dot-list">
                  {data.interactions?.slice(0, 5).map((int, i) => (
                    <div key={i} className="dc-dot-item">
                      <span className="dc-dot slate" />
                      {int}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div className="dc-lifestyle">
          <div className="dc-section-header">
            <div className="dc-section-icon"><Dumbbell size={18} /></div>
            <div className="dc-section-title">Lifestyle Guide</div>
          </div>
          <div className="dc-section-body" style={{ flex: 1 }}>
            <div>
              <div className="dc-sub-label" style={{ color: '#0d9488', borderColor: '#ccfbf1' }}>Dietary Recommendations</div>
              <div className="dc-diet-box">
                {fitness.dietaryTips?.length > 0 ? fitness.dietaryTips.map((tip, i) => (
                  <div key={i} className="dc-diet-item">
                    <div className="dc-diet-icon"><Utensils size={12} color="#0a0a0f" /></div>
                    {tip}
                  </div>
                )) : (
                  <div style={{ fontSize: 13, color: 'var(--slate-mid)', fontStyle: 'italic' }}>No specific dietary restrictions found.</div>
                )}
              </div>
            </div>

            <div>
              <div className="dc-sub-label" style={{ color: '#0d9488', borderColor: '#ccfbf1' }}>Recommended Exercises</div>
              {fitness.exercises?.length > 0 ? fitness.exercises.map((ex, i) => (
                <div key={i} className="dc-exercise-card">
                  <div className="dc-exercise-top">
                    <span className="dc-exercise-name">{ex.type}</span>
                    <span className={`dc-intensity ${intensityClass(ex.intensity)}`}>{ex.intensity}</span>
                  </div>
                  <div className="dc-exercise-benefits">{ex.benefits}</div>
                  <a
                    href={`https://www.youtube.com/results?search_query=${encodeURIComponent(ex.youtubeQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dc-yt-btn"
                  >
                    <Youtube size={14} /> View Tutorials
                  </a>
                </div>
              )) : (
                <div style={{ fontSize: 13, color: 'var(--slate-mid)', fontStyle: 'italic' }}>Consult your doctor for appropriate exercises.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="dc-disclaimer">
        <div className="dc-disclaimer-icon"><Info size={16} /></div>
        <div className="dc-disclaimer-text">
          <strong>Disclaimer</strong>
          This content is generated by AI  and is for informational and educational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your physician before making any medical decisions.
        </div>
      </div>

    </div>
  );
};

export default DrugCard;