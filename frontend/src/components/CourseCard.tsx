import { Link } from 'react-router-dom';
import type { Course } from '../types';

export function CourseCard({ course }: { course: Course }) {
  const memberCount = course.memberCount ?? course._count?.enrollments ?? 0;
  const assignmentCount = course.assignmentCount ?? course._count?.assignments ?? 0;
  return (
    <Link className="course-card" to={`/courses/${course.id}/stream`}>
      <div className="course-card-top" style={{ '--course-color': course.color } as React.CSSProperties}>
        <span className="course-role">{course.membershipRole === 'TEACHER' ? 'Docencia' : 'En curso'}</span>
        <span className="course-monogram" aria-hidden="true">{course.title.charAt(0).toUpperCase()}</span>
      </div>
      <div className="course-card-body">
        <div><h2>{course.title}</h2><p>{course.description || 'Este curso aún no tiene una descripción.'}</p></div>
        <dl>
          <div><dt>Personas</dt><dd>{memberCount}</dd></div>
          <div><dt>Actividades</dt><dd>{assignmentCount}</dd></div>
        </dl>
        <span className="card-link">Abrir aula <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}
