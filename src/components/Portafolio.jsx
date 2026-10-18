import React, { useState } from 'react';
import styles from './Portafolio.module.css';

// ─── DATA ────────────────────────────────────────────────────────────────────
// Reemplaza estos objetos con tus proyectos reales
const proyectos = [
  {
    id: 1,
    titulo: 'SisvaQR',
    descripcion:
      'App web para generar códigos QR personalizados con soporte para URLs, texto y contactos. Incluye descarga de imagen y historial de generaciones.',
    imagen: './qr.png',
    stack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MySQL'],
    github: 'https://github.com/Adelxs/Sisva_php',
    demo: 'https://sisva-php.onrender.com',
    estado: 'terminado',
  },
  {
    id: 2,
    titulo: 'Aplicación SSEE',
    descripcion:
      'Sistema de gestión de pacientes del Programa de Red Local de Apoyos y Cuidados Municipalidad de Buin',
    imagen: './SSEE.png',
    stack: ['React', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'Pydantic'],
    github: 'https://github.com/Adelxs/aplicacion_SSEE',
    demo: 'https://aplicacion-ssee.onrender.com',
    estado: 'terminado',
  },
  {
    id: 3,
    titulo: 'JRServices',
    descripcion:
      'Pagina web para promocionar servicios de la empresa JRServices',
    imagen: './JR.png',
    stack: ['HTML', 'CSS', 'Javascript', 'PHP'],
    github: 'https://github.com/Adelxs/JRServices',
    demo: 'https://jrservicesve.cl/',
    estado: 'terminado',
  },
  {
    id: 4,
    titulo: 'Climaflex',
    descripcion:
      'Pagina web para promocionar servicios de la empresa Climaflex',
    imagen: './climaflex.png',
    stack: ['HTML', 'CSS', 'Javascript', 'React'],
    github: 'https://github.com/Adelxs/Climaflex',
    demo: 'https://climaflex.cl/',
    estado: 'terminado',
  },
];

// ─── BADGE DE ESTADO ─────────────────────────────────────────────────────────
const EstadoBadge = ({ estado }) => (
  <span
    className={`${styles.estadoBadge} ${
      estado === 'terminado' ? styles.terminado : styles.enDesarrollo
    }`}
  >
    <span className={styles.estadoDot} />
    {estado === 'terminado' ? 'Terminado' : 'En desarrollo'}
  </span>
);

// ─── CARD DE PROYECTO ─────────────────────────────────────────────────────────
const ProyectoCard = ({ proyecto }) => {
  const { titulo, descripcion, imagen, stack, github, demo, estado } = proyecto;

  return (
    <article className={styles.card}>
      {/* Imagen */}
      <div className={styles.cardImagen}>
        <img src={imagen} alt={`Screenshot de ${titulo}`} loading="lazy" />
        <div className={styles.cardImagenOverlay} />
      </div>

      {/* Contenido */}
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitulo}>{titulo}</h3>
          <EstadoBadge estado={estado} />
        </div>

        <p className={styles.cardDescripcion}>{descripcion}</p>

        {/* Stack */}
        <div className={styles.stackList}>
          {stack.map((tech) => (
            <span key={tech} className={styles.stackBadge}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className={styles.cardFooter}>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cardLink} ${styles.linkGithub}`}
          >
            <GitHubIcon />
            GitHub
          </a>
        )}
        {demo ? (
          <a
            href={demo}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.cardLink} ${styles.linkDemo}`}
          >
            <ExternalLinkIcon />
            Ver demo
          </a>
        ) : (
          <span className={styles.sinDemo}>Sin demo aún</span>
        )}
      </div>
    </article>
  );
};

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
const Portafolio = () => {
  const [filtro, setFiltro] = useState('todos');

  const proyectosFiltrados =
    filtro === 'todos'
      ? proyectos
      : proyectos.filter((p) => p.estado === filtro);

  return (
    <main className={styles.portafolio}>
      {/* Encabezado de sección */}
      <div className={styles.seccionHeader}>
        <h2 className={styles.seccionTitulo}>Portafolio</h2>
        <p className={styles.seccionSubtitulo}>
          Proyectos personales y de práctica que reflejan mi stack y mi progreso como
          desarrollador.
        </p>
      </div>

      {/* Filtros */}
      <div className={styles.filtros}>
        {['todos', 'terminado', 'en desarrollo'].map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`${styles.filtroBtnBtn} ${filtro === f ? styles.filtroActivo : ''}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid de proyectos */}
      {proyectosFiltrados.length > 0 ? (
        <div className={styles.grid}>
          {proyectosFiltrados.map((proyecto) => (
            <ProyectoCard key={proyecto.id} proyecto={proyecto} />
          ))}
        </div>
      ) : (
        <p className={styles.sinResultados}>No hay proyectos en esta categoría aún.</p>
      )}
    </main>
  );
};

export default Portafolio;

// ─── ÍCONOS SVG INLINE (sin dependencias extra) ───────────────────────────────
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
