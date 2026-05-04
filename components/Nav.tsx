'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const linkColor = scrolled ? 'var(--brown-dark)' : '#faf9f7';

  const desktopLinkStyle: React.CSSProperties = {
    fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
    fontSize: '14px', fontWeight: 500,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    color: linkColor, textDecoration: 'none',
    padding: '4px 0', borderBottom: '1.5px solid transparent',
    transition: 'all 0.2s',
  };

  return (
    <>
      <nav
        ref={navRef}
        className="nav-root"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          height: scrolled ? '64px' : '80px',
          background: scrolled ? 'rgba(250,249,247,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--cream)' : 'none',
          transition: 'all 0.35s ease',
        }}
      >
        <a href="#inicio" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/uploads/logo.png"
            alt="6 Grados Business Solutions"
            width={160} height={44}
            style={{ maxHeight: scrolled ? 36 : 44, width: 'auto', objectFit: 'contain' }}
            priority
          />
        </a>

        {/* Desktop links */}
        <div className="nav-links">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={desktopLinkStyle}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.borderBottomColor = 'var(--green)';
                (e.target as HTMLAnchorElement).style.color = scrolled ? 'var(--green-dark)' : 'var(--green)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.borderBottomColor = 'transparent';
                (e.target as HTMLAnchorElement).style.color = linkColor;
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contacto"
            style={{
              background: 'var(--green)', color: '#fff', padding: '10px 22px',
              borderRadius: '2px', fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase', textDecoration: 'none', transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.background = 'var(--green-dark)')}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.background = 'var(--green)')}
          >
            Conversemos
          </a>
        </div>

        {/* Hamburger button — visible only on mobile via CSS */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menú"
          style={{ color: scrolled ? 'var(--charcoal)' : '#faf9f7' }}
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
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            style={{
              position: 'absolute', top: '24px', right: '20px',
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgba(250,249,247,0.6)',
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6"  x2="6"  y2="18" />
              <line x1="6"  y1="6"  x2="18" y2="18" />
            </svg>
          </button>

          {/* Logo in menu */}
          <Image
            src="/uploads/logo.png"
            alt="6 Grados"
            width={120} height={60}
            style={{ maxHeight: 60, width: 'auto', objectFit: 'contain', marginBottom: '8px' }}
          />

          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
                fontSize: '18px', fontWeight: 400,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'rgba(250,249,247,0.85)', textDecoration: 'none',
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
              background: 'var(--green)', color: '#fff',
              padding: '14px 32px', borderRadius: '2px',
              fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em',
              textTransform: 'uppercase', textDecoration: 'none',
            }}
          >
            Conversemos
          </a>
        </div>
      )}
    </>
  );
}
