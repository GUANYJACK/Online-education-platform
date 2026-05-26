// App shell — left nav, top bar, view router.

import { useEffect, useState } from 'react';
import type { Lang, NavState, Role, TweakState, UserProfile } from './types';
import { CLASSES_ALL, CLASSES_TEACHER } from './lib/data';
import { hexToSoft } from './lib/format';
import { classDisplayName, setLang, t, useLang } from './lib/i18n';

import { Sidebar } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { SubscriptionModal } from './components/SubscriptionModal';
import { SettingsModal } from './components/SettingsModal';

import { ViewDashboard } from './views/Dashboard';
import { ViewClassesIndex } from './views/Classes';
import { ViewClassDetail } from './views/ClassDetail';
import { ViewStudentDetail } from './views/StudentDetail';
import { ViewStudents } from './views/Students';
import { ViewMentalHealth } from './views/MentalHealth';
import { ViewAdminSchool } from './views/AdminSchool';
import { ViewAdminGrade } from './views/AdminGrade';
import { ViewAdminClasses } from './views/AdminClasses';
import { ViewAdminTeachers } from './views/AdminTeachers';
import { ViewLogin } from './views/Login';
import { ViewJoinSchool } from './views/JoinSchool';

const ACCENT = '#2f5cff';

interface AuthUser { id: number; name: string; role: string; }

function deriveRole(user: AuthUser): Role {
  return user.role === 'SCHOOL_ADMIN' ? 'admin' : 'teacher';
}

function initialNav(user: AuthUser | null): NavState {
  if (!user) return { view: 'dashboard' };
  return { view: deriveRole(user) === 'admin' ? 'admin-school' : 'dashboard' };
}

export function App() {
  const [lang, setLangState] = useState<Lang>('en');
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    try { return JSON.parse(localStorage.getItem('lumen_user') || 'null'); } catch { return null; }
  });
  const [nav, setNav] = useState<NavState>(() => initialNav(
    (() => { try { return JSON.parse(localStorage.getItem('lumen_user') || 'null'); } catch { return null; } })()
  ));
  const [schoolJoined, setSchoolJoined] = useState(() =>
    localStorage.getItem('lumen_school_joined') === 'true'
  );
  const [collapsed, setCollapsed] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useLang();

  useEffect(() => { setLang(lang); }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = 'light';
    root.dataset.density = 'comfortable';
    root.style.setProperty('--accent', ACCENT);
    root.style.setProperty('--accent-soft', hexToSoft(ACCENT, 0.12));
    root.style.setProperty('--accent-strong', hexToSoft(ACCENT, 0.22));
  }, []);

  function handleLogin(token: string, user: AuthUser) {
    localStorage.setItem('lumen_token', token);
    localStorage.setItem('lumen_user', JSON.stringify(user));
    setAuthUser(user);
    setNav(initialNav(user));
  }

  function handleLogout() {
    localStorage.removeItem('lumen_token');
    localStorage.removeItem('lumen_user');
    setAuthUser(null);
    setNav({ view: 'dashboard' });
  }

  function handleJoinSchool() {
    localStorage.setItem('lumen_school_joined', 'true');
    setSchoolJoined(true);
  }

  if (!authUser) return <ViewLogin onLogin={handleLogin} />;

  const role = deriveRole(authUser);

  // Teachers see the join-school page once before accessing the app
  if (role === 'teacher' && !schoolJoined) {
    return <ViewJoinSchool onJoin={handleJoinSchool} />;
  }

  const isAdmin = role === 'admin';
  const classes = CLASSES_TEACHER;
  const allClasses = CLASSES_ALL;

  // Resolve class and student for detail views — search across all classes for admin
  const klassSource = isAdmin ? allClasses : classes;
  const klass = nav.classId ? klassSource.find((c) => c.id === nav.classId) : undefined;
  const student = nav.studentId && klass ? klass.students.find((s) => s.id === nav.studentId) : undefined;

  const profile: UserProfile = {
    name: authUser.name,
    role: isAdmin ? t('School Administrator') : t('Mathematics · Grade 7–8'),
  };

  const homeNav: NavState = { view: isAdmin ? 'admin-school' : 'dashboard' };
  const home = () => ({ label: isAdmin ? t('School Overview') : t('Dashboard'), onClick: () => setNav(homeNav) });

  let crumbs: Array<{ label: string; onClick?: () => void }>;
  switch (nav.view) {
    case 'dashboard':       crumbs = [{ label: t('Dashboard') }]; break;
    case 'admin-school':    crumbs = [{ label: t('School Overview') }]; break;
    case 'admin-grade':     crumbs = [home(), { label: t('Grade View') }]; break;
    case 'admin-classes':   crumbs = [home(), { label: t('All Classes') }]; break;
    case 'admin-teachers':  crumbs = [home(), { label: t('Teachers') }]; break;
    case 'classes':         crumbs = [home(), { label: t('Classes') }]; break;
    case 'class-detail':    crumbs = [
      home(),
      { label: t('Classes'), onClick: () => setNav({ view: isAdmin ? 'admin-classes' : 'classes' }) },
      { label: klass ? classDisplayName(klass) : t('Class') },
    ]; break;
    case 'student-detail':  crumbs = [
      home(),
      { label: klass ? classDisplayName(klass) : t('Class'),
        onClick: () => setNav({ view: 'class-detail', classId: nav.classId }) },
      { label: student ? student.name : t('Student') },
    ]; break;
    case 'students':        crumbs = [home(), { label: t('Students') }]; break;
    case 'mental-health':   crumbs = [home(), { label: t('Mental Health') }]; break;
    default:                crumbs = [home()];
  }

  const tweak: TweakState = {
    role,
    density: 'comfortable',
    accent: [ACCENT, '#0e1422', '#e7e9ef'],
    sidebar: collapsed ? 'collapsed' : 'labeled',
    chartStyle: 'stacked',
    dark: false,
    lang,
  };

  return (
    <div className="app">
      <Sidebar
        view={nav.view}
        onNavigate={(n) => setNav(n as NavState)}
        role={role}
        collapsed={collapsed}
        onCollapsedToggle={() => setCollapsed((v) => !v)}
        onSubscriptionClick={() => setShowSubscription(true)}
        onSettingsClick={() => setShowSettings(true)}
        onLogout={handleLogout}
      />

      <div className="main">
        <Topbar
          breadcrumbs={crumbs}
          profile={profile}
          lang={lang}
          onLangChange={setLangState}
        />

        <main className="main__body">
          {/* Teacher views */}
          {nav.view === 'dashboard' && (
            <ViewDashboard classes={classes} onNavigate={setNav} profile={profile} tweak={tweak} />
          )}
          {nav.view === 'classes' && (
            <ViewClassesIndex classes={classes} onNavigate={setNav} />
          )}
          {nav.view === 'students' && (
            <ViewStudents classes={classes} onNavigate={setNav} />
          )}

          {/* Shared views */}
          {nav.view === 'class-detail' && klass && (
            <ViewClassDetail klass={klass} onNavigate={setNav} focusPointId={nav.focusPointId} tweak={tweak} />
          )}
          {nav.view === 'student-detail' && student && klass && (
            <ViewStudentDetail student={student} klass={klass} onNavigate={setNav} />
          )}
          {nav.view === 'mental-health' && (
            <ViewMentalHealth classes={isAdmin ? allClasses : classes} onNavigate={setNav} />
          )}

          {/* Admin views */}
          {nav.view === 'admin-school' && (
            <ViewAdminSchool classes={allClasses} onNavigate={setNav} />
          )}
          {nav.view === 'admin-grade' && (
            <ViewAdminGrade classes={allClasses} onNavigate={setNav} />
          )}
          {nav.view === 'admin-classes' && (
            <ViewAdminClasses classes={allClasses} onNavigate={setNav} />
          )}
          {nav.view === 'admin-teachers' && (
            <ViewAdminTeachers classes={allClasses} onNavigate={setNav} />
          )}
        </main>
      </div>

      {showSubscription && <SubscriptionModal onClose={() => setShowSubscription(false)} />}
      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          profile={profile}
          lang={lang}
          onLangChange={setLangState}
        />
      )}
    </div>
  );
}
