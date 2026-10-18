import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './HeaderNav.module.css';

/*
  El tema se aplica como data-theme="dark" en el <html>.
  Todas las variables CSS del resto de los módulos (Portafolio, Curriculum,
  Contacto, Inicio) cambian automáticamente sin tocar nada más.
*/

const HeaderNav = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Leer preferencia guardada, o usar la preferencia del sistema
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const links = [
    { to: '/inicio',      label: 'Inicio' },
    { to: '/portafolio',  label: 'Portafolio' },
    { to: '/servicios',   label: 'Servicios' },
    { to: '/curriculum',  label: 'Curriculum' },
    { to: '/contacto',    label: 'Contacto' },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoLetra}>A</span>
        <h3 className={styles.logoNombre}>Adel Aguilar</h3>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {links.map(({ to, label }) => (
            <li key={to} className={styles.navItem}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón tema */}
      <button
        className={styles.themeBtn}
        onClick={() => setDarkMode((d) => !d)}
        aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        title={darkMode ? 'Modo claro' : 'Modo oscuro'}
      >
        {darkMode ? <SunIcon /> : <MoonIcon />}
      </button>
    </header>
  );
};

export default HeaderNav;

// ─── ÍCONOS ───────────────────────────────────────────────────────────────────
const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);
