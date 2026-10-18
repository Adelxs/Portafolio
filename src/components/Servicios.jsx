import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Servicios.module.css';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const servicios = [
  {
    id: 1,
    icono: <LayoutIcon />,
    titulo: 'Diseño Web',
    descripcion:
      'Interfaces atractivas, modernas y responsivas que se adaptan a cualquier dispositivo. Enfoque en experiencia de usuario y estética profesional.',
    tags: ['UI/UX', 'Responsive', 'Mobile First'],
  },
  {
    id: 2,
    icono: <MonitorIcon />,
    titulo: 'Desarrollo Frontend',
    descripcion:
      'Construcción de sitios y aplicaciones web con React.js. Código limpio, componentes reutilizables y rendimiento optimizado.',
    tags: ['React', 'JavaScript', 'CSS'],
  },
  {
    id: 3,
    icono: <ServerIcon />,
    titulo: 'Desarrollo Backend / APIs',
    descripcion:
      'APIs RESTful robustas con autenticación JWT, arquitectura por capas y documentación. Stack Node.js/Express o FastAPI según el proyecto.',
    tags: ['Node.js', 'FastAPI', 'PostgreSQL'],
  },
  {
    id: 4,
    icono: <StackIcon />,
    titulo: 'Aplicaciones Fullstack',
    descripcion:
      'Desarrollo completo desde la base de datos hasta la interfaz. Soluciones end-to-end adaptadas a las necesidades del negocio.',
    tags: ['React', 'FastAPI', 'PostgreSQL'],
  },
  {
    id: 5,
    icono: <SearchIcon />,
    titulo: 'Posicionamiento SEO',
    descripcion:
      'Optimización técnica para mejorar la visibilidad en buscadores: estructura semántica, velocidad de carga y buenas prácticas web.',
    tags: ['SEO técnico', 'Performance', 'Accesibilidad'],
  },
  {
    id: 6,
    icono: <WrenchIcon />,
    titulo: 'Mantenimiento de Sitios',
    descripcion:
      'Actualización, corrección de errores y mejoras continuas en sitios existentes. Soporte técnico para mantener tu web funcionando sin problemas.',
    tags: ['Soporte', 'Actualizaciones', 'Bugs'],
  },
];

// ─── CARD ─────────────────────────────────────────────────────────────────────
const ServicioCard = ({ servicio }) => (
  <article className={styles.card}>
    <div className={styles.cardIcono}>{servicio.icono}</div>
    <div className={styles.cardBody}>
      <h3 className={styles.cardTitulo}>{servicio.titulo}</h3>
      <p className={styles.cardDesc}>{servicio.descripcion}</p>
      <div className={styles.tagList}>
        {servicio.tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>
    </div>
  </article>
);

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
const Servicios = () => (
  <main className={styles.servicios}>

    {/* Encabezado */}
    <div className={styles.header}>
      <h2 className={styles.titulo}>Servicios</h2>
      <p className={styles.subtitulo}>
        Soluciones web a medida para personas y empresas. Desde el diseño hasta
        el despliegue.
      </p>
    </div>

    {/* Grid de servicios */}
    <div className={styles.grid}>
      {servicios.map((s) => (
        <ServicioCard key={s.id} servicio={s} />
      ))}
    </div>

    {/* CTA */}
    <div className={styles.cta}>
      <div className={styles.ctaTexto}>
        <h3 className={styles.ctaTitulo}>¿Tienes un proyecto en mente?</h3>
        <p className={styles.ctaDesc}>
          Cuéntame tu idea y vemos cómo puedo ayudarte a hacerla realidad.
        </p>
      </div>
      <Link to="/contacto" className={styles.ctaBtn}>
        Contáctame
      </Link>
    </div>

  </main>
);

export default Servicios;

// ─── ÍCONOS SVG ───────────────────────────────────────────────────────────────
function LayoutIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>
    </svg>
  );
}
function MonitorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  );
}
function ServerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  );
}
function StackIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}
function WrenchIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
    </svg>
  );
}
