import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useOutletContext } from 'react-router-dom';
import { AssignmentCard } from '../components/AssignmentCard';
import { EmptyState, ErrorMessage, LoadingState } from '../components/StatusViews';
import { api } from '../services/api';
import type { Assignment } from '../types';
import { errorMessage } from '../utils/format';
import type { CourseOutletContext } from './CourseLayout';

export function ClassworkPage() {
  const { course } = useOutletContext<CourseOutletContext>();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setAssignments(await api<Assignment[]>(`/courses/${course.id}/assignments`)); }
    catch (requestError) { setError(errorMessage(requestError)); }
    finally { setLoading(false); }
  }, [course.id]);

  useEffect(() => { void load(); }, [load]);

  async function createAssignment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const form = new FormData(event.currentTarget);
    const dueDate = String(form.get('dueDate') ?? '');
    const payload = { title: form.get('title'), description: form.get('description'), dueDate: dueDate ? new Date(dueDate).toISOString() : null };
    try {
      const assignment = await api<Assignment>(`/courses/${course.id}/assignments`, { method: 'POST', body: JSON.stringify(payload) });
      setAssignments((current) => [assignment, ...current]);
      setComposerOpen(false);
    } catch (requestError) { setError(errorMessage(requestError)); }
    finally { setBusy(false); }
  }

  if (loading) return <LoadingState label="Organizando el trabajo de clase" />;
  return (
    <section className="course-content single-column" aria-labelledby="classwork-title">
      <div className="section-heading"><div><p className="eyebrow">RUTA DE APRENDIZAJE</p><h2 id="classwork-title">Trabajo de clase</h2><p>Actividades, instrucciones y progreso del curso.</p></div>{course.membershipRole === 'TEACHER' && <button className="button button-primary" onClick={() => setComposerOpen((value) => !value)}><span>＋</span> Crear tarea</button>}</div>
      {error && <ErrorMessage message={error} onRetry={load} />}
      {composerOpen && (
        <form className="composer-card assignment-composer" onSubmit={createAssignment}>
          <div><span className="content-label">NUEVA ACTIVIDAD</span><h3>Diseña una tarea</h3></div>
          <div className="form-grid"><label className="span-two">Título<input name="title" required maxLength={160} autoFocus placeholder="Nombre de la actividad" /></label><label className="span-two">Instrucciones<textarea name="description" maxLength={10000} rows={4} placeholder="Explica el objetivo y los criterios…" /></label><label>Fecha y hora límite<input name="dueDate" type="datetime-local" /></label></div>
          <div className="form-actions"><button className="button button-ghost" type="button" onClick={() => setComposerOpen(false)}>Cancelar</button><button className="button button-primary" disabled={busy}>{busy ? 'Creando…' : 'Crear tarea'}</button></div>
        </form>
      )}
      <div className="assignment-list">{assignments.map((assignment) => <AssignmentCard assignment={assignment} role={course.membershipRole} key={assignment.id} />)}{!assignments.length && <EmptyState icon="↗" title="Aún no hay actividades" description={course.membershipRole === 'TEACHER' ? 'Crea una tarea para iniciar la ruta de aprendizaje.' : 'Las tareas de este curso aparecerán aquí.'} />}</div>
    </section>
  );
}
