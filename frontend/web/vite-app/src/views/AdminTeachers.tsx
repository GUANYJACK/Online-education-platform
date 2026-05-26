import type { Klass, NavState } from '../types';
import { SUBJECTS } from '../lib/data';
import { classMastery } from '../lib/mastery';
import { subjectLabel, t } from '../lib/i18n';
import { pct } from '../lib/format';
import { Avatar, Card } from '../components/primitives';

interface ViewAdminTeachersProps {
  classes: Klass[];
  onNavigate: (n: NavState) => void;
}

interface TeacherRow {
  name: string;
  classes: Klass[];
}

function buildTeachers(classes: Klass[]): TeacherRow[] {
  const map = new Map<string, TeacherRow>();
  for (const c of classes) {
    const name = c.teacher ?? t('Unassigned');
    if (!map.has(name)) map.set(name, { name, classes: [] });
    map.get(name)!.classes.push(c);
  }
  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));
}

export function ViewAdminTeachers({ classes }: ViewAdminTeachersProps) {
  const teachers = buildTeachers(classes);

  return (
    <div className="view">
      <div className="view__header">
        <div>
          <h1 className="view__title">{t('Teachers')}</h1>
          <p className="view__sub">{t('{n} teachers', { n: teachers.length })}</p>
        </div>
      </div>

      <Card padded={false}>
        <table className="table table--admin">
          <thead>
            <tr>
              <th>{t('Teacher')}</th>
              <th>{t('Subjects taught')}</th>
              <th>{t('Classes')}</th>
              <th>{t('Students')}</th>
              <th>{t('Avg. mastery')}</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => {
              const subjectIds = [...new Set(teacher.classes.map((c) => c.subjectId))];
              const totalStudents = teacher.classes.reduce((a, c) => a + c.students.length, 0);
              const avgMastery =
                teacher.classes.reduce((a, c) => a + classMastery(c) * c.students.length, 0) /
                (totalStudents || 1);
              return (
                <tr key={teacher.name}>
                  <td>
                    <div className="cell-student">
                      <Avatar name={teacher.name} size={32} />
                      <div>
                        <div className="cell-student__name">{teacher.name}</div>
                        <div className="cell-student__id">
                          {t('{n} classes', { n: teacher.classes.length })}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {subjectIds.map((sid) => {
                      const s = SUBJECTS.find((x) => x.id === sid);
                      return s ? (
                        <span key={sid} style={{ marginRight: 8 }}>{subjectLabel(s)}</span>
                      ) : null;
                    })}
                  </td>
                  <td>{teacher.classes.length}</td>
                  <td>{totalStudents}</td>
                  <td>
                    <span style={{ fontVariantNumeric: 'tabular-nums' }}>{pct(avgMastery)}%</span>
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
