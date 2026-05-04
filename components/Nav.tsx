'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Logo from './Logo';

const navItems = [
  { label: 'Inicio',      href: '#inicio' },
  { label: 'Servicios',   href: '#servicios' },
  { label: 'Nosotros',    href: '#nosotros' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Galería',     href: '#galeria' },
  { label: 'Contacto',    href: '#contacto' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const desktopLinkStyle: React.CSSProperties = {
    fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: '0.02em',
    color: 'var(--text-dark-sub)',
    textDecoration: 'none',
    padding: '4px 0',
    transition: 'color 150ms ease',
  };

  return (
    <>
      <nav
        ref={navRef}
        className="nav-root"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: '64px',
          background: scrolled
            ? 'rgba(20,18,16,0.92)'
            : 'var(--dark)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: '1px solid var(--dark-sub)',
          transition: 'background 0.35s ease',
        }}
      >
        <a href="#inicio" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Logo mode="dark" variant="horizontal" markHeight={32} />
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={desktopLinkStyle}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = 'var(--text-dark)'; }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = 'var(--text-dark-sub)'; }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contacto"
            style={{
              background: 'var(--accent)',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '8px',
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: '14px',
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
            Conversemos
          </a>
        </div>

        {/* Hamburger — visible only on mobile via CSS */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
          style={{ color: 'var(--text-dark)' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="3" y1="6"  x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div className="nav-mobile-menu">
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            style={{
              position: 'absolute', top: '24px', right: '20px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-dark-sub)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6"  x2="6"  y2="18" />
              <line x1="6"  y1="6"  x2="18" y2="18" />
            </svg>
          </button>

          <Logo mode="dark" variant="stacked" markHeight={48} />

          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
                fontSize: '18px',
                fontWeight: 400,
                letterSpacing: '0.04em',
                color: 'var(--text-dark-sub)',
                textDecoration: 'none',
              }}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: '8px',
              background: 'var(--accent)',
              color: '#fff',
              padding: '14px 32px',
              borderRadius: '8px',
              fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)",
              fontSize: '15px',
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Conversemos
          </a>
        </div>
      )}
    </>
  );
}
