'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { label: 'Mentoría',     desc: '1 a 1, personalizada y de alto impacto' },
  { label: 'Consultoría',  desc: 'Estratégica para equipos comerciales' },
  { label: 'Conferencias', desc: 'Keynotes y talleres internacionales' },
  { label: 'Facilitación', desc: 'Procesos a la medida de tu empresa' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef   = useRef<HTMLDivElement>(null);
  const copyRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: sectionRef.current, start: 'top 65%', once: true };

      gsap.from(photoRef.current, {
        scrollTrigger: trigger,
        opacity: 0,
        x: -70,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(copyRef.current!.children, {
        scrollTrigger: trigger,
        opacity: 0,
        x: 50,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      className="section-outer"
      style={{
        background: 'var(--warm-white)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Watermark */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none' }}>
        <Image src="/uploads/watermark.png" alt="" fill style={{ objectFit: 'cover' }} />
      </div>

      <div
        className="section-inner about-grid"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Photo */}
        <div ref={photoRef} style={{ position: 'relative' }}>
          <div
            style={{
              width: '100%',
              paddingBottom: '120%',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/uploads/speaker.jpeg"
              alt="Speaker en conferencia"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
          {/* Accent box */}
          <div
            style={{
              position: 'absolute',
              bottom: '-24px',
              right: '-24px',
              width: '160px',
              height: '160px',
              background: 'var(--green)',
              opacity: 0.12,
            }}
          />
        </div>

        {/* Copy */}
        <div ref={copyRef} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <p
            style={{
              fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--green)',
            }}
          >
            Quiénes somos
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-playfair, Playfair Display), serif',
              fontSize: 'clamp(28px, 3vw, 44px)',
              fontWeight: 400,
              color: 'var(--charcoal)',
              lineHeight: 1.15,
            }}
          >
            Creemos que cada persona tiene el potencial de ser extraordinaria.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              fontSize: '16px',
              lineHeight: 1.8,
              fontWeight: 300,
              color: 'var(--brown-mid)',
            }}
          >
            En 6 Grados Business Solutions acompañamos a ejecutivos, líderes y equipos comerciales a alcanzar su máxima versión. Lo hacemos con metodologías probadas, mentoría cercana y una convicción profunda: el cambio real ocurre desde adentro.
          </p>

          <p
            style={{
              fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              fontSize: '16px',
              lineHeight: 1.8,
              fontWeight: 300,
              color: 'var(--brown-mid)',
            }}
          >
            Como speaker internacionales, llevamos estos principios a conferencias y entrenamientos corporativos en toda Latinoamérica y más allá, adaptando cada experiencia al lenguaje y la cultura de cada organización.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginTop: '16px',
            }}
          >
            {pillars.map((item) => (
              <div
                key={item.label}
                style={{ borderLeft: '2px solid var(--tan)', paddingLeft: '16px' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--charcoal)',
                    marginBottom: '4px',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'var(--taupe)',
                    lineHeight: 1.5,
                  }}
                >
                  {item.desc}
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
              background: 'var(--charcoal)',
              color: '#faf9f7',
              padding: '14px 28px',
              width: 'fit-content',
              fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--green-dark)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--charcoal)')}
          >
            Conversemos →
          </a>
        </div>
      </div>
    </section>
  );
}
