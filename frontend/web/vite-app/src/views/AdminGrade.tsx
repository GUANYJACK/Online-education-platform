import { useState } from 'react';
import type { Klass, NavState } from '../types';
import { SUBJECTS } from '../lib/data';
import { classMastery, classRiskDist } from '../lib/mastery';
import { classDisplayName, subjectLabel, t } from '../lib/i18n';
import { pct } from '../lib/format';
import { Card, Icon, ProgressBar, StatTile, SubjectChip } from '../components/primitives';

interface ViewAdminGradeProps {
  classes: Klass[];
  onNavigate: (n: NavState) => void;
}

export function ViewAdminGrade({ classes, onNavigate }: ViewAdminGradeProps) {
  const grades = [...new Set(classes.map((c) => c.grade))].sort((a, b) => a - b);
  const [selectedGrade, setSelectedGrade] = useState(grades[0]);

  const inGrade = classes.filter((c) => c.grade === selectedGrade);
  const totalStudents = inGrade.reduce((a, c) => a + c.students.length, 0);
  const avgMastery =
    inGrade.reduce((a, c) => a + classMastery(c) * c.students.length, 0) / (totalStudents || 1);
  const totalRisk = inGrade.reduce(
    (acc, c) => { const r = classRiskDist(c); acc.high += r.high; acc.medium += r.medium; return acc; },
    { high: 0, medium: 0 },
  );

  return (
    <div className="view view-admin-grade">
      <div className="view__header">
        <div>
          <h1 className="view__title">{t('Grade View')}</h1>
          <p className="view__sub">{t('Compare classes within each grade level')}</p>
        </div>
      </div>

      <div className="grade-tabs" style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {grades.map((g) => (
          <button
            key={g}
            className={`btn${selectedGrade === g ? ' btn--primary' : ' btn--ghost'}`}
            onClick={() => setSelectedGrade(g)}
          >
            {t('Grade {n}', { n: g })}
          </button>
        ))}
      </div>

      <div className="kpi-grid" style={{ marginBottom: 20 }}>
        <StatTile label={t('Classes')} value={inGrade.length} hint={t('Grade {n}', { n: selectedGrade })} />
        <StatTile label={t('Students')} value={totalStudents} />
        <StatTile label={t('Avg. mastery')} value={`${pct(avgMastery)}%`} />
        <StatTile
          label={t('At-risk students')}
          value={totalRisk.high + totalRisk.medium}
          hint={t('{h} high · {m} medium', { h: totalRisk.high, m: totalRisk.medium })}
          accent="var(--risk)"
        />
      </div>

      <Card padded={false}>
        <div className="section-head section-head--card" style={{ padding: '14px 20px' }}>
          <h3>{t('Grade {n} classes', { n: selectedGrade })}</h3>
          <span className="hint-muted">{t('{n} classes', { n: inGrade.length })}</span>
        </div>
        <table className="table table--admin">
          <thead>
            <tr>
              <th>{t('Class')}</th>
              <th>{t('Subject')}</th>
              <th>{t('Teacher')}</th>
              <th>{t('Students')}</th>
              <th>{t('Avg. mastery')}</th>
              <th>{t('At-risk')}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {inGrade.map((c) => {
              const subject = SUBJECTS.find((s) => s.id === c.subjectId)!;
              const mastery = classMastery(c);
              const risk = classRiskDist(c);
              return (
                <tr key={c.id} style={{ cursor: 'pointer' }}
                    onClick={() => onNavigate({ view: 'class-detail', classId: c.id })}>
                  <td><b>{classDisplayName(c)}</b></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <SubjectChip subject={subject} size="sm" />
                      {subjectLabel(subject)}
                    </div>
                  </td>
                  <td>{c.teacher ?? '—'}</td>
                  <td>{c.students.length}</td>
                  <td style={{ width: '26%' }}>
                    <div className="cell-mastery">
                      <ProgressBar value={mastery} height={5} />
                      <span style={{ fontVariantNumeric: 'tabular-nums' }}>{pct(mastery)}%</span>
                    </div>
                  </td>
                  <td>
                    <span className="risk-summary">
                      <i className="risk__bullet risk__bullet--high" />{risk.high}
                      <i className="risk__bullet risk__bullet--medium" style={{ marginLeft: 8 }} />{risk.medium}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <button className="link"
                            onClick={() => onNavigate({ view: 'class-detail', classId: c.id })}>
                      {t('View')} <Icon name="chevron" size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
