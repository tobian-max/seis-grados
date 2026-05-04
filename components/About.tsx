'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const chips = [
  { label: 'Mentoría',     desc: '1 a 1, personalizada y de alto impacto' },
  { label: 'Consultoría',  desc: 'Estratégica para equipos comerciales' },
  { label: 'Conferencias', desc: 'Keynotes y talleres internacionales' },
  { label: 'Facilitación', desc: 'Procesos a la medida de tu empresa' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef    = useRef<HTMLDivElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 65%', once: true };

      gsap.from(copyRef.current!.children, {
        scrollTrigger: trigger,
        opacity: 0, x: -50,
        stagger: 0.1, duration: 0.7, ease: 'power2.out',
      });

      gsap.from(photoRef.current, {
        scrollTrigger: trigger,
        opacity: 0, x: 70,
        duration: 1, ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="section-outer"
      style={{ background: 'var(--dark)', position: 'relative', overflow: 'hidden' }}
    >
      <div
        className="section-inner about-grid"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Left: copy */}
        <div ref={copyRef} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '36px', height: '3px', borderRadius: '2px', background: 'var(--accent)', flexShrink: 0 }} />
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
              Quiénes somos
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: 'clamp(28px, 3vw, 44px)',
              fontWeight: 600,
              letterSpacing: '-0.5px',
              color: 'var(--text-dark)',
              lineHeight: 1.15,
            }}
          >
            Creemos que cada persona tiene el potencial de ser extraordinaria.
          </h2>

          <p
            style={{
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: '16px',
              lineHeight: 1.8,
              fontWeight: 400,
              color: 'var(--text-dark-sub)',
            }}
          >
            En 6 Grados Business Solutions acompañamos a ejecutivos, líderes y equipos comerciales a alcanzar su máxima versión. Lo hacemos con metodologías probadas, mentoría cercana y una convicción profunda: el cambio real ocurre desde adentro.
          </p>

          <p
            style={{
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: '16px',
              lineHeight: 1.8,
              fontWeight: 400,
              color: 'var(--text-dark-sub)',
            }}
          >
            Como speaker internacionales, llevamos estos principios a conferencias y entrenamientos corporativos en toda Latinoamérica y más allá, adaptando cada experiencia al lenguaje y la cultura de cada organización.
          </p>

          {/* Capability chips */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginTop: '8px',
            }}
          >
            {chips.map((chip) => (
              <div
                key={chip.label}
                style={{
                  background: 'var(--dark-mid)',
                  border: '1px solid var(--dark-sub)',
                  borderRadius: '8px',
                  padding: '16px 20px',
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'var(--text-dark)',
                    marginBottom: '4px',
                  }}
                >
                  {chip.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'var(--text-dark-sub)',
                    lineHeight: 1.5,
                  }}
                >
                  {chip.desc}
                </div>
              </div>
            ))}
          </div>

          <a
            href="#contacto"
            style={{
              marginTop: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--accent)',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: '8px',
              width: 'fit-content',
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: '15px',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'background 150ms ease, transform 150ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent-mid)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.01)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
            }}
          >
            Conversemos →
          </a>
        </div>

        {/* Right: photo */}
        <div ref={photoRef} style={{ position: 'relative' }}>
          <div
            style={{
              width: '100%',
              paddingBottom: '120%',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '4px',
            }}
          >
            <Image
              src="/uploads/speaker.jpeg"
              alt="Speaker en conferencia"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
          {/* Orange accent square */}
          <div
            style={{
              position: 'absolute',
              bottom: '-20px',
              right: '-20px',
              width: '120px',
              height: '120px',
              background: 'var(--accent)',
              opacity: 0.15,
              borderRadius: '4px',
            }}
          />
        </div>
      </div>
    </section>
  );
}
