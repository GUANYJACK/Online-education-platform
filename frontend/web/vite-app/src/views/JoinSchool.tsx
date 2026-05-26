import { useState, FormEvent } from 'react';
import { t } from '../lib/i18n';

interface JoinSchoolProps {
  onJoin: () => void;
}

export function ViewJoinSchool({ onJoin }: JoinSchoolProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!code.trim()) { setError(t('Please enter a school code')); return; }
    setLoading(true);
    // MVP: accept any non-empty code
    setTimeout(() => { setLoading(false); onJoin(); }, 600);
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
              <path d="M4 18 12 4l8 14H4z" fill="currentColor" />
              <circle cx="12" cy="14" r="2.5" fill="var(--bg-elev)" />
            </svg>
          </div>
          <span className="auth-brand__name">Lumen</span>
        </div>

        <div style={{ marginBottom: 20 }}>
          <h2 style={{ margin: '0 0 6px', fontSize: '1.15rem', fontWeight: 700 }}>
            {t('Join your school')}
          </h2>
          <p className="hint-muted" style={{ margin: 0 }}>
            {t('Enter the code provided by your school administrator.')}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            {t('School code')}
            <input
              className="auth-input"
              type="text"
              placeholder="e.g. LAKESIDE-2026"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              autoFocus
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? t('Joining…') : t('Join school')}
          </button>
        </form>

        <button
          className="link"
          style={{ marginTop: 14, display: 'block', textAlign: 'center', fontSize: '0.85rem' }}
          onClick={onJoin}
        >
          {t('Skip for now')}
        </button>
      </div>
    </div>
  );
}
