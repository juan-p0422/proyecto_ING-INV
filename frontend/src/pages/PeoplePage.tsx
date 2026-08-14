import { useCallback, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { EmptyState, ErrorMessage, LoadingState } from '../components/StatusViews';
import { api } from '../services/api';
import type { Member } from '../types';
import { errorMessage, initials } from '../utils/format';
import type { CourseOutletContext } from './CourseLayout';

function MemberRow({ member }: { member: Member }) {
  return <li className="member-row"><span className="avatar">{initials(member.user.name)}</span><div><strong>{member.user.name}</strong><span>{member.user.email}</span></div><span className="member-role">{member.roleInCourse === 'TEACHER' ? 'Docente' : 'Estudiante'}</span></li>;
}

export function PeoplePage() {
  const { course } = useOutletContext<CourseOutletContext>();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setMembers(await api<Member[]>(`/courses/${course.id}/members`)); }
    catch (requestError) { setError(errorMessage(requestError)); }
    finally { setLoading(false); }
  }, [course.id]);

  useEffect(() => { void load(); }, [load]);
  if (loading) return <LoadingState label="Reuniendo al grupo" />;
  const teachers = members.filter((member) => member.roleInCourse === 'TEACHER');
  const students = members.filter((member) => member.roleInCourse === 'STUDENT');

  return (
    <section className="course-content people-content" aria-labelledby="people-title">
      <div className="section-heading"><div><p className="eyebrow">COMUNIDAD DEL AULA</p><h2 id="people-title">Personas</h2><p>{members.length} integrante{members.length === 1 ? '' : 's'} en este curso.</p></div></div>
      {error && <ErrorMessage message={error} onRetry={load} />}
      <div className="people-grid">
        <section className="people-card"><div className="people-card-title"><span>✦</span><div><h3>Equipo docente</h3><p>Guía y acompañamiento</p></div></div><ul>{teachers.map((member) => <MemberRow member={member} key={member.id} />)}</ul></section>
        <section className="people-card people-card-large"><div className="people-card-title"><span>◇</span><div><h3>Estudiantes</h3><p>{students.length} participante{students.length === 1 ? '' : 's'}</p></div></div>{students.length ? <ul>{students.map((member) => <MemberRow member={member} key={member.id} />)}</ul> : <EmptyState icon="◇" title="Grupo en formación" description="Comparte el código del aula para invitar estudiantes." />}</section>
      </div>
    </section>
  );
}
