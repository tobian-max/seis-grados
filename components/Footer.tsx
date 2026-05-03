'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Inicio',      href: '#inicio' },
  { label: 'Servicios',   href: '#servicios' },
  { label: 'Nosotros',    href: '#nosotros' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Galería',     href: '#galeria' },
  { label: 'Contacto',    href: '#contacto' },
];

const serviceLinks = [
  'Mentoría 1:1',
  'Consultoría Comercial',
  'Speaker & Talleres',
  'Facilitación',
];

const linkStyle: React.CSSProperties = {
  fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
  fontSize: '14px',
  fontWeight: 300,
  color: 'rgba(250,249,247,0.6)',
  textDecoration: 'none',
  transition: 'color 0.2s',
  display: 'block',
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current!.children, {
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%', once: true },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power2.out',
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      style={{
        background: 'var(--charcoal)',
        padding: '60px 48px 32px',
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
          maxWidth: '1200px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: '60px',
            marginBottom: '60px',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Image
              src="/uploads/logo.png"
              alt="6 Grados Business Solutions"
              width={120}
              height={80}
              style={{ maxHeight: 80, width: 'auto', objectFit: 'contain' }}
            />
            <p
              style={{
                fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                fontSize: '14px',
                fontWeight: 300,
                color: 'rgba(250,249,247,0.55)',
                lineHeight: 1.75,
                maxWidth: '320px',
              }}
            >
              Mentoría ejecutiva, consultoría comercial y conferencias internacionales para alcanzar el máximo potencial.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="tel:+573107653257"
                style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#faf9f7')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(250,249,247,0.6)')}
              >
                <span style={{ color: 'var(--tan)' }}>☏</span> +57 310 765 3257
              </a>
              <a
                href="mailto:tobian@6-grados.com"
                style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#faf9f7')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(250,249,247,0.6)')}
              >
                <span style={{ color: 'var(--tan)' }}>✉</span> tobian@6-grados.com
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--tan)',
                marginBottom: '20px',
              }}
            >
              Navegación
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  style={linkStyle}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#faf9f7')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'rgba(250,249,247,0.6)')}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div
              style={{
                fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--tan)',
                marginBottom: '20px',
              }}
            >
              Servicios
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {serviceLinks.map((s) => (
                <a
                  key={s}
                  href="#servicios"
                  style={linkStyle}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = '#faf9f7')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'rgba(250,249,247,0.6)')}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              fontSize: '12px',
              fontWeight: 300,
              color: 'rgba(250,249,247,0.35)',
            }}
          >
            © 2026 6 Grados Business Solutions. Todos los derechos reservados.
          </span>
          <span
            style={{
              fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              fontSize: '12px',
              fontWeight: 300,
              color: 'rgba(250,249,247,0.35)',
            }}
          >
            Hecho con propósito.
          </span>
        </div>
      </div>
    </footer>
  );
}
