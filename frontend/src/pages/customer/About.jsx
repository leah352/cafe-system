import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from '../../components/common/ErrorBoundary';
import AvatarWithSkeleton from '../../components/common/AvatarWithSkeleton';
import Panel from '../../components/common/Panel';

const About = () => {
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    try {
      // Helpful runtime marker to verify HMR / that the dev server on :3000 serves this file
      // Check your browser console for this message when you load the About page.
      console.log('Leaxie About.jsx loaded — build:', new Date().toISOString());
    } catch (err) {
      // ignore
    }
  }, []);

  const avatarFallback = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="100%" height="100%" fill="%23bbbbbb"/><text x="50%" y="50%" font-size="18" text-anchor="middle" fill="%23666" dy=".3em">Photo</text></svg>';

  const handleImgError = (e) => {
    try {
      e.currentTarget.onerror = null;
      e.currentTarget.src = avatarFallback;
    } catch (err) {
      // ignore errors to keep UI stable
    }
  };

  return (
    <ErrorBoundary>
    <>
      <style>{`
        :root {
          --accent: #dcae3c;
          --muted: rgba(255,255,255,0.85);
          --card-bg: rgba(255,255,255,0.02);
          --card-border: rgba(232,201,122,0.06);
          --focus-ring: rgba(221, 168, 32, 0.18);
          --panel-bg: rgba(184,139,74,0.06);
          --panel-border: rgba(52, 35, 11, 0.87);
          --panel-accent: #b88b4a;
          --panel-text: rgba(255,255,255,0.95);
        }

        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; }
        }

        .about-hero {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:24px;
          margin: 28px 0 20px;
          background: linear-gradient(180deg, rgba(47, 38, 19, 0.18), rgba(235, 160, 12, 0.12));
          padding:18px;
          border-radius:12px;
        }

        .about-title {
          font-family: 'Playfair Display', serif;
          color: rgba(255,255,255,0.95); /* keep title white for contrast */
          font-size: 36px;
          margin: 0;
        }

        .about-sub {
          color: rgba(255,255,255,0.75);
          margin-top: 8px;
          max-width: 720px;
          line-height: 1.6;
        }

        .profiles {
          display:grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 20px;
        }

        .card {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          padding: 20px;
          border-radius: 14px;
          display:flex;
          gap:16px;
          align-items:flex-start;
          box-shadow: 0 8px 30px rgba(0,0,0,0.45);
          min-height: 140px;
        }

        .avatar {
          width:120px;
          height:120px;
          border-radius: 12px;
          object-fit:cover;
          border: 3px solid rgba(232,201,122,0.12);
          box-shadow: 0 6px 18px rgba(0,0,0,0.5);
          flex-shrink:0;
          background-color: #e6e6e6;
        }
        .skeleton { background: linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)); animation: pulse 1.2s infinite; }
        .avatar-skeleton { border-radius:12px }
        @keyframes pulse { 0% { opacity: 0.85 } 50% { opacity: 0.7 } 100% { opacity: 0.85 } }

        .testimonial { min-height: 110px }

        .meta h3 { margin:0; color:#fff; font-family: 'Playfair Display', serif }
        .meta p { margin:6px 0 0; color: rgba(255,255,255,0.8); font-size:14px }

        @media (max-width:800px) {
          .about-hero { flex-direction:column; align-items:flex-start }
          .profiles { grid-template-columns: 1fr }
        }
        .mission-section { margin-top:24px; background: rgba(228, 128, 28, 0.01); padding:14px; border-radius:10px; border:1px solid rgba(232,201,122,0.04) }
        .mission-section h2 { color:var(--accent); margin:0 0 8px; font-family: 'Playfair Display', serif; display:flex; gap:8px; align-items:center }
        .mission-text { color: var(--muted); line-height:1.6; margin:0 }
        /* Buttons and focus styles (accessibility) */
        .btn-primary { display:inline-block; padding:10px 14px; border-radius:8px; background:#e8c97a; color:#1b1b1b; text-decoration:none; font-weight:600; border:none; cursor:pointer }
        .btn-primary:focus { outline:3px solid rgba(232,201,122,0.24); outline-offset:2px }
        .social-row { display:flex; gap:8px; margin-top:8px }
        .social-btn { background:transparent; border:1px solid rgba(240, 134, 13, 0.06); padding:8px 10px; border-radius:8px; color:rgba(255,255,255,0.9); display:inline-flex; gap:8px; align-items:center; cursor:pointer }
        .social-btn:focus { outline:3px solid rgba(232,201,122,0.18); outline-offset:2px }
        .copy-note { color: rgba(232,201,122,0.95); margin-left:8px; font-weight:600 }
        .map-container { border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.04) }
        .map-iframe { width:100%; height:300px; border:0; display:block }
        .panel { margin-top:18px; border-radius:10px; overflow:hidden; border:1px solid var(--panel-border); background: linear-gradient(180deg, rgba(184,139,74,0.03), rgba(0,0,0,0.02)); }
        .panel-header { padding:10px 14px; border-bottom:1px solid rgba(255,255,255,0.02); background: rgba(184,139,74,0.02) }
        .panel-toggle { width:100%; text-align:left; background:transparent; border:0; color:var(--panel-accent); font-family:'Playfair Display', serif; font-size:18px; display:flex; justify-content:space-between; align-items:center; padding:6px 0; cursor:pointer }
        .panel-toggle:focus { outline:3px solid var(--focus-ring); outline-offset:2px }
        .panel-body { padding:12px 14px; color: var(--panel-text) }

        /* Leaxie overrides: make cards/panels use the beige sign-in panel and dark text */
        .card, .panel, .panel .panel-body { background: var(--panel) !important; color: var(--text-dark) !important; border: 0.5px solid var(--panel-border) !important; }
        .card, .panel { border-radius: 10px !important; }
        .card svg, .panel svg, .card svg *, .panel svg * { stroke: var(--text-dark) !important; fill: var(--text-dark) !important; }
        /* Utility to force dark text color for a block */
        .dark-text, .dark-text * { color: #111827 !important; fill: #111827 !important; stroke: #111827 !important; }
        /* Keep the about summary paragraph white for contrast */
        .dark-text .about-sub { color: rgba(255,255,255,0.9) !important; }
        /* Force About Us title white even when parent forces dark text */
        .dark-text .about-title { color: rgba(255,255,255,0.95) !important; }
      `}</style>

      <div className="dark-text" style={{marginTop:20}}>
        <div className="about-hero">
          <div>
            <h1 className="about-title">About Us</h1>
            <p className="about-sub">Leaxie Cafe is crafted by students who love coffee and clean experiences. We focus on a minimal, elegant ordering flow and excellent service.</p>
          </div>
          <div style={{display:'flex', gap:12}}>
            <Link to="/menu" className="btn-primary">Browse Menu</Link>
          </div>
        </div>

        <div className="profiles">
          <div className="card">
            <img src="/images/leah.jpg" alt="Leah T. Rama" className="avatar" onError={handleImgError} />
            <div className="meta">
              <h3>Leah T. Rama</h3>
              <p>3rd Year Computer Science Student. Passionate about web apps, UX, and building delightful ordering experiences for customers.</p>
            </div>
          </div>

          <div className="card">
            <img src="/images/dixie.jpg" alt="Dixie Joy Ortado" className="avatar" onError={handleImgError} />
            <div className="meta">
              <h3>Dixie Joy Ortado</h3>
              <p>3rd Year Computer Science Student. Focused on front-end design, accessibility, and creating consistent, polished interfaces.</p>
            </div>
          </div>
        </div>

        <Panel title="Mission" id="mission-panel">
          <p className="mission-text">To make specialty coffee approachable and affordable for students while creating a warm, inclusive space for study and socializing.</p>

          <div style={{marginTop:12}}>
            <div style={{display:'flex', alignItems:'center', gap:12}}>
              <div style={{display:'flex', flexDirection:'column'}}>
                <span style={{color:'rgba(255,255,255,0.9)'}}>Follow us</span>
                <div className="social-row">
                  <a href="#" onClick={(e)=>e.preventDefault()} className="social-btn" aria-label="Instagram"> 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="17" cy="7" r="0.7" fill="currentColor" />
                    </svg>
                    Instagram
                  </a>

                  <a href="#" onClick={(e)=>e.preventDefault()} className="social-btn" aria-label="Facebook"> 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M15 3h3v4h-3v14h-4V7H9V3h3V1.5C12 0.67 12.67 0 13.5 0H15v3z" fill="currentColor"/>
                    </svg>
                    Facebook
                  </a>

                  <a href="#" onClick={(e)=>e.preventDefault()} className="social-btn" aria-label="TikTok"> 
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M9 9v6a3 3 0 003 3 3 3 0 003-3V7h2V5h-2V3h-2v2h-2v4H9z" fill="currentColor"/>
                    </svg>
                    TikTok
                  </a>
                </div>
              </div>

              <div style={{display:'flex', flexDirection:'column', gap:8}}>
                <CopyAddress />
                <div>
                  <button type="button" onClick={() => setShowMap(s => !s)} className="btn-primary" aria-expanded={showMap} aria-controls="contact-map">{showMap ? 'Hide Map' : 'Show Map'}</button>
                </div>
              </div>
            </div>
          </div>
        </Panel>

        <div id="contact-map" role="region" aria-live="polite" style={{marginTop:12}}>
          {showMap && (
            <div className="map-container">
              <iframe
                className="map-iframe"
                title="Leaxie Cafe location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-popups"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.0000000000005!2d121.00000000000001!3d14.000000000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAwJzAwLjAiTiAxMjHCsDAwJzAwLjAiRQ!5e0!3m2!1sen!2sph!4v0000000000000"
              />
            </div>
          )}
        </div>

        <Panel title="Our Values" id="values-panel">
          <ul style={{margin:0, paddingLeft:18, color:'rgba(255,255,255,0.92)', lineHeight:1.6}}>
            <li>Quality ingredients — fresh and thoughtfully sourced.</li>
            <li>Community — welcoming space for students and staff.</li>
            <li>Simplicity — clear menus and fast ordering.</li>
            <li>Sustainability — reduce waste and choose eco options.</li>
          </ul>
        </Panel>

        <Panel title="Testimonials" id="testimonials-panel">
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))', gap:12}}>
            <blockquote style={{background:'rgba(255,255,255,0.02)', padding:12, borderRadius:8, margin:0, color:'rgba(255,255,255,0.92)'}}>
              “Great coffee and quiet space to study — highly recommend!”
              <div style={{marginTop:8, fontWeight:600}}>— Student A</div>
            </blockquote>

            <blockquote style={{background:'rgba(255,255,255,0.02)', padding:12, borderRadius:8, margin:0, color:'rgba(255,255,255,0.92)'}}>
              “Fast service and friendly staff. My go-to morning order.”
              <div style={{marginTop:8, fontWeight:600}}>— Student B</div>
            </blockquote>

            <blockquote style={{background:'rgba(255,255,255,0.02)', padding:12, borderRadius:8, margin:0, color:'rgba(255,255,255,0.92)'}}>
              “Love the simple menu and consistent quality.”
              <div style={{marginTop:8, fontWeight:600}}>— Faculty</div>
            </blockquote>
          </div>
        </Panel>
      </div>
    </>
    </ErrorBoundary>
  );
};

export default About;

function CopyAddress() {
  const [copied, setCopied] = useState(false);
  const address = 'Near campus, City, Philippines';

  const copy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(address);
      } else {
        // Fallback
        const ta = document.createElement('textarea');
        ta.value = address;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      // silently ignore; do not throw
      setCopied(false);
    }
  };

  return (
    <div style={{display:'flex', alignItems:'center', gap:8}}>
      <button onClick={copy} className="btn-primary" aria-label="Copy address">Copy address</button>
      {copied && <span className="copy-note" role="status" aria-live="polite">Copied!</span>}
    </div>
  );
}
