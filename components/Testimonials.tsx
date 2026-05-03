'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

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

  // Header scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current!.children, {
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%', once: true },
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Crossfade animation on testimonial change
  const crossfadeTo = (next: number) => {
    const tl = gsap.timeline();
    tl.to([quoteRef.current, authorRef.current], {
      opacity: 0,
      y: -16,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => setActive(next),
    });
  };

  // Fade-in when active changes
  useEffect(() => {
    if (!quoteRef.current || !authorRef.current) return;
    gsap.fromTo(
      [quoteRef.current, authorRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.08 }
    );
  }, [active]);

  // Auto-rotate
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % testimonials.length;
        crossfadeTo(next);
        return a;
      });
    }, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDot = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    crossfadeTo(i);
    intervalRef.current = setInterval(() => {
      setActive((a) => {
        const next = (a + 1) % testimonials.length;
        crossfadeTo(next);
        return a;
      });
    }, 5000);
  };

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      style={{
        background: 'var(--charcoal)',
        padding: '120px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Image
        src="/uploads/watermark.png"
        alt=""
        fill
        style={{ objectFit: 'cover', opacity: 0.12, pointerEvents: 'none' }}
      />

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '64px' }}>
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
            Lo que dicen
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-playfair, Playfair Display), serif',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 400,
              color: '#faf9f7',
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
              fontFamily: 'var(--font-playfair, Playfair Display), serif',
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontStyle: 'italic',
              fontWeight: 400,
              lineHeight: 1.65,
              color: 'rgba(250,249,247,0.85)',
              maxWidth: '700px',
              marginBottom: '36px',
            }}
          >
            &ldquo;{testimonials[active].quote}&rdquo;
          </p>

          <div
            ref={authorRef}
            style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'var(--taupe)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                color: '#faf9f7',
                flexShrink: 0,
              }}
            >
              {testimonials[active].initials}
            </div>
            <div style={{ textAlign: 'left' }}>
              <div
                style={{
                  fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  color: '#faf9f7',
                }}
              >
                {testimonials[active].name}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                  fontSize: '13px',
                  fontWeight: 300,
                  color: 'rgba(250,249,247,0.5)',
                }}
              >
                {testimonials[active].role}
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            marginTop: '48px',
          }}
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              aria-label={`Testimonio ${i + 1}`}
              style={{
                width: i === active ? '28px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === active ? 'var(--green)' : 'rgba(255,255,255,0.2)',
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
