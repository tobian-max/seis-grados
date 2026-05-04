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
  },
  {
    id: 'consultoria',
    tag: 'Consultoría',
    title: 'Equipos Comerciales',
    desc: 'Diseñamos e implementamos estrategias para transformar equipos de ventas en máquinas de generación de valor y resultados sostenibles.',
    topics: ['Diagnóstico del equipo', 'Cultura de ventas', 'Metodologías de cierre', 'Liderazgo comercial'],
    cta: 'Hablemos de tu equipo',
  },
  {
    id: 'speaker',
    tag: 'Speaker & Facilitador',
    title: 'Conferencias & Talleres',
    desc: 'Conferencistas internacionales con experiencia en entrenamientos corporativos, keynotes y facilitación de procesos para grandes audiencias.',
    topics: ['Keynotes internacionales', 'Talleres corporativos', 'Facilitación de procesos', 'Contenido a la medida'],
    cta: 'Solicitar propuesta',
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
        background: 'var(--light-mid)',
        borderLeft: '1px solid var(--light-sub)',
        borderRight: '1px solid var(--light-sub)',
        borderBottom: '1px solid var(--light-sub)',
        borderTop: '1px solid var(--light-sub)',
        borderRadius: '12px',
        padding: '40px',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 12px 40px rgba(20,18,16,0.12)' : '0 1px 4px rgba(20,18,16,0.04)',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Tag */}
      <span
        style={{
          fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
          fontSize: '11px',
          fontWeight: 300,
          letterSpacing: '5px',
          textTransform: 'uppercase',
          color: 'var(--accent)',
        }}
      >
        {service.tag}
      </span>

      <h3
        style={{
          fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
          fontSize: '24px',
          fontWeight: 600,
          lineHeight: 1.3,
          color: 'var(--ink-dark)',
        }}
      >
        {service.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
          fontSize: '15px',
          lineHeight: 1.6,
          fontWeight: 400,
          color: 'var(--ink-mid)',
        }}
      >
        {service.desc}
      </p>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {service.topics.map((t) => (
          <li key={t} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '6px', height: '6px', borderRadius: '50%',
                background: 'var(--accent)', flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                fontSize: '14px',
                fontWeight: 400,
                color: 'var(--ink-mid)',
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
          gap: '6px',
          fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--accent)',
          textDecoration: 'none',
          transition: 'gap 0.2s ease',
          width: 'fit-content',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = '10px'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = '6px'; }}
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

    gsap.from(Array.from(header.children), {
      scrollTrigger: { trigger: header, start: 'top 82%', once: true },
      opacity: 0, y: 36, stagger: 0.12, duration: 0.7, ease: 'power2.out',
    });

    const cards = Array.from(grid.querySelectorAll<HTMLElement>('.service-card'));
    gsap.set(cards, { opacity: 0, y: 60 });

    const st = ScrollTrigger.create({
      trigger: grid,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(cards, { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' });
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
      className="section-outer"
      style={{ background: 'var(--light)' }}
    >
      <div className="section-inner">
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '20px' }}>
            <div style={{ width: '36px', height: '3px', borderRadius: '2px', background: 'var(--accent)' }} />
            <span
              style={{
                fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                fontWeight: 300,
                fontSize: '11px',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                color: 'var(--accent)',
              }}
            >
              Lo que hacemos
            </span>
            <div style={{ width: '36px', height: '3px', borderRadius: '2px', background: 'var(--accent)' }} />
          </div>
          <h2
            style={{
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 600,
              letterSpacing: '-0.5px',
              color: 'var(--ink-dark)',
              marginBottom: '20px',
            }}
          >
            Nuestros servicios
          </h2>
          <p
            style={{
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: '17px',
              fontWeight: 400,
              color: 'var(--ink-mid)',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Tres caminos hacia el mismo destino: el máximo rendimiento de las personas y sus organizaciones.
          </p>
        </div>

        <div ref={gridRef} className="services-grid">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
