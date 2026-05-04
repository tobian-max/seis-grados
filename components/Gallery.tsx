'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { src: '/uploads/gallery-1.jpeg', label: 'Taller de equipos' },
  { src: '/uploads/gallery-2.jpeg', label: 'Workshop comercial' },
  { src: '/uploads/gallery-3.jpeg', label: 'Conferencia corporativa' },
  { src: '/uploads/gallery-4.jpeg', label: 'Facilitación de procesos' },
  { src: '/uploads/gallery-5.jpeg', label: 'Keynote internacional' },
  { src: '/uploads/gallery-6.jpeg', label: 'Entrenamiento ejecutivo' },
];

function GalleryItem({ item }: { item: typeof galleryItems[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="gallery-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        breakInside: 'avoid',
        marginBottom: '12px',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.18)' : 'none',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        cursor: 'default',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.label}
        style={{ width: '100%', display: 'block', objectFit: 'cover' }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(61,53,53,0.75))',
          padding: '24px 16px 14px',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-dm-sans, DM Sans), sans-serif',
            fontSize: '12px',
            fontWeight: 500,
            color: '#faf9f7',
            letterSpacing: '0.06em',
          }}
        >
          {item.label}
        </span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current!.children, {
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%', once: true },
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
      });

      gsap.from('.gallery-item', {
        scrollTrigger: { trigger: gridRef.current, start: 'top 78%', once: true },
        opacity: 0,
        y: 50,
        scale: 0.97,
        stagger: { each: 0.1, from: 'start' },
        duration: 0.7,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="section-outer section-inner"
    >
      <div ref={headerRef} style={{ textAlign: 'center', marginBottom: '72px' }}>
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
          En acción
        </p>
        <h2
          style={{
            fontFamily: 'var(--font-playfair, Playfair Display), serif',
            fontSize: 'clamp(28px, 3.5vw, 44px)',
            fontWeight: 400,
            color: 'var(--charcoal)',
          }}
        >
          Galería
        </h2>
      </div>

      <div ref={gridRef} className="gallery-masonry">
        {galleryItems.map((item, i) => (
          <GalleryItem key={i} item={item} />
        ))}
      </div>
    </section>
  );
}
