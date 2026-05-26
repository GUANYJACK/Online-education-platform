import { useState, FormEvent } from 'react';
import type { Lang } from '../types';
import { setLang as setI18nLang, t, useLang } from '../lib/i18n';
import { classNames } from '../lib/format';

interface JoinSchoolProps {
  onJoin: () => void;
}

export function ViewJoinSchool({ onJoin }: JoinSchoolProps) {
  const [lang, setLangState] = useState<Lang>(
    () => (localStorage.getItem('lumen_lang') as Lang) || 'en',
  );
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useLang();

  function handleLangChange(l: Lang) {
    setLangState(l);
    setI18nLang(l);
    localStorage.setItem('lumen_lang', l);
  }

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
        <div className="auth-card__toprow">
          <div className="auth-brand">
            <div className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M4 18 12 4l8 14H4z" fill="currentColor" />
                <circle cx="12" cy="14" r="2.5" fill="var(--bg-elev)" />
              </svg>
            </div>
            <span className="auth-brand__name">{t('Smart Learn')}</span>
          </div>
          <div className="role-switch" role="tablist" aria-label="Language">
            <button
              role="tab"
              aria-selected={lang === 'en'}
              className={classNames('role-switch__opt', lang === 'en' && 'is-active')}
              onClick={() => handleLangChange('en')}
            >
              EN
            </button>
            <button
              role="tab"
              aria-selected={lang === 'zh-TW'}
              className={classNames('role-switch__opt', lang === 'zh-TW' && 'is-active')}
              onClick={() => handleLangChange('zh-TW')}
            >
              繁中
            </button>
          </div>
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
