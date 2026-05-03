'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 'mentoria',
    tag: 'Mentoría 1:1',
    title: 'Efectividad Personal',
    desc: 'Sesiones individuales de alto impacto para ejecutivos que quieren operar en su máximo potencial. Trabajamos cuatro pilares fundamentales.',
    topics: ['Manejo del Tiempo', 'Presentaciones Poderosas', 'Reuniones Inteligentes', 'Comunicación Efectiva'],
    cta: 'Agenda una sesión',
    accent: 'var(--tan)',
  },
  {
    id: 'consultoria',
    tag: 'Consultoría',
    title: 'Equipos Comerciales',
    desc: 'Diseñamos e implementamos estrategias para transformar equipos de ventas en máquinas de generación de valor y resultados sostenibles.',
    topics: ['Diagnóstico del equipo', 'Cultura de ventas', 'Metodologías de cierre', 'Liderazgo comercial'],
    cta: 'Hablemos de tu equipo',
    accent: 'var(--taupe)',
  },
  {
    id: 'speaker',
    tag: 'Speaker & Facilitador',
    title: 'Conferencias & Talleres',
    desc: 'Conferencistas internacionales con experiencia en entrenamientos corporativos, keynotes y facilitación de procesos para grandes audiencias.',
    topics: ['Keynotes internacionales', 'Talleres corporativos', 'Facilitación de procesos', 'Contenido a la medida'],
    cta: 'Solicitar propuesta',
    accent: 'var(--brown-mid)',
  },
];

function ServiceCard({ service }: { service: typeof services[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="service-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--charcoal)' : 'var(--warm-white)',
        borderTop: `3px solid ${service.accent}`,
        borderLeft: `1px solid ${hovered ? 'var(--charcoal)' : 'var(--cream)'}`,
        borderRight: `1px solid ${hovered ? 'var(--charcoal)' : 'var(--cream)'}`,
        borderBottom: `1px solid ${hovered ? 'var(--charcoal)' : 'var(--cream)'}`,
        padding: '48px 40px',
        transition: 'all 0.35s ease',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: hovered ? service.accent : 'var(--taupe)',
          transition: 'color 0.35s',
        }}
      >
        {service.tag}
      </span>

      <h3
        style={{
          fontFamily: 'var(--font-playfair, Playfair Display), serif',
          fontSize: '26px',
          fontWeight: 400,
          color: hovered ? '#faf9f7' : 'var(--charcoal)',
          lineHeight: 1.2,
          transition: 'color 0.35s',
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
          fontSize: '15px',
          lineHeight: 1.7,
          fontWeight: 300,
          color: hovered ? 'rgba(250,249,247,0.7)' : 'var(--taupe)',
          transition: 'color 0.35s',
        }}
      >
        {service.desc}
      </p>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {service.topics.map((t) => (
          <li key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: service.accent,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                fontSize: '14px',
                fontWeight: 400,
                color: hovered ? 'rgba(250,249,247,0.85)' : 'var(--brown-mid)',
                transition: 'color 0.35s',
              }}
            >
              {t}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="#contacto"
        style={{
          marginTop: 'auto',
          paddingTop: '16px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: hovered ? 'var(--green)' : 'var(--green-dark)',
          textDecoration: 'none',
          borderBottom: `1px solid ${hovered ? 'var(--green)' : 'transparent'}`,
          width: 'fit-content',
          transition: 'all 0.2s',
        }}
      >
        {service.cta} →
      </a>
    </div>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header  = headerRef.current;
    const grid    = gridRef.current;
    if (!section || !header || !grid) return;

    // Header reveal
    gsap.from(Array.from(header.children), {
      scrollTrigger: { trigger: header, start: 'top 82%', once: true },
      opacity: 0,
      y: 36,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
    });

    // Cards: set invisible, then reveal explicitly via onEnter
    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.service-card'));
    gsap.set(cards, { opacity: 0, y: 60 });

    const st = ScrollTrigger.create({
      trigger: grid,
      start: 'top 92%',   // fires as soon as grid peeks into view
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
        });
      },
    });

    ScrollTrigger.refresh();

    return () => {
      st.kill();
      gsap.killTweensOf(cards);
    };
  }, []);

  return (
    <section
      id="servicios"
      ref={sectionRef}
      style={{ padding: '120px 48px', maxWidth: '1200px', margin: '0 auto' }}
    >
      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '72px' }}>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--green)',
            marginBottom: '16px',
          }}
        >
          Lo que hacemos
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-playfair, Playfair Display), serif',
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 400,
            color: 'var(--charcoal)',
            marginBottom: '20px',
          }}
        >
          Nuestros servicios
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
            fontSize: '17px',
            fontWeight: 300,
            color: 'var(--taupe)',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          Tres caminos hacia el mismo destino: el máximo rendimiento de las personas y sus organizaciones.
        </p>
      </div>

      <div
        ref={gridRef}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}
      >
        {services.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}
