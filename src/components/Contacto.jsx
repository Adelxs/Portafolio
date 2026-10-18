import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contacto.module.css';

/*
  ─── CONFIGURACIÓN EMAILJS ────────────────────────────────────────────────────
  1. Crea cuenta en https://www.emailjs.com (plan gratuito: 200 emails/mes)
  2. En el dashboard: Add New Service → Gmail → conecta tu cuenta
  3. Email Templates → Create New Template → usa estas variables en el template:
       {{from_name}}, {{from_lastname}}, {{from_email}}, {{message}}
  4. Reemplaza las 3 constantes de abajo con tus valores reales
  ─────────────────────────────────────────────────────────────────────────────
*/
const EMAILJS_SERVICE_ID  = 'service_dpwqsg9';   // ej: 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_ixx84cl';  // ej: 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'ktvbQBjh6uSwwv8k2';   // ej: 'aBcDeFgHiJkLmNoP'

// ─── DATOS DE CONTACTO DIRECTO ────────────────────────────────────────────────
const WHATSAPP_NUMBER = '56976754500'; // sin + ni espacios
const WHATSAPP_MSG    = encodeURIComponent('Hola Arturo, vi tu portafolio y me gustaría contactarme contigo.');
const WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`;
const EMAIL           = 'adel.ing.2450@gmail.com';
const LINKEDIN        = 'https://linkedin.com/in/adel-aguilar-rojas-177039229/';
const GITHUB          = 'https://github.com/Adelxs';

// ─── ESTADO INICIAL DEL FORMULARIO ───────────────────────────────────────────
const initialForm = { nombre: '', apellidos: '', email: '', mensaje: '' };

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
const Contacto = () => {
  const formRef = useRef(null);
  const [form, setForm]       = useState(initialForm);
  const [errores, setErrores] = useState({});
  const [estado, setEstado]   = useState('idle'); // idle | enviando | ok | error

  // ── Validación ──
  const validar = () => {
    const e = {};
    if (!form.nombre.trim())    e.nombre   = 'El nombre es requerido.';
    if (!form.apellidos.trim()) e.apellidos = 'Los apellidos son requeridos.';
    if (!form.email.trim())     e.email    = 'El email es requerido.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                e.email    = 'Ingresa un email válido.';
    if (!form.mensaje.trim())   e.mensaje  = 'El mensaje no puede estar vacío.';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validar();
    if (Object.keys(errs).length > 0) { setErrores(errs); return; }

    setEstado('enviando');
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setEstado('ok');
      setForm(initialForm);
    } catch (err) {
      console.error('EmailJS error:', err);
      setEstado('error');
    }
  };

  return (
    <main className={styles.contacto}>

      {/* ── Encabezado ── */}
      <div className={styles.header}>
        <h2 className={styles.titulo}>Contacto</h2>
        <p className={styles.subtitulo}>
          ¿Tienes un proyecto en mente o quieres conversar? Escríbeme.
        </p>
      </div>

      <div className={styles.layout}>

        {/* ── Info lateral ── */}
        <aside className={styles.infoPanel}>
          <h3 className={styles.infoPanelTitle}>Contacto directo</h3>

          <a href={`mailto:${EMAIL}`} className={styles.infoItem}>
            <EmailIcon />
            <span>{EMAIL}</span>
          </a>

          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${styles.infoItem} ${styles.infoWhatsapp}`}>
            <WhatsAppIcon />
            <span>WhatsApp</span>
          </a>

          <div className={styles.socialLinks}>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} aria-label="GitHub">
              <GitHubIcon />
            </a>
          </div>
        </aside>

        {/* ── Formulario ── */}
        <section className={styles.formPanel}>
          {estado === 'ok' ? (
            <div className={styles.successMsg}>
              <CheckCircleIcon />
              <div>
                <strong>¡Mensaje enviado!</strong>
                <p>Te responderé a la brevedad. También puedes escribirme por WhatsApp.</p>
              </div>
              <button className={styles.resetBtn} onClick={() => setEstado('idle')}>
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate className={styles.form}>

              <div className={styles.formRow}>
                <Field label="Nombre" error={errores.nombre}>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="Arturo"
                    value={form.nombre}
                    onChange={(e) => { handleChange({ target: { name: 'nombre', value: e.target.value } }); }}
                    className={`${styles.input} ${errores.nombre ? styles.inputError : ''}`}
                  />
                </Field>
                <Field label="Apellidos" error={errores.apellidos}>
                  <input
                    type="text"
                    name="from_lastname"
                    placeholder="Aguilar"
                    value={form.apellidos}
                    onChange={(e) => { handleChange({ target: { name: 'apellidos', value: e.target.value } }); }}
                    className={`${styles.input} ${errores.apellidos ? styles.inputError : ''}`}
                  />
                </Field>
              </div>

              <Field label="Email" error={errores.email}>
                <input
                  type="email"
                  name="from_email"
                  placeholder="correo@ejemplo.com"
                  value={form.email}
                  onChange={(e) => { handleChange({ target: { name: 'email', value: e.target.value } }); }}
                  className={`${styles.input} ${errores.email ? styles.inputError : ''}`}
                />
              </Field>

              <Field label="Mensaje" error={errores.mensaje}>
                <textarea
                  name="message"
                  placeholder="Hola, me interesa hablar sobre..."
                  rows={5}
                  value={form.mensaje}
                  onChange={(e) => { handleChange({ target: { name: 'mensaje', value: e.target.value } }); }}
                  className={`${styles.textarea} ${errores.mensaje ? styles.inputError : ''}`}
                />
              </Field>

              {estado === 'error' && (
                <p className={styles.errorGeneral}>
                  Hubo un error al enviar. Intenta de nuevo o escríbeme directo por WhatsApp.
                </p>
              )}

              <button
                type="submit"
                disabled={estado === 'enviando'}
                className={styles.submitBtn}
              >
                {estado === 'enviando' ? 'Enviando...' : 'Enviar mensaje'}
              </button>

            </form>
          )}
        </section>
      </div>
    </main>
  );
};

export default Contacto;

// ─── FIELD WRAPPER ────────────────────────────────────────────────────────────
const Field = ({ label, error, children }) => (
  <div className={styles.field}>
    <label className={styles.label}>{label}</label>
    {children}
    {error && <span className={styles.errorMsg}>{error}</span>}
  </div>
);

// ─── ÍCONOS SVG ───────────────────────────────────────────────────────────────
const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: 'var(--color-terminado)', flexShrink: 0}}>
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
