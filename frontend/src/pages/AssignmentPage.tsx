import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { CommentBox } from '../components/CommentBox';
import { Layout } from '../components/Layout';
import { EmptyState, ErrorMessage, LoadingState, SuccessMessage } from '../components/StatusViews';
import { api } from '../services/api';
import type { Assignment, Comment, Submission } from '../types';
import { errorMessage, formatDate, initials } from '../utils/format';

function GradeForm({ submission, onGraded }: { submission: Submission; onGraded: (value: Submission) => void }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const form = new FormData(event.currentTarget);
    try {
      const graded = await api<Submission>(`/submissions/${submission.id}/grade`, {
        method: 'PATCH',
        body: JSON.stringify({ grade: Number(form.get('grade')), feedback: form.get('feedback') || null }),
      });
      onGraded(graded);
    } catch (requestError) { setError(errorMessage(requestError)); }
    finally { setBusy(false); }
  }

  return (
    <article className="submission-card">
      <header><span className="avatar">{initials(submission.student?.name ?? 'E')}</span><div><strong>{submission.student?.name ?? 'Estudiante'}</strong><span>Entregó el {formatDate(submission.submittedAt, true)}</span></div><span className={`status-pill ${submission.status === 'GRADED' ? 'status-graded' : 'status-submitted'}`}>{submission.status === 'GRADED' ? 'Calificada' : 'Por revisar'}</span></header>
      <div className="submission-content"><span className="content-label">RESPUESTA</span><p>{submission.content}</p></div>
      <form className="grade-form" onSubmit={submit}><label>Calificación<div className="grade-field"><input name="grade" type="number" required min={0} max={100} step="0.1" defaultValue={submission.grade ?? ''} placeholder="0" /><span>/ 100</span></div></label><label>Retroalimentación<textarea name="feedback" maxLength={10000} rows={2} defaultValue={submission.feedback ?? ''} placeholder="Escribe una observación para el estudiante…" /></label><button className="button button-secondary" disabled={busy}>{busy ? 'Guardando…' : submission.status === 'GRADED' ? 'Actualizar' : 'Guardar calificación'}</button></form>
      {error && <ErrorMessage message={error} />}
    </article>
  );
}

export function AssignmentPage() {
  const { id = '' } = useParams();
  const { user } = useAuth();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const details = await api<Assignment>(`/assignments/${id}`);
      const commentData = await api<Comment[]>(`/courses/${details.courseId}/comments?assignmentId=${encodeURIComponent(id)}`);
      setAssignment(details);
      setComments(commentData);
      setAnswer(details.submissions?.[0]?.content ?? '');
    } catch (requestError) { setError(errorMessage(requestError)); }
    finally { setLoading(false); }
  }, [id]);

  useEffect(() => { void load(); }, [load]);

  async function submitWork(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    setNotice('');
    try {
      const submission = await api<Submission>(`/assignments/${id}/submit`, { method: 'POST', body: JSON.stringify({ content: answer }) });
      setAssignment((current) => current ? { ...current, submissions: [submission] } : current);
      setNotice('Tu entrega quedó registrada. Puedes actualizarla mientras la actividad siga disponible.');
    } catch (requestError) { setError(errorMessage(requestError)); }
    finally { setBusy(false); }
  }

  return (
    <Layout>
      {loading ? <LoadingState label="Abriendo la actividad" /> : error && !assignment ? <ErrorMessage message={error} onRetry={load} /> : assignment && (
        <>
          <Link className="back-link" to={`/courses/${assignment.courseId}/classwork`}><span aria-hidden="true">←</span> Volver al trabajo de clase</Link>
          <div className="assignment-detail-header"><div className="assignment-detail-icon">↗</div><div><p className="eyebrow">{assignment.course?.title ?? 'ACTIVIDAD DEL CURSO'}</p><h1>{assignment.title}</h1><p>Fecha límite: {formatDate(assignment.dueDate, true)}</p></div></div>
          {error && <ErrorMessage message={error} />}
          {notice && <SuccessMessage>{notice}</SuccessMessage>}
          <div className="assignment-detail-layout">
            <section className="assignment-description-card"><span className="content-label">INSTRUCCIONES</span><p>{assignment.description || 'Esta actividad no incluye instrucciones adicionales.'}</p><div className="assignment-meta-line"><span>Publicada el {formatDate(assignment.createdAt)}</span><span>{assignment.dueDate ? 'Con fecha límite' : 'Sin fecha límite'}</span></div></section>
            {user?.role === 'STUDENT' ? (
              <aside className="work-panel"><div className="work-panel-heading"><div><p className="eyebrow">TU TRABAJO</p><h2>{assignment.submissions?.length ? 'Entrega registrada' : 'Prepara tu entrega'}</h2></div><span className={`status-pill ${assignment.submissions?.[0]?.status === 'GRADED' ? 'status-graded' : assignment.submissions?.length ? 'status-submitted' : ''}`}>{assignment.submissions?.[0]?.status === 'GRADED' ? 'Calificada' : assignment.submissions?.length ? 'Entregada' : 'Pendiente'}</span></div>
                {assignment.submissions?.[0]?.status === 'GRADED' && <div className="grade-summary"><strong>{assignment.submissions[0].grade}<small>/100</small></strong><div><span>Retroalimentación</span><p>{assignment.submissions[0].feedback || 'Sin comentarios adicionales.'}</p></div></div>}
                <form onSubmit={submitWork}><label>Respuesta en texto<textarea value={answer} onChange={(event) => setAnswer(event.target.value)} required maxLength={20000} rows={8} placeholder="Escribe aquí el desarrollo de tu actividad…" /></label><button className="button button-primary button-block" disabled={busy || !answer.trim()}>{busy ? 'Enviando…' : assignment.submissions?.length ? 'Actualizar entrega' : 'Entregar actividad'}</button><small>Al actualizar, la entrega volverá al estado “por revisar”.</small></form>
              </aside>
            ) : (
              <section className="teacher-submissions"><div className="section-heading compact"><div><p className="eyebrow">REVISIÓN</p><h2>Entregas del grupo</h2></div><span>{assignment.submissions?.length ?? 0}</span></div>{assignment.submissions?.length ? assignment.submissions.map((submission) => <GradeForm key={submission.id} submission={submission} onGraded={(graded) => setAssignment((current) => current ? { ...current, submissions: current.submissions?.map((item) => item.id === graded.id ? graded : item) } : current)} />) : <EmptyState icon="◇" title="Aún no hay entregas" description="Las respuestas del grupo aparecerán en esta sección." />}</section>
            )}
          </div>
          {user && <CommentBox courseId={assignment.courseId} assignmentId={assignment.id} comments={comments} currentUser={user} onComment={(comment) => setComments((current) => [...current, comment])} />}
        </>
      )}
    </Layout>
  );
}
