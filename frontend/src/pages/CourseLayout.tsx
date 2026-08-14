import { useCallback, useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ErrorMessage, LoadingState } from '../components/StatusViews';
import { api } from '../services/api';
import type { Course } from '../types';
import { errorMessage } from '../utils/format';

export type CourseOutletContext = { course: Course; reloadCourse: () => Promise<void> };

export function CourseLayout() {
  const { id = '' } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const loadCourse = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setCourse(await api<Course>(`/courses/${id}`)); }
    catch (requestError) { setError(errorMessage(requestError)); }
    finally { setLoading(false); }
  }, [id]);

  useEffect(() => { void loadCourse(); }, [loadCourse]);

  async function copyCode() {
    if (!course) return;
    try { await navigator.clipboard.writeText(course.code); setCopied(true); setTimeout(() => setCopied(false), 1800); }
    catch { setCopied(false); }
  }

  return (
    <Layout wide>
      {loading ? <LoadingState label="Abriendo el aula" /> : error || !course ? <ErrorMessage message={error || 'Curso no encontrado.'} onRetry={loadCourse} /> : (
        <>
          <section className="course-hero" style={{ '--course-color': course.color } as React.CSSProperties}>
            <div className="course-hero-pattern" aria-hidden="true"><i /><i /><i /></div>
            <div className="course-hero-copy"><span className="course-role course-role-light">{course.membershipRole === 'TEACHER' ? 'Aula docente' : 'Aula activa'}</span><h1>{course.title}</h1><p>{course.description || 'Un espacio para aprender, participar y avanzar en comunidad.'}</p></div>
            <button className="course-code" onClick={copyCode} title="Copiar código del curso"><span>CÓDIGO DE AULA</span><strong>{copied ? '¡Copiado!' : course.code}</strong></button>
          </section>
          <nav className="course-tabs" aria-label="Secciones del curso">
            <NavLink to={`/courses/${id}/stream`}>Tablón</NavLink>
            <NavLink to={`/courses/${id}/classwork`}>Trabajo de clase</NavLink>
            <NavLink to={`/courses/${id}/people`}>Personas</NavLink>
          </nav>
          <Outlet context={{ course, reloadCourse: loadCourse } satisfies CourseOutletContext} />
        </>
      )}
    </Layout>
  );
}
