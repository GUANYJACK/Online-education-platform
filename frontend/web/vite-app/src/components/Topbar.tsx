import { Fragment, useRef, useState } from 'react';
import type { Lang, UserProfile } from '../types';
import { classNames } from '../lib/format';
import { t } from '../lib/i18n';
import { Avatar, Icon } from './primitives';
import { NotificationsPanel } from './NotificationsPanel';

export interface Breadcrumb {
  label: string;
  onClick?: () => void;
}

interface TopbarProps {
  breadcrumbs: Breadcrumb[];
  profile: UserProfile;
  lang: Lang;
  onLangChange: (lang: Lang) => void;
}

export function Topbar({ breadcrumbs, profile, lang, onLangChange }: TopbarProps) {
  const [showNotifs, setShowNotifs] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  return (
    <header className="topbar">
      <div className="topbar__bc">
        {breadcrumbs.map((b, i) => (
          <Fragment key={i}>
            {i > 0 && <span className="bc-sep">/</span>}
            <button
              className={classNames('bc-item', i === breadcrumbs.length - 1 && 'bc-item--current')}
              onClick={b.onClick}
              disabled={!b.onClick}
            >
              {b.label}
            </button>
          </Fragment>
        ))}
      </div>
      <div className="topbar__right">
        <div className="role-switch" role="tablist" aria-label={t('Language')}>
          <button
            role="tab"
            aria-selected={lang === 'en'}
            className={classNames('role-switch__opt', lang === 'en' && 'is-active')}
            onClick={() => onLangChange('en')}
          >
            EN
          </button>
          <button
            role="tab"
            aria-selected={lang === 'zh-TW'}
            className={classNames('role-switch__opt', lang === 'zh-TW' && 'is-active')}
            onClick={() => onLangChange('zh-TW')}
          >
            繁中
          </button>
        </div>

        <div ref={bellRef} style={{ position: 'relative' }}>
          <button
            className={classNames('iconbtn', showNotifs && 'iconbtn--active')}
            title={t('Notifications')}
            onClick={() => setShowNotifs((v) => !v)}
          >
            <Icon name="bell" />
            <span className="iconbtn__dot" />
          </button>
          {showNotifs && <NotificationsPanel onClose={() => setShowNotifs(false)} />}
        </div>

        <div className="profile">
          <Avatar name={profile.name} size={32} />
          <div className="profile__meta">
            <div className="profile__name">{profile.name}</div>
            <div className="profile__role">{profile.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
