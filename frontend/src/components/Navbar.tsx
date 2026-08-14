import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { initials } from '../utils/format';
import { Brand } from './Brand';

export function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Brand />
        <nav className="main-nav" aria-label="Navegación principal">
          <Link to="/dashboard">Mis cursos</Link>
        </nav>
        {user && (
          <div className="profile-menu">
            <button
              className="profile-trigger"
              aria-expanded={open}
              aria-haspopup="menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span className="avatar">{initials(user.name)}</span>
              <span className="profile-copy"><strong>{user.name}</strong><small>{user.role === 'TEACHER' ? 'Docente' : 'Estudiante'}</small></span>
              <span aria-hidden="true">⌄</span>
            </button>
            {open && (
              <div className="profile-dropdown" role="menu">
                <span>{user.email}</span>
                <button onClick={logout} role="menuitem">Cerrar sesión</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
