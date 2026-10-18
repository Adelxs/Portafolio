import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Inicio.module.css';

// ─── TYPING EFFECT ────────────────────────────────────────────────────────────
const roles = [
  'Backend Developer',
  'Full Stack Developer',
  'FastAPI + React',
  'Node.js + PostgreSQL',
];

const useTyping = (words, speed = 80, pause = 1800) => {
  const [display, setDisplay]   = useState('');
  const [wordIdx, setWordIdx]   = useState(0);
  const [charIdx, setCharIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplay(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
};

// ─── STATS ────────────────────────────────────────────────────────────────────
const stats = [
  { valor: '3+',  label: 'Proyectos' },
  { valor: 'B1',  label: 'Inglés' },
  { valor: '7+',  label: 'Tecnologías' },
];

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
const Inicio = () => {
  const rolActual = useTyping(roles);

  return (
    <main className={styles.inicio}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroTexto}>

          <span className={styles.saludo}>👋 Hola, soy</span>

          <h1 className={styles.nombre}>Adel Aguilar</h1>

          {/* Typing effect */}
          <div className={styles.rolWrapper} aria-label="Rol profesional">
            <span className={styles.rol}>{rolActual}</span>
            <span className={styles.cursor} aria-hidden="true">|</span>
          </div>

          <p className={styles.descripcion}>
            Desarrollador web con base en Santiago de Chile, especializado en
            construir aplicaciones robustas con stack moderno. Disponible para
            proyectos remotos.
          </p>

          {/* CTAs */}
          <div className={styles.ctas}>
            <Link to="/portafolio" className={styles.ctaPrimario}>
              Ver portafolio
            </Link>
            <Link to="/contacto" className={styles.ctaSecundario}>
              Contactarme
            </Link>
          </div>

          {/* Stats */}
          <div className={styles.stats}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statValor}>{s.valor}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Decoración visual lado derecho */}
        <div className={styles.heroDecor} aria-hidden="true">
          <div className={styles.codeCard}>
            <div className={styles.codeCardHeader}>
              <span className={styles.dot} style={{ background: '#ef4444' }} />
              <span className={styles.dot} style={{ background: '#f59e0b' }} />
              <span className={styles.dot} style={{ background: '#22c55e' }} />
            </div>
            <pre className={styles.codeBlock}>{`const dev = {
  nombre: "Adel Aguilar",
  stack: [
    "React", "FastAPI",
    "Node.js", "PostgreSQL"
  ],
  disponible: true,
};`}</pre>
          </div>
        </div>
      </section>

      {/* ── PROYECTOS CTA ── */}
      <section className={styles.proyectosCta}>
        <div className={styles.proyectosCtaTexto}>
          <h2 className={styles.proyectosCtaTitulo}>¿Quieres ver mi trabajo?</h2>
          <p className={styles.proyectosCtaDesc}>
            Revisa los proyectos que he desarrollado: desde sistemas de inventario
            hasta generadores QR con autenticación.
          </p>
        </div>
        <Link to="/portafolio" className={styles.ctaPrimario}>
          Ver todos los proyectos →
        </Link>
      </section>

    </main>
  );
};

export default Inicio;
