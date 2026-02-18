import React, { useState, useRef, useEffect } from 'react';
import { Upload, X, Loader2, ArrowRight, UserCircle, ChevronDown } from 'lucide-react';
import { analyzeDrugImage } from '../services/geminiService';
import { DrugDetails, UserContext } from '../types';
import DrugCard from '../components/DrugCard';

const Analyze: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DrugDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [userDetails, setUserDetails] = useState<UserContext>({
    age: '',
    weight: '',
    condition: '',
    otherMedications: ''
  });
  const [showUserDetails, setShowUserDetails] = useState(false);

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

      .analyze-root {
        font-family: 'DM Sans', sans-serif;
        background: var(--paper);
        min-height: 100vh;
        color: var(--ink);
      }

      /* PAGE HEADER */
      .analyze-header {
        border-bottom: 2px solid var(--ink);
        padding: 40px 24px 32px;
        max-width: 1200px;
        margin: 0 auto;
      }
      .analyze-eyebrow {
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
      .analyze-eyebrow::before {
        content: '';
        display: inline-block;
        width: 6px; height: 6px;
        border-radius: 50%;
        background: var(--lime);
        box-shadow: 0 0 0 2px var(--ink);
      }
      .analyze-title {
        font-family: 'Syne', sans-serif;
        font-size: clamp(36px, 5vw, 60px);
        font-weight: 800;
        letter-spacing: -.03em;
        line-height: .95;
        margin-bottom: 16px;
      }
      .analyze-title span {
        display: inline-block;
        background: var(--lime);
        padding: 2px 10px;
        border-radius: 6px;
        transform: rotate(-1deg);
      }
      .analyze-subtitle {
        font-size: 16px;
        font-weight: 300;
        color: #4b5563;
        line-height: 1.6;
        max-width: 520px;
      }

      /* MAIN GRID */
      .analyze-grid {
        display: grid;
        grid-template-columns: 380px 1fr;
        gap: 0;
        max-width: 1200px;
        margin: 0 auto;
        min-height: 70vh;
      }
      @media (max-width: 900px) {
        .analyze-grid { grid-template-columns: 1fr; }
      }

      /* LEFT PANEL */
      .left-panel {
        border-right: 2px solid var(--ink);
        padding: 32px 24px;
        position: sticky;
        top: 0;
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      /* UPLOAD ZONE */
      .upload-zone {
        border: 2px dashed var(--ink);
        border-radius: 16px;
        background: #fff;
        cursor: pointer;
        transition: border-color .2s, background .2s;
        overflow: hidden;
        position: relative;
      }
      .upload-zone:hover { background: var(--cream); border-style: solid; }
      .upload-zone.has-file { border-style: solid; border-color: var(--ink); background: #fff; }

      .upload-zone-inner {
        padding: 40px 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 12px;
      }
      .upload-icon-ring {
        width: 64px; height: 64px;
        border-radius: 50%;
        border: 2px solid var(--ink);
        background: var(--lime);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform .2s;
      }
      .upload-zone:hover .upload-icon-ring { transform: scale(1.08) rotate(-6deg); }

      .upload-h3 {
        font-family: 'Syne', sans-serif;
        font-size: 17px;
        font-weight: 700;
        color: var(--ink);
      }
      .upload-sub {
        font-size: 12px;
        color: var(--slate-mid);
        letter-spacing: .03em;
      }

      .preview-wrap {
        position: relative;
      }
      .preview-img {
        width: 100%;
        max-height: 220px;
        object-fit: contain;
        display: block;
        background: var(--cream);
      }
      .clear-btn {
        position: absolute;
        top: 10px; right: 10px;
        background: var(--ink);
        color: var(--lime);
        border: none;
        border-radius: 8px;
        width: 32px; height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: opacity .15s;
      }
      .clear-btn:hover { opacity: .75; }

      /* PERSONALIZE PANEL */
      .personalize-panel {
        border: 2px solid var(--ink);
        border-radius: 16px;
        overflow: hidden;
        background: #fff;
      }
      .personalize-toggle {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 18px;
        background: var(--ink);
        color: #fff;
        border: none;
        cursor: pointer;
        font-family: 'Syne', sans-serif;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: .02em;
        transition: opacity .15s;
      }
      .personalize-toggle:hover { opacity: .85; }
      .toggle-left {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .toggle-icon {
        background: var(--lime);
        border-radius: 6px;
        padding: 4px;
        display: flex;
        color: var(--ink);
      }
      .chevron {
        transition: transform .25s;
        color: var(--lime);
      }
      .chevron.open { transform: rotate(180deg); }

      .personalize-body {
        padding: 20px 18px;
        border-top: 2px solid var(--cream);
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .personalize-hint {
        font-size: 11px;
        color: var(--slate-mid);
        font-style: italic;
      }
      .input-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
      }
      .field-label {
        font-family: 'Syne', sans-serif;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .14em;
        text-transform: uppercase;
        color: var(--ink);
        display: block;
        margin-bottom: 6px;
      }
      .field-input {
        width: 100%;
        padding: 10px 12px;
        border: 2px solid var(--cream);
        border-radius: 8px;
        font-family: 'DM Sans', sans-serif;
        font-size: 14px;
        outline: none;
        background: var(--paper);
        transition: border-color .15s;
        box-sizing: border-box;
      }
      .field-input:focus {
        border-color: var(--ink);
        background: #fff;
      }
      .field-input::placeholder { color: #b0b8c4; }

      /* ANALYZE BUTTON */
      .analyze-btn {
        width: 100%;
        padding: 16px 24px;
        border-radius: 12px;
        border: 2px solid var(--ink);
        font-family: 'Syne', sans-serif;
        font-size: 16px;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        cursor: pointer;
        transition: transform .18s, background .18s, color .18s;
        background: var(--ink);
        color: #fff;
      }
      .analyze-btn:disabled {
        background: var(--cream);
        border-color: var(--cream);
        color: #b0b8c4;
        cursor: not-allowed;
        transform: none;
      }
      .analyze-btn:not(:disabled):hover {
        background: var(--lime);
        color: var(--ink);
        transform: translateY(-2px);
      }
      .analyze-btn .btn-arrow {
        background: var(--lime);
        color: var(--ink);
        border-radius: 6px;
        padding: 3px;
        display: flex;
        transition: background .18s;
      }
      .analyze-btn:not(:disabled):hover .btn-arrow {
        background: var(--ink);
        color: var(--lime);
      }
      .analyze-btn:disabled .btn-arrow {
        background: #d1d5db;
        color: #fff;
      }

      /* ERROR */
      .error-bar {
        background: #fff0f0;
        border: 2px solid #f87171;
        border-radius: 10px;
        padding: 12px 16px;
        font-size: 13px;
        color: #dc2626;
        font-weight: 500;
      }

      /* RIGHT PANEL */
      .right-panel {
        padding: 32px 32px;
      }

      /* EMPTY STATE */
      .empty-state {
        height: 100%;
        min-height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 2px dashed var(--ink);
        border-radius: 20px;
        background: #fff;
        gap: 16px;
        opacity: .55;
      }
      .empty-icon-wrap {
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
        font-size: 18px;
        font-weight: 700;
      }
      .empty-sub { font-size: 13px; color: var(--slate-mid); }

      /* LOADING STATE */
      .loading-state {
        height: 100%;
        min-height: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 2px solid var(--ink);
        border-radius: 20px;
        background: var(--ink);
        gap: 28px;
      }
      .loading-ring {
        position: relative;
        width: 80px; height: 80px;
      }
      .loading-ring-bg {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 3px solid rgba(200,241,53,.2);
      }
      .loading-ring-spin {
        position: absolute;
        inset: 0;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: var(--lime);
        animation: spin 1s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      .loading-inner-dot {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .loading-h {
        font-family: 'Syne', sans-serif;
        font-size: 22px;
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
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .loading-step-dot {
        width: 5px; height: 5px;
        border-radius: 50%;
        background: var(--lime);
        opacity: .5;
        animation: stepPulse 1.5s ease-in-out infinite;
      }
      .loading-step:nth-child(2) .loading-step-dot { animation-delay: .3s; }
      .loading-step:nth-child(3) .loading-step-dot { animation-delay: .6s; }
      @keyframes stepPulse {
        0%,100% { opacity: .3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.4); }
      }

      /* RESULT */
      .result-wrap {
        animation: fadeUp .5s ease both;
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
      setError(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const f = e.dataTransfer.files[0];
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult(null);
      setError(null);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await analyzeDrugImage(file, userDetails);
      setResult(data);
    } catch {
      setError('Failed to analyze image. Please try again with a clearer photo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="analyze-root">
      {/* Header */}
      <div className="analyze-header">
        <div className="analyze-eyebrow">Medication Analysis</div>
        <h1 className="analyze-title">
          Analyze your <span>Medication</span>
        </h1>
        <p className="analyze-subtitle">
          Upload a clear photo of the pill, bottle label, or packaging. Add your personal details for tailored dosage recommendations.
        </p>
      </div>

      <div className="analyze-grid">
        {/* LEFT PANEL */}
        <div className="left-panel">

          {/* Upload zone */}
          <div
            className={`upload-zone ${preview ? 'has-file' : ''}`}
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => !preview && fileInputRef.current?.click()}
          >
            {preview ? (
              <div className="preview-wrap">
                <img src={preview} alt="Preview" className="preview-img" />
                <button className="clear-btn" onClick={e => { e.stopPropagation(); clearFile(); }} aria-label="Remove image">
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="upload-zone-inner">
                <div className="upload-icon-ring">
                  <Upload size={26} color="#0a0a0f" />
                </div>
                <div className="upload-h3">Upload Photo</div>
                <div className="upload-sub">Drag & drop or click — JPG, PNG, WebP</div>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Personalize panel */}
          <div className="personalize-panel">
            <button className="personalize-toggle" onClick={() => setShowUserDetails(v => !v)}>
              <span className="toggle-left">
                <span className="toggle-icon"><UserCircle size={16} /></span>
                Personalize Results
              </span>
              <ChevronDown className={`chevron ${showUserDetails ? 'open' : ''}`} size={18} />
            </button>

            {showUserDetails && (
              <div className="personalize-body">
                <span className="personalize-hint">Optional: Fill this for tailored dosage advice.</span>
                <div className="input-row">
                  <div>
                    <label className="field-label">Age</label>
                    <input
                      className="field-input"
                      placeholder="e.g. 30"
                      value={userDetails.age}
                      onChange={e => setUserDetails({ ...userDetails, age: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="field-label">Weight</label>
                    <input
                      className="field-input"
                      placeholder="e.g. 70kg"
                      value={userDetails.weight}
                      onChange={e => setUserDetails({ ...userDetails, weight: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="field-label">Condition / Symptoms</label>
                  <input
                    className="field-input"
                    placeholder="e.g. High fever, Back pain"
                    value={userDetails.condition}
                    onChange={e => setUserDetails({ ...userDetails, condition: e.target.value })}
                  />
                </div>
                <div>
                  <label className="field-label">Other Medications</label>
                  <input
                    className="field-input"
                    placeholder="e.g. Aspirin"
                    value={userDetails.otherMedications}
                    onChange={e => setUserDetails({ ...userDetails, otherMedications: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Analyze button */}
          <button
            className="analyze-btn"
            onClick={handleAnalyze}
            disabled={!file || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                Analyzing…
              </>
            ) : (
              <>
                Analyze Now
                <span className="btn-arrow"><ArrowRight size={15} /></span>
              </>
            )}
          </button>

          {error && <div className="error-bar">{error}</div>}
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          {isLoading ? (
            <div className="loading-state">
              <div className="loading-ring">
                <div className="loading-ring-bg" />
                <div className="loading-ring-spin" />
                <div className="loading-inner-dot">
                  <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'var(--lime)' }} />
                </div>
              </div>
              <div className="loading-h">Analyzing Medication</div>
              <div className="loading-steps">
                <div className="loading-step"><span className="loading-step-dot" />Extracting label text…</div>
                <div className="loading-step"><span className="loading-step-dot" />Identifying visual markers…</div>
                <div className="loading-step"><span className="loading-step-dot" />Matching with medical database…</div>
              </div>
            </div>
          ) : result ? (
            <div className="result-wrap">
              <DrugCard data={result} />
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon-wrap">
                <Upload size={28} color="#0a0a0f" />
              </div>
              <div className="empty-h">Results appear here</div>
              <div className="empty-sub">Upload an image and hit Analyze Now</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyze;