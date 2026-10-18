import React, { useState } from 'react';
import styles from './Curriculum.module.css';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const experiencia = [
  {
    
    id: 3,
    cargo: 'Desarrollador Full Stack',
    empresa: 'Municipalidad de Buin',
    lugar: 'Buin, Chile',
    periodo: 'Junio 2026 – Actualidad',
    descripcion:
      'Desarrollo de aplicación para gestionar pacientes en el Programa de Red Local de Apoyos y Cuidados de la Municipalidad, agilicé el proceso de atención de pacientes creando una aplicacion web con roles de administrador y profesionales que ayuda a atender mas rapido a las personas dentro del programa',
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'FastAPI', 'SQL', 'PostgreSQL', 'Docker'],
  }, 
  {
    id: 1,
    cargo: 'Practicante Analista Programador',
    empresa: 'Alimentos Concentrados la Cisterna',
    lugar: 'Buin, Chile',
    periodo: 'Junio 2025 – Agosto 2025',
    descripcion:
      'Mantenimiento del sitio web y del sitio de la intranet de la empresa.',
    stack: ['HTML', 'CSS', 'JavaScript', 'SQL', 'PHP'],
  },
  {
    id: 2,
    cargo: 'Practicante Técnico en Ciberseguridad',
    empresa: 'Parabrisas Margaritaglass',
    lugar: 'Buin, Chile',
    periodo: 'Marzo 2026 – Abril 2026',
    descripcion:
      'Análisis de seguridad del sitio web, pruebas de inyección SQL y revisión de estructura del frontend.',
    stack: ['HTML', 'CSS', 'JavaScript', 'SQL'],
  },
];

const educacion = [
  {
    id: 1,
    titulo: 'Técnico Superior en Ciberseguridad',
    institucion: 'Instituto Profesional IACC',
    periodo: '2023 – Presente',
  },
  {
    id: 2,
    titulo: 'Analista Programador',
    institucion: 'Instituto Profesional Los Leones',
    periodo: '2023 – 2026',
  },
];

const certificaciones = [
  'Desarrollo Web – Coderhouse',
  'JavaScript – Coderhouse',
  'Platzi: Frontend Developer, React.js, Git & GitHub, Seguridad Informática, Mobile First, HTML y CSS',
  'Certificaciones Cisco Python Básico e Intermedio',
  'Programación con PHP (curso adicional)',
  'Programación C# con .NET (curso adicional)',
  'Ingeniería en Redes de Internet – Instituto Keys',
  'Soporte Técnico de PC – Instituto Keys',
];

const tecnologias = {
  Lenguajes: ['HTML', 'CSS', 'JavaScript', 'C#', 'Python', 'PHP', 'SQL'],
  'Frameworks / Librerías': ['React.js', 'Node.js', 'Express', 'FastAPI', '.NET', 'ASP.NET', 'Bootstrap'],
  'Bases de Datos': ['PostgreSQL', 'MySQL', 'SQL Server'],
  Herramientas: ['Git', 'Linux', 'Shopify', 'Docker', 'Docker Compose'],
};

// ─── SUB-COMPONENTES ──────────────────────────────────────────────────────────

const SectionTitle = ({ children }) => (
  <h2 className={styles.sectionTitle}>{children}</h2>
);

const TimelineItem = ({ item, isLast }) => (
  <div className={`${styles.timelineItem} ${isLast ? styles.timelineLast : ''}`}>
    <div className={styles.timelineDot} />
    <div className={styles.timelineContent}>
      <div className={styles.timelineHeader}>
        <span className={styles.timelineCargo}>{item.cargo ?? item.titulo}</span>
        <span className={styles.timelinePeriodo}>{item.periodo}</span>
      </div>
      <span className={styles.timelineEmpresa}>
        {item.empresa ?? item.institucion}
        {item.lugar && <span className={styles.timelineLugar}> · {item.lugar}</span>}
      </span>
      {item.descripcion && (
        <p className={styles.timelineDesc}>{item.descripcion}</p>
      )}
      {item.stack && (
        <div className={styles.stackList}>
          {item.stack.map((t) => (
            <span key={t} className={styles.stackBadge}>{t}</span>
          ))}
        </div>
      )}
    </div>
  </div>
);

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

const Curriculum = () => {
  const [tabActiva, setTabActiva] = useState('experiencia');

  const tabs = [
    { id: 'experiencia', label: 'Experiencia' },
    { id: 'educacion', label: 'Educación' },
    { id: 'tecnologias', label: 'Tecnologías' },
    { id: 'certificaciones', label: 'Certificaciones' },
  ];

  return (
    <main className={styles.curriculum}>

      {/* Encabezado */}
      <div className={styles.header}>
        <h2 className={styles.titulo}>Currículum</h2>
        <p className={styles.subtitulo}>
          Mi formación, experiencia y stack técnico.
        </p>
        <a
          href="../Curriculum Arturo-qr.pdf"
          download="Curriculum_Arturo.pdf"
          className={styles.downloadBtn}
        >
          <DownloadIcon /> Descargar CV
        </a>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setTabActiva(tab.id)}
            className={`${styles.tab} ${tabActiva === tab.id ? styles.tabActiva : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Contenido */}
      <div className={styles.contenido}>

        {/* ── EXPERIENCIA ── */}
        {tabActiva === 'experiencia' && (
          <div className={styles.timeline}>
            <SectionTitle>Experiencia Laboral</SectionTitle>
            {experiencia.map((item, i) => (
              <TimelineItem key={item.id} item={item} isLast={i === experiencia.length - 1} />
            ))}
          </div>
        )}

        {/* ── EDUCACIÓN ── */}
        {tabActiva === 'educacion' && (
          <div className={styles.timeline}>
            <SectionTitle>Formación Académica</SectionTitle>
            {educacion.map((item, i) => (
              <TimelineItem key={item.id} item={item} isLast={i === educacion.length - 1} />
            ))}
          </div>
        )}

        {/* ── TECNOLOGÍAS ── */}
        {tabActiva === 'tecnologias' && (
          <div className={styles.techGrid}>
            <SectionTitle>Tecnologías y Herramientas</SectionTitle>
            {Object.entries(tecnologias).map(([categoria, items]) => (
              <div key={categoria} className={styles.techCategoria}>
                <h3 className={styles.techCategoriaTitle}>{categoria}</h3>
                <div className={styles.stackList}>
                  {items.map((t) => (
                    <span key={t} className={styles.stackBadge}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── CERTIFICACIONES ── */}
        {tabActiva === 'certificaciones' && (
          <div>
            <SectionTitle>Cursos y Certificaciones</SectionTitle>
            <ul className={styles.certList}>
              {certificaciones.map((cert) => (
                <li key={cert} className={styles.certItem}>
                  <CheckIcon />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </main>
  );
};

export default Curriculum;

// ─── ÍCONOS ───────────────────────────────────────────────────────────────────

const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: 0, marginTop: '2px'}}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
