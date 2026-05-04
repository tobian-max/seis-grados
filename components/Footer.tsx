'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from './Logo';

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
  fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
  fontSize: '14px',
  fontWeight: 300,
  color: 'var(--text-dark-sub)',
  textDecoration: 'none',
  transition: 'color 150ms ease',
  display: 'block',
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current!.children, {
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%', once: true },
        opacity: 0, y: 30, stagger: 0.1, duration: 0.7, ease: 'power2.out',
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="section-outer"
      style={{
        background: 'var(--dark)',
        borderTop: '1px solid var(--dark-sub)',
        paddingTop: '60px',
        paddingBottom: '32px',
        position: 'relative',
      }}
    >
      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid">
          {/* Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Logo mode="dark" variant="stacked" markHeight={40} />
            <p
              style={{
                fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                fontSize: '14px',
                fontWeight: 300,
                color: 'var(--text-dark-sub)',
                lineHeight: 1.75,
                maxWidth: '280px',
              }}
            >
              Mentoría ejecutiva, consultoría comercial y conferencias internacionales para alcanzar el máximo potencial.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="tel:+573107653257"
                style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dark-sub)')}
              >
                <span style={{ color: 'var(--accent)' }}>☏</span> +57 310 765 3257
              </a>
              <a
                href="mailto:tobian@6-grados.com"
                style={{ ...linkStyle, display: 'flex', alignItems: 'center', gap: '8px' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-dark-sub)')}
              >
                <span style={{ color: 'var(--accent)' }}>✉</span> tobian@6-grados.com
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '5px',
                textTransform: 'uppercase',
                color: 'var(--accent)',
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
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--accent)')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--text-dark-sub)')}
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
                fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                fontSize: '11px',
                fontWeight: 300,
                letterSpacing: '5px',
                textTransform: 'uppercase',
                color: 'var(--accent)',
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
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--accent)')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--text-dark-sub)')}
                >
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--dark-sub)',
            paddingTop: '28px',
            marginTop: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: '12px',
              fontWeight: 300,
              color: 'var(--text-dark-sub)',
              opacity: 0.5,
            }}
          >
            © 2026 6 Grados Business Solutions. Todos los derechos reservados.
          </span>
          <span
            style={{
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: '12px',
              fontWeight: 300,
              color: 'var(--text-dark-sub)',
              opacity: 0.5,
            }}
          >
            Hecho con propósito.
          </span>
        </div>
      </div>
    </footer>
  );
}
