import type { ReactNode } from 'react';

export function LoadingState({ label = 'Cargando contenido' }: { label?: string }) {
  return (
    <div className="status-view" role="status">
      <span className="loader" aria-hidden="true" />
      <p>{label}…</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="alert alert-error" role="alert">
      <span aria-hidden="true">!</span>
      <p>{message}</p>
      {onRetry && <button className="button button-ghost button-small" onClick={onRetry}>Reintentar</button>}
    </div>
  );
}

export function SuccessMessage({ children }: { children: ReactNode }) {
  return <div className="alert alert-success" role="status"><span aria-hidden="true">✓</span><p>{children}</p></div>;
}

export function EmptyState({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="empty-state">
      <span className="empty-icon" aria-hidden="true">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
