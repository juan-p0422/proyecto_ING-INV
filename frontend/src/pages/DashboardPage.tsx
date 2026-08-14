import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useAuth } from '../AuthContext';
import { CourseCard } from '../components/CourseCard';
import { Layout } from '../components/Layout';
import { Modal } from '../components/Modal';
import { EmptyState, ErrorMessage, LoadingState, SuccessMessage } from '../components/StatusViews';
import { api } from '../services/api';
import type { Course } from '../types';
import { errorMessage } from '../utils/format';

export function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [dialog, setDialog] = useState<'create' | 'join' | null>(null);
  const [busy, setBusy] = useState(false);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setCourses(await api<Course[]>('/courses')); }
    catch (requestError) { setError(errorMessage(requestError)); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { void loadCourses(); }, [loadCourses]);

  async function submitCourse(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!dialog) return;
    setBusy(true);
    setError('');
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await api<Course>(dialog === 'create' ? '/courses' : '/courses/join', { method: 'POST', body: JSON.stringify(payload) });
      setNotice(dialog === 'create' ? 'Curso creado correctamente.' : 'Te uniste al curso correctamente.');
      setDialog(null);
      await loadCourses();
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setBusy(false);
    }
  }

  const firstName = user?.name.split(' ')[0] ?? '';
  return (
    <Layout wide>
      <section className="dashboard-hero">
        <div><p className="eyebrow">TU ESPACIO DE APRENDIZAJE</p><h1>Hola, {firstName}.</h1><p>{user?.role === 'TEACHER' ? 'Diseña la próxima experiencia que recordará tu grupo.' : 'Todo está listo para continuar aprendiendo.'}</p></div>
        <div className="dashboard-actions">
          {user?.role === 'TEACHER' ? <button className="button button-primary" onClick={() => { setNotice(''); setDialog('create'); }}><span>＋</span> Crear curso</button> : <button className="button button-primary" onClick={() => { setNotice(''); setDialog('join'); }}><span>＋</span> Unirme con código</button>}
        </div>
      </section>

      <section className="courses-section" aria-labelledby="courses-title">
        <div className="section-heading"><div><p className="eyebrow">COLECCIÓN ACTIVA</p><h2 id="courses-title">Mis cursos</h2></div><span>{courses.length} {courses.length === 1 ? 'curso' : 'cursos'}</span></div>
        {notice && <SuccessMessage>{notice}</SuccessMessage>}
        {error && <ErrorMessage message={error} onRetry={loadCourses} />}
        {loading ? <LoadingState label="Preparando tus cursos" /> : courses.length ? <div className="course-grid">{courses.map((course) => <CourseCard course={course} key={course.id} />)}</div> : <EmptyState icon="◇" title="Tu aula está por comenzar" description={user?.role === 'TEACHER' ? 'Crea tu primer curso para invitar estudiantes.' : 'Usa el código que te compartió tu docente para unirte.'} />}
      </section>

      {dialog && (
        <Modal title={dialog === 'create' ? 'Crear un nuevo curso' : 'Unirme a un curso'} onClose={() => setDialog(null)}>
          <form className="stack-form" onSubmit={submitCourse}>
            {dialog === 'create' ? <><label>Nombre del curso<input name="title" required minLength={3} maxLength={120} autoFocus placeholder="Ej. Diseño de interacción" /></label><label>Descripción<textarea name="description" maxLength={2000} rows={4} placeholder="¿Qué aprenderá el grupo?" /></label><label>Color distintivo<div className="color-field"><input name="color" type="color" defaultValue="#1b6b63" /><span>Elige un acento para identificar el curso.</span></div></label></> : <><p className="modal-description">Escribe el código de acceso proporcionado por tu docente.</p><label>Código del curso<input className="code-input" name="code" required minLength={4} maxLength={20} autoFocus autoComplete="off" placeholder="EJ. AULA2026" /></label></>}
            <div className="form-actions"><button className="button button-ghost" type="button" onClick={() => setDialog(null)}>Cancelar</button><button className="button button-primary" disabled={busy}>{busy ? 'Guardando…' : dialog === 'create' ? 'Crear curso' : 'Unirme ahora'}</button></div>
          </form>
        </Modal>
      )}
    </Layout>
  );
}
