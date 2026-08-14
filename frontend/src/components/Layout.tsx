import { useEffect, useState, type ReactNode } from 'react';
import { verifyClientIntegrity, type IntegrityState } from '../security/clientIntegrity';
import { Navbar } from './Navbar';

export function Layout({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  const [integrity, setIntegrity] = useState<IntegrityState | 'checking'>('checking');

  useEffect(() => {
    void verifyClientIntegrity().then(setIntegrity);
  }, []);

  return (
    <div className="app-shell">
      <Navbar />
      <main className={wide ? 'page-container page-container-wide' : 'page-container'}>{children}</main>
      <footer className="app-footer">
        <span>EduRoom · Entorno académico original</span>
        <span className={`integrity integrity-${integrity}`} title="Comprobación educativa; no reemplaza la seguridad del servidor">
          <i /> Integridad: {integrity === 'verified' ? 'verificada' : integrity === 'mismatch' ? 'no coincidente' : integrity === 'checking' ? 'comprobando' : 'sin endpoint'}
        </span>
      </footer>
    </div>
  );
}
