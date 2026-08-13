import { FormEvent, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { api } from './api';
import { useAuth } from './AuthContext';
import type { AuthResponse, Course } from './types';

function AuthPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  if (user) return <Navigate to="/cursos" replace />;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError('');
    const form = new FormData(event.currentTarget);
    try {
      const payload = Object.fromEntries(form.entries());
      const data = await api<AuthResponse>(`/auth/${mode}`, { method: 'POST', body: JSON.stringify(payload) });
      login(data); navigate('/cursos');
    } catch (err) { setError(err instanceof Error ? err.message : 'Error inesperado'); }
    finally { setBusy(false); }
  }

  return <main className="auth-layout">
    <section className="welcome-panel"><div className="brand-mark">E</div><p className="eyebrow">APRENDIZAJE CON PROPÓSITO</p><h1>Tu espacio para enseñar, aprender y avanzar.</h1><p>EduRoom reúne cursos y comunidad en una experiencia sencilla, original y enfocada.</p></section>
    <section className="auth-panel"><form className="auth-card" onSubmit={submit}>
      <p className="eyebrow">EDUROOM</p><h2>{mode === 'login' ? 'Te damos la bienvenida' : 'Crea tu cuenta'}</h2>
      {mode === 'register' && <label>Nombre<input name="name" required minLength={2} autoComplete="name" /></label>}
      <label>Correo electrónico<input name="email" type="email" required autoComplete="email" /></label>
      <label>Contraseña<input name="password" type="password" required minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /></label>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="primary" disabled={busy}>{busy ? 'Procesando…' : mode === 'login' ? 'Ingresar' : 'Registrarme'}</button>
      <button className="text-button" type="button" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>{mode === 'login' ? '¿No tienes cuenta? Regístrate' : 'Ya tengo una cuenta'}</button>
    </form></section>
  </main>;
}

function Dashboard() {
  const { user, logout } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState('');
  const [dialog, setDialog] = useState<'create' | 'join' | null>(null);
  const load = () => api<Course[]>('/courses').then(setCourses).catch((err) => setError(err.message));
  useEffect(() => { void load(); }, []);
  if (!user) return <Navigate to="/" replace />;

  async function submitCourse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError('');
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try { await api(dialog === 'create' ? '/courses' : '/courses/join', { method: 'POST', body: JSON.stringify(payload) }); setDialog(null); load(); }
    catch (err) { setError(err instanceof Error ? err.message : 'Error inesperado'); }
  }

  return <div className="shell">
    <header><a className="logo" href="/cursos"><span>E</span> EduRoom</a><div className="profile"><span>{user.name}</span><button onClick={logout}>Salir</button></div></header>
    <main className="dashboard">
      <div className="page-heading"><div><p className="eyebrow">MI ESPACIO</p><h1>Cursos</h1><p>Continúa donde lo dejaste o explora una nueva materia.</p></div><div className="actions">{['TEACHER', 'ADMIN'].includes(user.role) && <button className="secondary" onClick={() => setDialog('create')}>Crear curso</button>}<button className="primary" onClick={() => setDialog('join')}>Unirme con código</button></div></div>
      {error && <p className="error" role="alert">{error}</p>}
      <section className="course-grid" aria-label="Cursos inscritos">
        {courses.map((course) => <article className="course-card" key={course.id}><div className="course-accent" style={{ background: course.color }} /><div className="course-body"><span className="tag">{course.membershipRole === 'TEACHER' ? 'Docente' : 'Estudiante'}</span><h2>{course.title}</h2><p>{course.description || 'Sin descripción.'}</p><footer><span>{course.memberCount} integrante{course.memberCount === 1 ? '' : 's'}</span><strong>{course.code}</strong></footer></div></article>)}
        {!courses.length && <div className="empty"><span>◎</span><h2>Aún no hay cursos</h2><p>Únete con un código para comenzar.</p></div>}
      </section>
    </main>
    {dialog && <div className="modal-backdrop" onMouseDown={() => setDialog(null)}><form className="modal" onSubmit={submitCourse} onMouseDown={(e) => e.stopPropagation()}><button className="close" type="button" onClick={() => setDialog(null)}>×</button><h2>{dialog === 'create' ? 'Nuevo curso' : 'Unirse a un curso'}</h2>{dialog === 'create' ? <><label>Nombre<input name="title" required minLength={3} /></label><label>Descripción<textarea name="description" maxLength={500} /></label><label>Color<input name="color" type="color" defaultValue="#315f72" /></label></> : <label>Código del curso<input name="code" required autoFocus /></label>}<button className="primary">Confirmar</button></form></div>}
  </div>;
}

export default function App() {
  return <Routes><Route path="/" element={<AuthPage />} /><Route path="/cursos" element={<Dashboard />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}
