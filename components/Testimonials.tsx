'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'Muy provechosa sus conocimientos y experiencia, nos dejan un excelente mensaje para un cambio positivo en el ámbito laboral y personal.',
    name: 'Oscar Buitrago',
    role: 'Entec',
    initials: 'OB',
  },
  {
    quote: 'El mensaje es simple, pero claro y profundo. Nos ayuda a ver cosas que muchas veces no nos las planteamos. Los capacitadores son excelentes y hacen que la sesión sea muy amena.',
    name: 'Julian Garcés',
    role: 'Bosch',
    initials: 'JG',
  },
  {
    quote: 'Aterrizado a la realidad, recomendable para todos quienes trabajan con muchos clientes internos y externos a la vez.',
    name: 'Layla Zorrilla',
    role: 'Rosen',
    initials: 'LZ',
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const quoteRef    = useRef<HTMLParagraphElement>(null);
  const authorRef   = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current!.children, {
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
        opacity: 0, y: 30, stagger: 0.12, duration: 0.7, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const crossfadeTo = (next: number) => {
    gsap.timeline().to([quoteRef.current, authorRef.current], {
      opacity: 0, y: -16, duration: 0.35, ease: 'power2.in',
      onComplete: () => setActive(next),
    });
  };

  useEffect(() => {
    if (!quoteRef.current || !authorRef.current) return;
    gsap.fromTo(
      [quoteRef.current, authorRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 }
    );
  }, [active]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((a) => { const next = (a + 1) % testimonials.length; crossfadeTo(next); return a; });
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDot = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    crossfadeTo(i);
    intervalRef.current = setInterval(() => {
      setActive((a) => { const next = (a + 1) % testimonials.length; crossfadeTo(next); return a; });
    }, 5000);
  };

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="section-outer"
      style={{ background: 'var(--light)', position: 'relative' }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
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
              Lo que dicen
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
            }}
          >
            Clientes que lo vivieron
          </h2>
        </div>

        {/* Testimonial display */}
        <div
          style={{
            textAlign: 'center',
            minHeight: '200px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p
            ref={quoteRef}
            style={{
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontStyle: 'italic',
              fontWeight: 400,
              lineHeight: 1.65,
              color: 'var(--ink-dark)',
              maxWidth: '700px',
              marginBottom: '36px',
            }}
          >
            &ldquo;{testimonials[active].quote}&rdquo;
          </p>

          <div ref={authorRef} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'var(--light-sub)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                fontSize: '14px', fontWeight: 600,
                color: 'var(--ink-mid)',
                flexShrink: 0,
              }}
            >
              {testimonials[active].initials}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                  fontSize: '14px', fontWeight: 500, color: 'var(--ink-dark)',
                }}
              >
                {testimonials[active].name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                  fontSize: '13px', fontWeight: 300, color: 'var(--ink-sub)',
                }}
              >
                {testimonials[active].role}
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '48px' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              aria-label={`Testimonio ${i + 1}`}
              style={{
                width: i === active ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === active ? 'var(--accent)' : 'var(--light-sub)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
