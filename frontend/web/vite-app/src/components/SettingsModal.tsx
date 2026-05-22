import { useEffect, useState } from 'react';
import type { Lang, UserProfile } from '../types';
import { classNames } from '../lib/format';
import { t } from '../lib/i18n';
import { Avatar } from './primitives';

interface Props {
  onClose: () => void;
  profile: UserProfile;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export function SettingsModal({ onClose, profile, lang, onLangChange }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog modal-dialog--sm" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-title">{t('Settings')}</div>
          <button className="modal-close iconbtn" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>

        <div className="settings-section">
          <div className="settings-label">{t('Profile')}</div>
          <div className="settings-profile card card--padded">
            <Avatar name={profile.name} size={48} />
            <div>
              <div className="settings-profile__name">{profile.name}</div>
              <div className="settings-profile__role">{profile.role}</div>
            </div>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-label">{t('Language')}</div>
          <div className="role-switch" style={{ alignSelf: 'flex-start' }}>
            <button
              role="tab"
              aria-selected={lang === 'en'}
              className={classNames('role-switch__opt', lang === 'en' && 'is-active')}
              onClick={() => onLangChange('en')}
            >
              English
            </button>
            <button
              role="tab"
              aria-selected={lang === 'zh-TW'}
              className={classNames('role-switch__opt', lang === 'zh-TW' && 'is-active')}
              onClick={() => onLangChange('zh-TW')}
            >
              繁體中文
            </button>
          </div>
        </div>

        <div className="settings-section">
          <div className="settings-label">{t('Notifications')}</div>
          <div className="settings-toggles">
            <SettingsToggle label={t('Activity alerts')} defaultOn />
            <SettingsToggle label={t('Weekly digest')} defaultOn />
            <SettingsToggle label={t('At-risk student alerts')} defaultOn />
          </div>
        </div>

        <div className="settings-foot">
          <button className="btn btn--ghost settings-signout">{t('Sign out')}</button>
        </div>
      </div>
    </div>
  );
}

function SettingsToggle({ label, defaultOn }: { label: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(!!defaultOn);
  return (
    <div className="settings-toggle-row">
      <span className="settings-toggle-label">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        className={`stoggle${on ? ' stoggle--on' : ''}`}
        onClick={() => setOn((v) => !v)}
      >
        <span className="stoggle__thumb" />
      </button>
    </div>
  );
}
