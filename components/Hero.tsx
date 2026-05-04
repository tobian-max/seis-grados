'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: '+500', label: 'Ejecutivos mentoreados' },
  { num: '+15',  label: 'Países alcanzados' },
  { num: '+200', label: 'Empresas impactadas' },
];

function animateCount(el: HTMLElement, target: number, prefix: string) {
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 2,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = prefix + Math.round(obj.val).toString();
    },
  });
}

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const h1Ref       = useRef<HTMLHeadingElement>(null);
  const descRef     = useRef<HTMLParagraphElement>(null);
  const ctasRef     = useRef<HTMLDivElement>(null);
  const logoRef     = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const statNumRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(eyebrowRef.current, { opacity: 0, y: 24, duration: 0.6 }, 0.5)
        .from(h1Ref.current, { opacity: 0, y: 40, duration: 0.8 }, 0.7)
        .from(descRef.current, { opacity: 0, y: 24, duration: 0.6 }, 1.0)
        .from(ctasRef.current, { opacity: 0, y: 20, duration: 0.5 }, 1.2)
        .from(logoRef.current, { opacity: 0, scale: 0.88, duration: 1, ease: 'power2.out' }, 0.6);

      // Stats bar reveal + counter
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.from(statsRef.current!.children, {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.6,
            ease: 'power2.out',
            onComplete: () => {
              const targets = [500, 15, 200];
              const prefixes = ['+', '+', '+'];
              statNumRefs.current.forEach((el, i) => {
                if (el) animateCount(el, targets[i], prefixes[i]);
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
        background: 'linear-gradient(160deg, var(--charcoal) 0%, var(--brown-dark) 45%, var(--brown-mid) 100%)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'visible',
      }}
    >
      {/* Watermark */}
      <Image
        src="/uploads/watermark.png"
        alt=""
        aria-hidden
        fill
        style={{ objectFit: 'cover', opacity: 0.12, pointerEvents: 'none', userSelect: 'none' }}
      />

      {/* Decorative strip */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '38%',
          height: '100%',
          background: 'linear-gradient(180deg, var(--tan) 0%, var(--taupe) 50%, var(--brown-mid) 100%)',
          clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0% 100%)',
          opacity: 0.18,
        }}
      />

      <div
        className="section-inner"
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '120px 48px 80px',
          width: '100%',
        }}
      >
        <div className="hero-grid">
          {/* Left: copy */}
          <div>
            <p
              ref={eyebrowRef}
              style={{
                fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--green)',
                marginBottom: '24px',
              }}
            >
              Business Solutions
            </p>

            <h1
              ref={h1Ref}
              style={{
                fontFamily: 'var(--font-playfair, Playfair Display), serif',
                fontSize: 'clamp(40px, 5vw, 68px)',
                fontWeight: 400,
                lineHeight: 1.1,
                color: '#faf9f7',
                marginBottom: '28px',
              }}
            >
              Transformamos personas.
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--cream)' }}>
                Potenciamos equipos.
              </em>
            </h1>

            <p
              ref={descRef}
              style={{
                fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                fontSize: '18px',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'rgba(250,249,247,0.75)',
                maxWidth: '480px',
                marginBottom: '44px',
              }}
            >
              Mentoría ejecutiva, consultoría comercial y conferencias internacionales para que tú y tu equipo operen al máximo nivel.
            </p>

            <div
              ref={ctasRef}
              style={{
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <a
                href="#servicios"
                style={{
                  background: 'var(--green)',
                  color: '#fff',
                  padding: '15px 32px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--green-dark)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--green)')}
              >
                Ver servicios
              </a>
              <a
                href="#nosotros"
                style={{
                  color: 'rgba(250,249,247,0.7)',
                  fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                  fontSize: '14px',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(250,249,247,0.3)',
                  paddingBottom: '2px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = '#faf9f7';
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'var(--green)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(250,249,247,0.7)';
                  (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'rgba(250,249,247,0.3)';
                }}
              >
                Conoce nuestra historia →
              </a>
            </div>
          </div>

          {/* Right: logo clipped to hide "Business Solutions" — hidden on mobile */}
          <div
            ref={logoRef}
            className="hero-logo-col"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                overflow: 'hidden',
                height: '400px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uploads/logo.png"
                alt="6 Grados"
                style={{
                  height: '450px',
                  width: 'auto',
                  display: 'block',
                  flexShrink: 0,
                  filter:
                    'drop-shadow(0 0 1px rgba(255,255,255,0.6)) drop-shadow(0 0 1px rgba(255,255,255,0.4))',
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          ref={statsRef}
          className="hero-stats"
          style={{ background: 'rgba(255,255,255,0.1)' }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(255,255,255,0.06)',
                padding: '24px 16px',
                textAlign: 'center',
              }}
            >
              <div
                ref={(el) => { if (el) statNumRefs.current[i] = el; }}
                style={{
                  fontFamily: 'var(--font-playfair, Playfair Display), serif',
                  fontSize: '42px',
                  fontWeight: 500,
                  color: 'var(--green)',
                  lineHeight: 1,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                  fontSize: '13px',
                  fontWeight: 400,
                  color: 'rgba(250,249,247,0.6)',
                  marginTop: '8px',
                  letterSpacing: '0.04em',
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
