import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(username, password);
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'staff') navigate('/staff');
      else navigate('/');
    } catch (err) {
      toast.error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .brule-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-900);
          font-family: 'DM Sans', sans-serif;
          padding: 24px;
          box-sizing: border-box;
        }

        .brule-card {
          display: flex;
          width: 100%;
          max-width: 900px;
          min-height: 560px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
          /* Stack vertically so the Sign In panel appears centered and brand moves below */
          flex-direction: column;
          align-items: center;
          gap: 0;
          padding: 18px 0;
        }

        /* ── Left Panel ── */
        .brule-left {
          flex: none;
          width: 100%;
          background: #0f0c09;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 28px 24px;
          position: relative;
          border-top: 0.5px solid rgba(255,255,255,0.04);
          overflow: hidden;
          order: 2; /* place below the form */
        }

        .brule-glow-top {
          position: absolute;
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(180,130,60,0.14) 0%, transparent 70%);
          top: -100px;
          left: -100px;
          pointer-events: none;
        }

        .brule-glow-bottom {
          position: absolute;
          width: 280px;
          height: 280px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(180,130,60,0.08) 0%, transparent 70%);
          bottom: -80px;
          right: -60px;
          pointer-events: none;
        }

        .brule-brand {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .brule-icon {
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Logo animation: subtle float, rotating ring, and rising steam */
        .logo-float { animation: bruleFloat 6s ease-in-out infinite; }
        .logo-ring { transform-origin: 28px 28px; animation: bruleRotate 12s linear infinite; opacity: 0.95 }
        .logo-steam { stroke: rgba(232,201,122,0.9); stroke-width: 1; fill: none; opacity: 0.9; }
        .logo-steam.steam-1 { animation: steamRise 2.8s ease-in-out infinite; }
        .logo-steam.steam-2 { animation: steamRise 3.6s ease-in-out 0.6s infinite; }
        .logo-steam.steam-3 { animation: steamRise 4.2s ease-in-out 1.2s infinite; }

        @keyframes bruleFloat {
          0% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        @keyframes bruleRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes steamRise {
          0% { transform: translateY(6px); opacity: 0; }
          30% { opacity: 0.9; }
          100% { transform: translateY(-18px); opacity: 0; }
        }

        /* coffee cup animation */
        .cup-svg { width: 120px; height: 80px; display:inline-block; }
        .cup-steam .steamA, .cup-steam .steamB { stroke: var(--text-dark); opacity: 0.9; }
        .cup-steam .steamA { animation: steamRise 2.4s ease-in-out infinite; }
        .cup-steam .steamB { animation: steamRise 3.2s ease-in-out 0.4s infinite; }
        .cup-svg #cup { transform-origin: center bottom; animation: cupFloat 6s ease-in-out infinite; }
        @keyframes cupFloat { 0%{ transform: translateY(0);}50%{ transform: translateY(-6px);}100%{ transform: translateY(0);} }

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .logo-float, .logo-ring, .logo-steam { animation: none !important; }
        }

        .brule-name {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          font-weight: 700;
          color: var(--text-dark);
          letter-spacing: 0.02em;
          line-height: 1.1;
          margin: 0 0 6px;
        }

        .brule-subtitle {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0;
        }

        .brule-divider {
          width: 40px;
          height: 1px;
          background: var(--text-muted);
          margin: 22px auto;
        }

        .brule-tagline {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 13.5px;
          color: var(--text-dark);
          line-height: 1.75;
          max-width: 190px;
          text-align: center;
        }

        .brule-art {
          margin-top: 36px;
          opacity: 0.16;
        }

        /* Ensure SVG strokes/fills inside the sign-in panel use dark color for readability */
        .brule-right svg, .brule-right svg * {
          stroke: var(--text-dark) !important;
          fill: var(--text-dark) !important;
        }

        /* ── Right Panel ── */
        .brule-right {
          width: 640px;
          max-width: calc(100% - 48px);
          flex-shrink: 0;
          /* beige sign-in panel */
          background: #f5ead6;
          color: var(--text-dark);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 40px;
          box-sizing: border-box;
          margin: 0 auto;
          border-radius: 12px;
          order: 1; /* keep form on top */
        }

        .brule-form-eyebrow {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin: 0 0 10px;
        }

        .brule-form-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 400;
          color: var(--text-dark); /* dark text for readability on beige */
          margin: 0 0 28px;
          line-height: 1.3;
        }

        .brule-form-title em {
          color: var(--accent-warm);
          font-style: italic;
        }

        .brule-field {
          margin-bottom: 20px;
        }

        .brule-label {
          display: block;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text-dark);
          margin-bottom: 8px;
        }

        .brule-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .brule-input-icon {
          position: absolute;
          left: 14px;
          color: rgba(232,201,122,0.35);
          font-size: 15px;
          pointer-events: none;
          z-index: 1;
          display: flex;
          align-items: center;
        }

        .brule-input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px;
          padding: 13px 14px 13px 42px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: var(--text-dark); /* dark text on beige */
          outline: none;
          transition: border-color 0.18s, background 0.18s;
        }

        .brule-input:focus {
          border-color: rgba(139,94,60,0.55);
          background: rgba(255,255,255,0.9);
        }

        /* ULTIMATE AUTOFILL FIX FOR ANDROID/CHROME */
        .brule-input:-webkit-autofill,
        .brule-input:-webkit-autofill:focus,
        .brule-input:-webkit-autofill:hover,
        .brule-input:-webkit-autofill:active {
          color-scheme: dark !important;
          -webkit-text-fill-color: #ffffff !important;
          -webkit-box-shadow: 0 0 0px 1000px #13100d inset !important;
          box-shadow: 0 0 0px 1000px #13100d inset !important;
          background-color: #13100d !important;
          transition: background-color 5000s ease-in-out 0s !important;
          border-radius: 10px !important;
        }

        .brule-input::placeholder {
          color: var(--text-muted);
        }


        .brule-btn {
          width: 100%;
          margin-top: 10px;
          padding: 14px 24px;
          background: #8b5e3c; /* darker warm button on beige */
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff3ea;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: background 0.18s, transform 0.1s, opacity 0.18s;
          -webkit-appearance: none;
          appearance: none;
        }

        .brule-btn:hover:not(:disabled) {
          background: #a06a46;
        }

        .brule-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .brule-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .brule-btn-shimmer {
          position: absolute;
          top: 0;
          left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
          animation: bruleShimmer 2.6s infinite;
          pointer-events: none;
        }

        @keyframes bruleShimmer {
          0%   { left: -100%; }
          50%  { left: 140%; }
          100% { left: 140%; }
        }

        .brule-footer {
          margin-top: 18px;
          font-size: 12px;
          color: var(--text-muted);
          text-align: center;
          line-height: 1.6;
        }

        /* Ensure all text inside the sign-in panel defaults to dark */
        /* Ensure all text inside the sign-in panel defaults to dark */
        .brule-right, .brule-right * { color: var(--text-dark) !important; }

        /* Force SVG strokes/fills inside the sign-in panel to dark for contrast */
        .brule-right svg, .brule-right svg * {
          stroke: var(--text-dark) !important;
          fill: var(--text-dark) !important;
        }

        /* Placeholder readability */
        .brule-right .brule-input::placeholder { color: var(--text-muted) !important; }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .brule-card  { flex-direction: column; min-height: auto; border-radius: 20px; box-sizing: border-box; }
          .brule-left  { padding: 32px 20px; border-right: none; border-bottom: 0.5px solid rgba(255,255,255,0.06); box-sizing: border-box; }
          .brule-right { width: 100%; padding: 32px 20px; box-sizing: border-box; }
          .brule-input { padding: 14px 14px 14px 42px; font-size: 16px; border-radius: 10px !important; }
          .brule-btn { padding: 16px 24px; font-size: 14px; border-radius: 10px !important; }
        }
      `}</style>

      <div className="brule-root">
          <div className="brule-card">

          {/* Combined Brand + Form Panel: brand header merged into sign-in panel */}
          <div className="brule-right">
            <div className="brule-header" style={{ textAlign: 'center', marginBottom: 18 }}>
              <div className="brule-icon logo-float" aria-hidden="true">
                <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g className="logo-ring">
                    <circle cx="28" cy="28" r="27" stroke="#8b5e3c" strokeWidth="0.7" strokeOpacity="0.18" />
                  </g>
                  <ellipse cx="28" cy="30" rx="12" ry="9" fill="#8b5e3c" />
                  {/* coffee bean detail */}
                  <path d="M28 23 Q24 28 28 33 Q32 28 28 23 Z" fill="#f5ead6" opacity="0.95" />
                  <g transform="translate(0,-6)">
                    <path className="logo-steam steam-1" d="M24 14 Q26 8 28 10 Q30 12 32 8" strokeLinecap="round" />
                    <path className="logo-steam steam-2" d="M30 14 Q32 9 34 11 Q36 13 38 9" strokeLinecap="round" />
                  </g>
                </svg>
              </div>
              {/* animated coffee cup under logo */}
              <div>
                <svg className="cup-svg" viewBox="0 0 120 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <g id="cup">
                    <path d="M20 48 C22 34, 98 34, 100 48 L100 56 C100 62, 96 66, 60 66 C24 66, 20 62, 20 56 Z" fill="#8b5e3c" />
                    <rect x="26" y="28" width="68" height="24" rx="6" fill="#f5ead6" />
                    <path className="cup-handle" d="M102 44 C112 44,112 56,102 56" stroke="#8b5e3c" strokeWidth="4" fill="none" strokeLinecap="round" />
                  </g>
                  <g className="cup-steam" transform="translate(38,6)" stroke="#8b5e3c" strokeWidth="1.2" fill="none" strokeLinecap="round">
                    <path className="steamA" d="M4 18 Q6 6 14 10 Q22 14 24 4" />
                    <path className="steamB" d="M24 18 Q26 8 34 12 Q42 16 44 6" />
                  </g>
                </svg>
              </div>
              <h1 className="brule-name">Leaxie Cafe</h1>
              <p className="brule-subtitle">Cafe Management</p>
              <div className="brule-divider" />
              <p className="brule-tagline">Sip. Smile. Repeat.</p>
            </div>
            <p className="brule-form-eyebrow">Staff Portal</p>
            <h2 className="brule-form-title">
              Sign in to your<br /><em>workspace</em>
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="brule-field">
                <label className="brule-label" htmlFor="brule-username">Username</label>
                <div className="brule-input-wrap">
                  <span className="brule-input-icon" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <input
                    id="brule-username"
                    className="brule-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="jireh"
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="brule-field">
                <label className="brule-label" htmlFor="brule-password">Password</label>
                <div className="brule-input-wrap">
                  <span className="brule-input-icon" aria-hidden="true">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="brule-password"
                    className="brule-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                </div>
              </div>

              <button className="brule-btn" type="submit" disabled={loading}>
                <span className="brule-btn-shimmer" />
                <span style={{ position: 'relative', zIndex: 1 }}>
                  {loading ? 'Signing in…' : 'Sign In'}
                </span>
              </button>
            </form>

            <p className="brule-footer">
              Leaxie Cafe Management System &copy; {new Date().getFullYear()}
            </p>
          </div>

        </div>
      </div>
    </>
  );
};

export default Login;