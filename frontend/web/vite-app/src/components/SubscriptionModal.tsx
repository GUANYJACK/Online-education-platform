import { useEffect } from 'react';
import { t } from '../lib/i18n';

interface SubscriptionModalProps {
  onClose: () => void;
}

const TIERS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/mo',
    desc: 'Get started with the basics.',
    cta: 'Current plan',
    ctaVariant: 'ghost' as const,
    features: ['1 class', 'Up to 30 students', 'Mastery tracking', 'Basic reports'],
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$12',
    period: '/mo per teacher',
    desc: 'Everything a teacher needs.',
    cta: 'Upgrade to Pro',
    ctaVariant: 'primary' as const,
    features: ['Unlimited classes', 'Unlimited students', 'AI summaries', 'Mental health module', 'Export reports', 'Priority support'],
    highlight: true,
  },
  {
    id: 'school',
    name: 'School',
    price: 'Custom',
    period: '',
    desc: 'Institution-wide rollout.',
    cta: 'Contact sales',
    ctaVariant: 'ghost' as const,
    features: ['All Pro features', 'Admin dashboard', 'School-wide analytics', 'SSO / LMS integration', 'Dedicated CSM', 'SLA guarantee'],
    highlight: false,
  },
];

// 'Custom' price is untranslated intentionally (brand term)

export function SubscriptionModal({ onClose }: SubscriptionModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <div>
            <div className="modal-title">{t('Subscription')}</div>
            <div className="modal-sub">{t('Simple, transparent pricing. Cancel anytime.')}</div>
          </div>
          <button className="modal-close iconbtn" onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>

        <div className="pricing-grid">
          {TIERS.map((tier) => (
            <div key={tier.id} className={`pricing-card card${tier.highlight ? ' pricing-card--highlight' : ''}`}>
              {tier.highlight && <div className="pricing-badge">{t('Most popular')}</div>}
              <div className="pricing-tier">{t(tier.name)}</div>
              <div className="pricing-price">
                <span className="pricing-amount">{tier.price}</span>
                {tier.period && <span className="pricing-period">{t(tier.period)}</span>}
              </div>
              <div className="pricing-desc">{t(tier.desc)}</div>
              <button className={`btn btn--${tier.ctaVariant} pricing-cta`}>{t(tier.cta)}</button>
              <ul className="pricing-features">
                {tier.features.map((f) => (
                  <li key={f} className="pricing-feature">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="2,7 5.5,10.5 12,3.5" />
                    </svg>
                    {t(f)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
