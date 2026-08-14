import { useState, type FormEvent } from 'react';
import type { Comment, User } from '../types';
import { api } from '../services/api';
import { errorMessage, formatDate, initials } from '../utils/format';
import { ErrorMessage } from './StatusViews';

type Props = {
  courseId: string;
  comments: Comment[];
  currentUser: User;
  assignmentId?: string;
  onComment: (comment: Comment) => void;
};

export function CommentBox({ courseId, comments, currentUser, assignmentId, onComment }: Props) {
  const [content, setContent] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!content.trim()) return;
    setBusy(true);
    setError('');
    try {
      const comment = await api<Comment>(`/courses/${courseId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content, assignmentId: assignmentId ?? null }),
      });
      onComment(comment);
      setContent('');
    } catch (requestError) {
      setError(errorMessage(requestError));
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="comments-panel" aria-labelledby="comments-title">
      <div className="section-heading compact"><div><p className="eyebrow">COMUNIDAD</p><h2 id="comments-title">Comentarios</h2></div><span>{comments.length}</span></div>
      <div className="comment-list">
        {comments.map((comment) => (
          <article className="comment" key={comment.id}>
            <span className="avatar avatar-small">{initials(comment.author.name)}</span>
            <div><p><strong>{comment.author.name}</strong><time dateTime={comment.createdAt}>{formatDate(comment.createdAt, true)}</time></p><span>{comment.content}</span></div>
          </article>
        ))}
        {!comments.length && <p className="muted centered">Inicia la conversación del aula.</p>}
      </div>
      <form className="comment-form" onSubmit={submit}>
        <span className="avatar avatar-small">{initials(currentUser.name)}</span>
        <label className="sr-only" htmlFor={`comment-${assignmentId ?? 'course'}`}>Escribe un comentario</label>
        <textarea id={`comment-${assignmentId ?? 'course'}`} value={content} onChange={(event) => setContent(event.target.value)} placeholder="Comparte una idea o pregunta…" maxLength={5000} rows={2} />
        <button className="send-button" disabled={busy || !content.trim()} aria-label="Publicar comentario">{busy ? '…' : '→'}</button>
      </form>
      {error && <ErrorMessage message={error} />}
    </section>
  );
}
