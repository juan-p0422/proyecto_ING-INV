import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { AnnouncementCard } from '../components/AnnouncementCard';
import { CommentBox } from '../components/CommentBox';
import { EmptyState, ErrorMessage, LoadingState } from '../components/StatusViews';
import { api } from '../services/api';
import type { Announcement, Comment } from '../types';
import { errorMessage } from '../utils/format';
import type { CourseOutletContext } from './CourseLayout';

export function StreamPage() {
  const { course } = useOutletContext<CourseOutletContext>();
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [announcementData, commentData] = await Promise.all([
        api<Announcement[]>(`/courses/${course.id}/announcements`),
        api<Comment[]>(`/courses/${course.id}/comments`),
      ]);
      setAnnouncements(announcementData);
      setComments(commentData.filter((comment) => !comment.assignmentId));
    } catch (requestError) { setError(errorMessage(requestError)); }
    finally { setLoading(false); }
  }, [course.id]);

  useEffect(() => { void load(); }, [load]);

  async function createAnnouncement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError('');
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const announcement = await api<Announcement>(`/courses/${course.id}/announcements`, { method: 'POST', body: JSON.stringify(payload) });
      setAnnouncements((current) => [announcement, ...current]);
      setComposerOpen(false);
    } catch (requestError) { setError(errorMessage(requestError)); }
    finally { setBusy(false); }
  }

  if (loading) return <LoadingState label="Cargando el tablón" />;
  return (
    <div className="course-content stream-layout">
      <section className="feed-column" aria-labelledby="stream-title">
        <div className="section-heading"><div><p className="eyebrow">ACTUALIDAD DEL AULA</p><h2 id="stream-title">Tablón</h2></div>{course.membershipRole === 'TEACHER' && <button className="button button-primary" onClick={() => setComposerOpen((value) => !value)}><span>＋</span> Nuevo anuncio</button>}</div>
        {error && <ErrorMessage message={error} onRetry={load} />}
        {composerOpen && (
          <form className="composer-card" onSubmit={createAnnouncement}>
            <div><span className="content-label">NUEVA PUBLICACIÓN</span><h3>Comparte una actualización</h3></div>
            <label>Título<input name="title" required maxLength={160} autoFocus placeholder="Tema del anuncio" /></label>
            <label>Mensaje<textarea name="content" required maxLength={10000} rows={4} placeholder="Escribe la información para tu grupo…" /></label>
            <div className="form-actions"><button className="button button-ghost" type="button" onClick={() => setComposerOpen(false)}>Cancelar</button><button className="button button-primary" disabled={busy}>{busy ? 'Publicando…' : 'Publicar anuncio'}</button></div>
          </form>
        )}
        <div className="announcement-list">{announcements.map((announcement) => <AnnouncementCard key={announcement.id} announcement={announcement} />)}{!announcements.length && <EmptyState icon="✦" title="El tablón está listo" description={course.membershipRole === 'TEACHER' ? 'Publica el primer anuncio para dar la bienvenida al grupo.' : 'Aquí aparecerán las novedades que publique tu docente.'} />}</div>
      </section>
      {user && <CommentBox courseId={course.id} comments={comments} currentUser={user} onComment={(comment) => setComments((current) => [...current, comment])} />}
    </div>
  );
}
