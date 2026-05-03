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
    // Entrance animation
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

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
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
          width={160}
          height={scrolled ? 36 : 44}
          style={{ maxHeight: scrolled ? 36 : 44, width: 'auto', objectFit: 'contain' }}
          priority
        />
      </a>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: '36px', alignItems: 'center' }}>
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: scrolled ? 'var(--brown-dark)' : '#faf9f7',
              textDecoration: 'none',
              padding: '4px 0',
              borderBottom: '1.5px solid transparent',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.borderBottomColor = 'var(--green)';
              (e.target as HTMLAnchorElement).style.color = scrolled ? 'var(--green-dark)' : 'var(--green)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.borderBottomColor = 'transparent';
              (e.target as HTMLAnchorElement).style.color = scrolled ? 'var(--brown-dark)' : '#faf9f7';
            }}
          >
            {item.label}
          </a>
        ))}

        <a
          href="#contacto"
          style={{
            background: 'var(--green)',
            color: '#fff',
            padding: '10px 22px',
            borderRadius: '2px',
            fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.background = 'var(--green-dark)')}
          onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.background = 'var(--green)')}
        >
          Conversemos
        </a>
      </div>
    </nav>
  );
}
