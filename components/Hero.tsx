'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from './Logo';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 500, prefix: '+', suffix: '', label: 'Ejecutivos mentoreados' },
  { num: 15,  prefix: '+', suffix: '', label: 'Países alcanzados' },
  { num: 200, prefix: '+', suffix: '', label: 'Empresas impactadas' },
];

function animateCount(el: HTMLElement, target: number, prefix: string) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => { el.textContent = prefix + Math.round(obj.val).toString(); },
  });
}

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const h1Ref       = useRef<HTMLHeadingElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const ctasRef     = useRef<HTMLDivElement>(null);
  const logoColRef  = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const statNumRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(eyebrowRef.current, { opacity: 0, y: 20, duration: 0.6 }, 0.5)
        .from(h1Ref.current, { opacity: 0, y: 40, duration: 0.8 }, 0.7)
        .from(descRef.current, { opacity: 0, y: 24, duration: 0.6 }, 1.0)
        .from(ctasRef.current, { opacity: 0, y: 20, duration: 0.5 }, 1.2)
        .from(logoColRef.current, { opacity: 0, scale: 0.88, duration: 1.2, ease: 'power2.out' }, 0.6);

      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.from(statsRef.current!.children, {
            opacity: 0, y: 30, stagger: 0.15, duration: 0.6, ease: 'power2.out',
            onComplete: () => {
              statNumRefs.current.forEach((el, i) => {
                if (el) animateCount(el, stats[i].num, stats[i].prefix);
              });
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--dark)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        className="section-inner"
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '120px 48px 80px',
          width: '100%',
        }}
      >
        {/* Two-column: copy left, logo right */}
        <div className="hero-grid">

          {/* Left: copy */}
          <div>
            {/* Eyebrow: orange bar + label */}
            <div ref={eyebrowRef} style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
              <div
                style={{
                  width: '36px',
                  height: '3px',
                  borderRadius: '2px',
                  background: 'var(--accent)',
                  flexShrink: 0,
                }}
              />
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
                Business Solutions
              </span>
            </div>

            <h1
              ref={h1Ref}
              style={{
                fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: '-2px',
                color: 'var(--text-dark)',
                marginBottom: '28px',
              }}
            >
              Transformamos personas.{' '}
              <em style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 700 }}>
                Potenciamos equipos.
              </em>
            </h1>

            <p
              ref={descRef}
              style={{
                fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                fontSize: '17px',
                fontWeight: 400,
                lineHeight: 1.7,
                color: 'var(--text-dark-sub)',
                maxWidth: '480px',
                marginBottom: '44px',
              }}
            >
              Mentoría ejecutiva, consultoría comercial y conferencias internacionales para que tú y tu equipo operen al máximo nivel.
            </p>

            <div
              ref={ctasRef}
              style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <a
                href="#servicios"
                style={{
                  background: 'var(--accent)',
                  color: '#fff',
                  padding: '15px 32px',
                  borderRadius: '8px',
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
                Ver servicios
              </a>
              <a
                href="#nosotros"
                style={{
                  color: 'var(--text-dark-sub)',
                  fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                  fontSize: '15px',
                  fontWeight: 400,
                  textDecoration: 'none',
                  border: '1px solid var(--dark-sub)',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dark)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--text-dark-sub)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dark-sub)';
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--dark-sub)';
                }}
              >
                Conoce nuestra historia
              </a>
            </div>
          </div>

          {/* Right: stacked logo — hidden on mobile via CSS */}
          <div
            ref={logoColRef}
            className="hero-logo-col"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Logo
              mode="dark"
              variant="stacked"
              markHeight={200}
              wordmarkFontSize={64}
              subtitleFontSize={13}
            />
          </div>

        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="hero-stats"
          style={{ marginTop: '80px', background: 'var(--dark-mid)', borderRadius: '8px', overflow: 'hidden' }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                padding: '28px 20px',
                textAlign: 'center',
                borderRight: i < stats.length - 1 ? '1px solid var(--dark-sub)' : 'none',
              }}
            >
              <div
                ref={(el) => { if (el) statNumRefs.current[i] = el; }}
                style={{
                  fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                  fontSize: '42px',
                  fontWeight: 700,
                  letterSpacing: '-1px',
                  color: 'var(--text-dark)',
                  lineHeight: 1,
                }}
              >
                {s.prefix}{s.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                  fontSize: '13px',
                  fontWeight: 300,
                  color: 'var(--text-dark-sub)',
                  marginTop: '8px',
                  letterSpacing: '0.02em',
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
