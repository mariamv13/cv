import { useState, useEffect, useRef } from "react";
import "./App.css";

// ── Paleta de colores ──────────────────────────────────────────────────────────
const C = {
  bg:      "#0d1117",
  surface: "#161b22",
  border:  "#21262d",
  blue:    "#79c0ff",
  coral:   "#ffa28b",
  green:   "#56d364",
  yellow:  "#e3b341",
  text:    "#f0f6fc",
  muted:   "#8b949e",
  dim:     "#30363d",
};

// ── Hook: detecta cuándo un elemento entra en el viewport ─────────────────────
function useVisible(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
}

// ── Componente de animación al hacer scroll ────────────────────────────────────
function Fade({ children, delay = 0, fromLeft = false, style = {} }) {
  const [ref, v] = useVisible();
  return (
    <div
      ref={ref}
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : fromLeft ? "translateX(-20px)" : "translateY(24px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Datos ──────────────────────────────────────────────────────────────────────

const CHANGELOG = [
  {
    version: "v1.0.0",
    date: "2018 – 2022",
    title: "Base sólida: hostelería",
    body: "Cuatro años gestionando equipos, clientes y operaciones en tiempo real. Aprendí a trabajar bajo presión, a comunicarme con claridad y a resolver problemas donde el manual no existe.",
    tags: ["Gestión de equipos", "Atención al cliente", "Resolución de problemas"],
    color: C.yellow,
  },
  {
    version: "v2.0.0",
    date: "2024 – 2026",
    title: "Grado Superior DAW",
    body: "Formación completa en Desarrollo de Aplicaciones Web en el IES Suárez de Figueroa, Zafra. PHP, JavaScript, bases de datos, entornos cliente/servidor y trabajo práctico intensivo.",
    tags: ["PHP", "JavaScript", "MySQL", "Bootstrap 5", "React", "HTML/CSS"],
    color: C.blue,
  },
  {
    version: "v3.0.0",
    date: "2026",
    title: "Proyectos en producción",
    body: "Tres proyectos completos, desplegados y accesibles. TakeOne como TFG full-stack con PHP y MariaDB, y MovieFinder y Flowlist como apps React con APIs externas reales.",
    tags: ["TakeOne", "MovieFinder", "Flowlist", "Deploy real"],
    color: C.coral,
  },
  {
    version: "v4.0.0",
    date: "Ahora",
    title: "Lista para el siguiente reto",
    body: "Desarrolladora web junior buscando un equipo donde seguir creciendo. Aporto visión de producto, capacidad de aprendizaje rápido y ganas reales de construir cosas que funcionen.",
    tags: ["Disponible", "Extremadura · Remoto"],
    color: C.green,
    current: true,
  },
];

const PROJECTS = [
  {
    name: "TakeOne",
    desc: "Red social de cine full-stack (TFG). Perfiles de usuario, chats privados y grupales, sistema de spoilers, motor de sugerencias, grupos de comunidad y panel de administración completo.",
    tech: ["PHP", "JavaScript", "CSS", "MariaDB", "Bootstrap 5", "InfinityFree"],
    live: "https://takeone.gt.tc",
    gh: "https://github.com/mariamv13/TakeOne",
    accent: C.coral,
  },
  {
    name: "MovieFinder",
    desc: "Buscador de películas en React que consume la API de TMDB. Rutas, paginación, trailers y estética de sala de cine oscura.",
    tech: ["React", "Vite", "TMDB API", "React Router"],
    live: null,
    gh: "https://github.com/mariamv13/MovieFinder",
    accent: C.blue,
  },
  {
    name: "Flowlist",
    desc: "Generador de playlists según tu estado de ánimo con la API de Last.fm. Animaciones escalonadas, playlists guardadas en localStorage y enlaces directos a YouTube.",
    tech: ["React", "Vite", "Last.fm API", "CSS animations"],
    live: null,
    gh: "https://github.com/mariamv13/Flowlist",
    accent: C.green,
  },
];

const SKILLS = [
  { name: "HTML5",       icon: "devicon-html5-plain colored" },
  { name: "CSS3",        icon: "devicon-css3-plain colored" },
  { name: "JavaScript",  icon: "devicon-javascript-plain colored" },
  { name: "PHP",         icon: "devicon-php-plain colored" },
  { name: "MySQL",       icon: "devicon-mysql-plain colored" },
  { name: "React",       icon: "devicon-react-original colored" },
  { name: "Vite",        icon: "devicon-vitejs-plain colored" },
  { name: "Bootstrap 5", icon: "devicon-bootstrap-plain colored" },
  { name: "WordPress",   icon: "devicon-wordpress-plain colored", invert: true },
  { name: "Git",         icon: "devicon-git-plain colored" },
  { name: "GitHub",      icon: "devicon-github-original colored", invert: true },
  { name: "PDO / PHP",   icon: "devicon-php-plain colored" },
];

// ── Header fijo con blur al hacer scroll ───────────────────────────────────────
function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="container header-inner">
        <span className="mono header-logo">mariamv13</span>
        <nav className="header-nav">
          {[["#timeline", "Historia"], ["#proyectos", "Proyectos"], ["#contacto", "Contacto"]].map(
            ([href, label]) => (
              <a key={href} href={href} className="nav-link">
                {label}
              </a>
            )
          )}
          {/* 👇 Cambia esto por tu email real */}
          <a href="mailto:tu@email.com" className="btn-primary">
            Contactar
          </a>
        </nav>
      </div>
    </header>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <Fade delay={0}>
          <span className="badge-available">● Disponible para trabajar</span>
        </Fade>

        <Fade delay={100}>
          <h1 className="hero-name">
            María Martín
            <br />
            <span style={{ color: C.blue }}>Vélez</span>
          </h1>
        </Fade>

        <Fade delay={200}>
          <p className="mono hero-role" style={{ color: C.yellow }}>Desarrolladora Web Junior</p>
          <p className="hero-bio">
            Desarrollo aplicaciones web con foco en el detalle y en que las cosas funcionen de verdad. Abierta a nuevos retos.
          </p>
        </Fade>

        <Fade delay={300}>
          <div className="hero-ctas">
            <a
              className="btn-github"
              href="https://github.com/mariamv13"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a className="btn-coral" href="#proyectos">
              Ver proyectos
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ── Entrada individual del timeline ───────────────────────────────────────────
function TimelineEntry({ entry, index, isLast }) {
  const [ref, v] = useVisible(0.1);

  return (
    <div
      ref={ref}
      className="timeline-entry"
      style={{
        opacity: v ? 1 : 0,
        transform: v ? "none" : "translateX(-16px)",
        transition: `opacity 0.5s ease ${index * 90}ms, transform 0.5s ease ${index * 90}ms`,
      }}
    >
      {/* Rama de git: punto + línea vertical */}
      <div className="timeline-branch">
        <div
          className="timeline-dot"
          style={{
            background: entry.color,
            boxShadow: `0 0 0 3px ${C.bg}, 0 0 0 5px ${entry.color}44`,
          }}
        />
        {!isLast && <div className="timeline-line" />}
      </div>

      {/* Contenido de la entrada */}
      <div className="timeline-content">
        <div className="timeline-meta">
          <span
            className="mono version-badge"
            style={{ color: entry.color, background: `${entry.color}18` }}
          >
            {entry.version}
          </span>
          <span className="timeline-date">{entry.date}</span>
          {entry.current && <span className="mono head-badge">HEAD</span>}
        </div>

        <h3 className="timeline-title">{entry.title}</h3>
        <p className="timeline-body">{entry.body}</p>

        <div className="tags">
          {entry.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Sección timeline ───────────────────────────────────────────────────────────
function Timeline() {
  return (
    <section id="timeline" className="section">
      <div className="container">
        <Fade>
          <p className="mono section-eyebrow" style={{ color: C.blue }}>
            $ whoami
          </p>
          <h2 className="section-title">Mi historia, por versiones</h2>
        </Fade>

        <div className="timeline-wrapper">
          {CHANGELOG.map((entry, i) => (
            <TimelineEntry
              key={entry.version}
              entry={entry}
              index={i}
              isLast={i === CHANGELOG.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Tarjeta de proyecto ────────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [ref, v] = useVisible(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? `${project.accent}70` : C.border,
        opacity: v ? 1 : 0,
        transform: v ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 120}ms, transform 0.5s ease ${index * 120}ms, border-color 0.2s`,
      }}
    >
      <div className="project-header">
        <h3 className="project-name">{project.name}</h3>
        <div className="project-links">
          <a href={project.gh} target="_blank" rel="noreferrer" className="project-link-muted">
            GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="project-link-accent"
              style={{ color: project.accent }}
            >
              ↗ Ver en vivo
            </a>
          )}
        </div>
      </div>

      <p className="project-desc">{project.desc}</p>

      <div className="tags">
        {project.tech.map((t) => (
          <span
            key={t}
            className="tag tag-accent"
            style={{
              background: `${project.accent}12`,
              borderColor: `${project.accent}30`,
              color: project.accent,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Sección de proyectos ───────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="proyectos" className="section">
      <div className="container">
        <Fade>
          <p className="mono section-eyebrow" style={{ color: C.coral }}>
            ls ./projects
          </p>
          <h2 className="section-title">Lo que he construido</h2>
        </Fade>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Sección de habilidades ─────────────────────────────────────────────────────
function Skills() {
  return (
    <section className="section section-sm">
      <div className="container">
        <Fade>
          <div className="skills-box">
            <p className="mono section-eyebrow" style={{ color: C.blue, marginBottom: 20 }}>
              STACK TECNOLÓGICO
            </p>
            <div className="tags">
              {SKILLS.map((s) => (
                <span key={s.name} className="tag tag-lg skill-badge">
                  <i className={s.icon} style={{ fontSize: 18, filter: s.invert ? "invert(1)" : "none", }}></i>
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ── Sección de contacto ────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contacto" className="section contact-section">
      <div className="container">
        <Fade>
          <h2 className="contact-title">¿Hablamos?</h2>
          <p className="contact-bio">
            Estoy buscando mi primer puesto como desarrolladora web. Si crees que encajo en tu
            equipo, escríbeme sin compromiso.
          </p>
          {/* 👇 Cambia esto por tu email real */}
          <a href="mailto:tu@email.com" className="btn-blue-lg">
            Enviar email →
          </a>
          <div className="contact-links">
            <a
              href="https://github.com/mariamv13"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/mar%C3%ADa-mart%C3%ADn-v%C3%A9lez-50001b40a/"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
            >
              LinkedIn
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ── App principal ──────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="site">
      <Header />
      <Hero />
      <Timeline />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
}