import { Link } from 'react-router-dom';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" to="/dashboard" aria-label="EduRoom, ir al panel">
      <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
      {!compact && <span>EduRoom</span>}
    </Link>
  );
}
