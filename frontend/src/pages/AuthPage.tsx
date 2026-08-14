import { useState, type FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { Brand } from '../components/Brand';
import { ErrorMessage } from '../components/StatusViews';
import { api } from '../services/api';
import type { AuthResponse, Role } from '../types';
import { errorMessage } from '../utils/format';

export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [role, setRole] = useState<Role>('STUDENT');

  if (user) return <Navigate to="/dashboard" replace />;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const data = await api<AuthResponse>(`/auth/${mode}`, { method: 'POST', body: JSON.stringify(payload) });
      login(data);
      const requested = (location.state as { from?: string } | null)?.from;
      navigate(requested ?? '/dashboard', { replace: true });
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-layout">
      <section className="auth-story">
        <Brand />
        <div className="auth-story-copy">
          <p className="eyebrow">UN AULA QUE AVANZA CONTIGO</p>
          <h1>Ideas claras.<br />Aprendizaje vivo.</h1>
          <p>Un espacio académico para organizar cursos, compartir avances y convertir cada actividad en una conversación.</p>
        </div>
        <div className="auth-quote"><span>“</span><p>Aprender también es construir comunidad.</p></div>
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
      </section>
      <section className="auth-form-panel">
        <form className="auth-card" onSubmit={submit}>
          <div><p className="eyebrow">{mode === 'login' ? 'QUÉ GUSTO VERTE' : 'EMPIEZA AQUÍ'}</p><h2>{mode === 'login' ? 'Inicia sesión' : 'Crea tu cuenta'}</h2><p>{mode === 'login' ? 'Retoma tus clases y actividades.' : 'Elige cómo participarás en EduRoom.'}</p></div>
          {mode === 'register' && (
            <>
              <label>Nombre completo<input name="name" required minLength={2} maxLength={80} autoComplete="name" placeholder="Tu nombre" /></label>
              <fieldset className="role-picker"><legend>Quiero usar EduRoom como</legend><label className={role === 'STUDENT' ? 'selected' : ''}><input type="radio" name="role" value="STUDENT" checked={role === 'STUDENT'} onChange={() => setRole('STUDENT')} /><span>Estudiante<small>Unirme y entregar actividades</small></span></label><label className={role === 'TEACHER' ? 'selected' : ''}><input type="radio" name="role" value="TEACHER" checked={role === 'TEACHER'} onChange={() => setRole('TEACHER')} /><span>Docente<small>Crear y acompañar cursos</small></span></label></fieldset>
            </>
          )}
          <label>Correo electrónico<input name="email" type="email" required autoComplete="email" placeholder="nombre@ejemplo.com" /></label>
          <label>Contraseña<input name="password" type="password" required minLength={8} maxLength={72} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} placeholder="Mínimo 8 caracteres" /></label>
          {error && <ErrorMessage message={error} />}
          <button className="button button-primary button-block" disabled={busy}>{busy ? 'Procesando…' : mode === 'login' ? 'Entrar a mi aula' : 'Crear mi cuenta'}</button>
          <p className="auth-switch">{mode === 'login' ? '¿Aún no tienes cuenta?' : '¿Ya tienes una cuenta?'} <Link to={mode === 'login' ? '/register' : '/login'}>{mode === 'login' ? 'Regístrate' : 'Inicia sesión'}</Link></p>
        </form>
        <p className="auth-note">Prototipo educativo independiente · Sin afiliación con Google</p>
      </section>
    </main>
  );
}
