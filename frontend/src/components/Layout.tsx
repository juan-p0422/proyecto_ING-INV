import type { ReactNode } from 'react';
import { Navbar } from './Navbar';

export function Layout({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className={wide ? 'page-container page-container-wide' : 'page-container'}>{children}</main>
      <footer className="app-footer">
        <span>EduRoom · Entorno académico original</span>
        <span>Protección educativa de integridad</span>
      </footer>
    </div>
  );
}
