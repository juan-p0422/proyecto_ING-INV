import { Link } from 'react-router-dom';
import type { Assignment, Role } from '../types';
import { formatDate } from '../utils/format';

export function AssignmentCard({ assignment, role }: { assignment: Assignment; role: Role }) {
  const submission = assignment.submissions?.[0];
  const count = assignment._count?.submissions ?? 0;
  return (
    <Link className="assignment-card" to={`/assignments/${assignment.id}`}>
      <div className="assignment-icon" aria-hidden="true">↗</div>
      <div className="assignment-main">
        <div className="assignment-title-row">
          <div><span className="content-label">ACTIVIDAD</span><h3>{assignment.title}</h3></div>
          <span className={`status-pill ${submission?.status === 'GRADED' ? 'status-graded' : submission ? 'status-submitted' : ''}`}>
            {role === 'TEACHER' ? `${count} entrega${count === 1 ? '' : 's'}` : submission?.status === 'GRADED' ? `${submission.grade}/100` : submission ? 'Entregada' : 'Pendiente'}
          </span>
        </div>
        <p>{assignment.description || 'Sin instrucciones adicionales.'}</p>
        <span className="due-date">Fecha límite: {formatDate(assignment.dueDate, true)}</span>
      </div>
      <span className="row-arrow" aria-hidden="true">›</span>
    </Link>
  );
}
